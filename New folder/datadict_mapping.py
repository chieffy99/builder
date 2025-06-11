import json
from pathlib import Path
 
# โหลด dictionary
with open("dictionary.json", "r", encoding="utf8") as f:
DATA_PATH = Path(__file__).resolve().parent / "dictionary.json"
with DATA_PATH.open("r", encoding="utf8") as f:
     datadict = json.load(f)
 

 def map_statN(code):
    return datadict["statN"].get(str(code), "Unknown")
    return datadict["StatN"].get(str(code), "Unknown")

 
 def map_statC(code):
    return datadict["statC"].get(str(code), "Unknown")
    return datadict["StatC"].get(str(code), "Unknown")

 
 def map_slot(slot):
     return datadict["slotMeaning"].get(slot, "Unknown")
 

 def map_ID1(code):
    return datadict["ID1"].get(code, "Unknown")
    return datadict["ID1Type"].get(code, "Unknown")

 
 def map_ID2(code):
    return datadict["ID2"].get(code,
    return datadict["ID2Type"].get(code, "Unknown")

