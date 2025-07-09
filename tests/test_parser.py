import pytest

from backend.logic_engine.parser import csv_row_to_logic


@pytest.mark.parametrize(
    "row,expected",
    [
        (["a", "b", "c"], "a,b,c"),
        (["x", "y,z", "w"], "x,y,z,w"),
        (["first", "", "third"], "first,,third"),
    ],
)
def test_csv_row_to_logic(row, expected):
    assert csv_row_to_logic(row) == expected
