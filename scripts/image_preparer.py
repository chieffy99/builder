import os
from typing import Optional

import cv2
import numpy as np


class ImagePreparer:
    """Prepare images for DaTix conversion."""

    def __init__(self, standard_width: int = 1200) -> None:
        self.standard_width = standard_width

    def _resize(self, image: np.ndarray) -> np.ndarray:
        r = self.standard_width / image.shape[1]
        dim = (self.standard_width, int(image.shape[0] * r))
        return cv2.resize(image, dim, interpolation=cv2.INTER_AREA)

    def _find_document_corners(self, image_gray: np.ndarray) -> np.ndarray:
        blurred = cv2.GaussianBlur(image_gray, (5, 5), 0)
        edged = cv2.Canny(blurred, 75, 200)
        contours, _ = cv2.findContours(
            edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE
        )
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]
        for c in contours:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.02 * peri, True)
            if len(approx) == 4:
                return approx
        h, w = image_gray.shape
        return np.array(
            [[[0, 0]], [[w - 1, 0]], [[w - 1, h - 1]], [[0, h - 1]]],
            dtype="int32",
        )

    def _perspective_transform(
        self, image: np.ndarray, corners: np.ndarray
    ) -> np.ndarray:
        rect = np.zeros((4, 2), dtype="float32")
        s = corners.sum(axis=2)
        rect[0] = corners[np.argmin(s)]
        rect[2] = corners[np.argmax(s)]
        diff = np.diff(corners, axis=2)
        rect[1] = corners[np.argmin(diff)]
        rect[3] = corners[np.argmax(diff)]
        tl, tr, br, bl = rect
        width_a = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
        width_b = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
        max_width = int(max(width_a, width_b))
        height_a = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
        height_b = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
        max_height = int(max(height_a, height_b))
        dst = np.array(
            [
                [0, 0],
                [max_width - 1, 0],
                [max_width - 1, max_height - 1],
                [0, max_height - 1],
            ],
            dtype="float32",
        )
        matrix = cv2.getPerspectiveTransform(rect, dst)
        return cv2.warpPerspective(image, matrix, (max_width, max_height))

    def _binarize(self, image_gray: np.ndarray) -> np.ndarray:
        _, out = cv2.threshold(
            image_gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )
        return out

    def prepare(
        self, image_path: str, output_dir: str = "prepared_images"
    ) -> Optional[str]:
        try:
            image = cv2.imread(image_path)
            if image is None:
                raise FileNotFoundError("image not found")
            image = self._resize(image)
            gray_resized = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            corners = self._find_document_corners(gray_resized)
            warped = self._perspective_transform(image, corners)
            gray_warped = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)
            final_img = self._binarize(gray_warped)
            os.makedirs(output_dir, exist_ok=True)
            base = os.path.basename(image_path)
            out_path = os.path.join(
                output_dir, os.path.splitext(base)[0] + "_prepared.png"
            )
            cv2.imwrite(out_path, final_img)
            return out_path
        except Exception as exc:  # noqa: BLE001
            print(f"Error preparing {image_path}: {exc}")
            return None
