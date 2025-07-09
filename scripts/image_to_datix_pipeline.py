import os
from typing import Optional

from datix_converter import DaTixConverter
from image_preparer import ImagePreparer


def run_pipeline(image_path: str) -> Optional[str]:
    preparer = ImagePreparer()
    prepared = preparer.prepare(image_path)
    if not prepared:
        return None
    converter = DaTixConverter()
    datix = converter.process_prepared_image(prepared)
    if datix is None:
        return None
    os.makedirs("datix_outputs", exist_ok=True)
    base = os.path.basename(image_path)
    out_path = os.path.join(
        "datix_outputs",
        os.path.splitext(base)[0] + "_datix.csv",
    )
    converter.save_to_csv(datix, out_path)
    return out_path


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python image_to_datix_pipeline.py <image_file>")
        raise SystemExit(1)
    image_file = sys.argv[1]
    result = run_pipeline(image_file)
    if result:
        print(f"Pipeline finished. Output saved to {result}")
    else:
        print("Pipeline failed")
