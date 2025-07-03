import pytest

from backend.logic_engine.interpreter import interpret


@pytest.mark.parametrize(
    "rec,expected",
    [
        (
            "2024-06-11,ID1,ACT1,12,A,slot1,slot2",
            {
                "date": "2024-06-11",
                "persona": "ID1",
                "action": "ACT1",
                "stat": {"n": "12", "c": "A"},
                "slots": ["slot1", "slot2"],
                "meaning": "Amount value",
            },
        ),
        (
            "2024-06-12,ID2,ACT2,99,B,x,y,z",
            {
                "date": "2024-06-12",
                "persona": "ID2",
                "action": "ACT2",
                "stat": {"n": "99", "c": "B"},
                "slots": ["x", "y", "z"],
                "meaning": "Count value",
            },
        ),
    ],
)
def test_interpret(rec, expected):
    assert interpret(rec) == expected
