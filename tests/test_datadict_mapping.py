import pytest

from backend.utils.datadict_mapping import (
    map_statN,
    map_statC,
    map_slot,
    map_ID1,
    map_ID2,
)


def test_map_statN_known_code():
    assert map_statN("0") == "เงินสด"


def test_map_statC_known_code():
    assert map_statC("A") == "ผลลัพธ์คำนวณ"


def test_map_slot_known():
    assert map_slot("slot1") == "สินค้าประเภท 1"


def test_map_ID1_known():
    assert map_ID1("Per_sup") == "ซัพพลายเออร์"


def test_map_ID2_known():
    assert map_ID2("SA") == "ขาย"
