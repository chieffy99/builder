import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent / "dictionary.json"
with DATA_PATH.open("r", encoding="utf-8") as f:
    datadict = json.load(f)


def map_statN(code):
    return datadict["StatN"].get(str(code), "Unknown")


def map_statC(code):
    return datadict["StatC"].get(str(code), "Unknown")


def map_slot(slot):
    return datadict["slotMeaning"].get(slot, "Unknown")


def map_ID1(code):
    return datadict["ID1Type"].get(code, "Unknown")


def map_ID2(code):
    return datadict["ID2Type"].get(code, "Unknown")
