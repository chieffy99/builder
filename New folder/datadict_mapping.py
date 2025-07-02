import json

with open("dictionary.json", "r", encoding="utf-8") as f:
    datadict = json.load(f)


def map_statN(code):
    return datadict["statN"].get(str(code), "Unknown")


def map_statC(code):
    return datadict["statC"].get(str(code), "Unknown")


def map_slot(slot):
    return datadict["slotMeaning"].get(slot, "Unknown")


def map_ID1(code):
    return datadict["ID1"].get(code, "Unknown")


def map_ID2(code):
    return datadict["ID2"].get(code, "Unknown")
