import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent / "dictionary.json"
with DATA_PATH.open("r", encoding="utf8") as f:
    datadict = json.load(f)


def map_statN(code: str) -> str:
    return datadict["statN"].get(str(code), "Unknown")


def map_statC(code: str) -> str:
    return datadict["statC"].get(str(code), "Unknown")


def map_slot(slot: str) -> str:
    return datadict["slotMeaning"].get(slot, "Unknown")


def map_ID1(code: str) -> str:
    return datadict["ID1"].get(code, "Unknown")

 
def map_ID2(code: str) -> str:
    return datadict["ID2"].get(code, "Unknown")