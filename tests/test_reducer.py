from backend.logic_engine.reducer import reduce_records


def test_reduce_records():
    recs = [
        "2024-06-11,ID1,ACT1,12,A",
        "2024-06-12,ID2,ACT2,3,A",
        "2024-06-13,ID3,ACT3,5,B",
    ]
    result = reduce_records(recs)
    assert result == {"A": 15.0, "B": 5.0}
