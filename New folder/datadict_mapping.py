import json
from pathlib import Path

# Load dictionary relative to this file
DICT_PATH = Path(__file__).resolve().parent / 'dictionary.json'
with DICT_PATH.open('r', encoding='utf-8') as f:
    datadict = json.load(f)

def map_statN(code: str) -> str:
    """Map numeric status code to its meaning."""
    return datadict['statN'].get(str(code), 'Unknown')

def map_statC(code: str) -> str:
    """Map character status code to its meaning."""
    return datadict['statC'].get(str(code), 'Unknown')

def map_slot(slot: str) -> str:
    """Map slot name to its meaning."""
    return datadict['slotMeaning'].get(slot, 'Unknown')

def map_ID1(code: str) -> str:
    """Map ID1 code to its description."""
    return datadict['ID1'].get(code, 'Unknown')

def map_ID2(code: str) -> str:
    """Map ID2 code to its description."""
    return datadict['ID2'].get(code, 'Unknown')

def map_obligor(code: str) -> str:
    """Map Obligor code to its description if available."""
    return datadict.get('Obligor', {}).get(code, 'Unknown')

def map_obligetion(code: str) -> str:
    """Map Obligetion code to its description if available."""
    return datadict.get('Obligetion', {}).get(code, 'Unknown')

