import csv
import os
from typing import List, Optional

from PIL import Image


class DaTixConverter:
    """Convert prepared images to DaTix data."""

    def process_prepared_image(self, image_path: str) -> Optional[List[str]]:
        try:
            with Image.open(image_path) as img:
                img = img.convert("L")
                pixels = img.load()
                width, height = img.size
                datix_output: List[str] = []
                image_id = os.path.splitext(os.path.basename(image_path))[0]
                for y in range(height):
                    transition_slots = [
                        str(x) for x in range(width) if pixels[x, y] == 0
                    ]
                    stat_n = len(transition_slots)
                    stat_c = "BIN"
                    slots = "{" + ",".join(transition_slots) + "}"
                    row = f"DaTix,{image_id}<{y},{{{stat_n},{stat_c}}},{slots}"
                    datix_output.append(row)
                return datix_output
        except Exception as exc:  # noqa: BLE001
            print(f"Error converting {image_path}: {exc}")
            return None

    def save_to_csv(self, datix_data: List[str], output_path: str) -> None:
        if not datix_data:
            print("No data to save.")
            return
        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["DaTix_Data"])
            for row in datix_data:
                writer.writerow([row])
        print(f"Saved DaTix data to '{output_path}'")
