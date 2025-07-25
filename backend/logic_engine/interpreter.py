from .stat_slot_map import MAP


def interpret(rec: str):
    p = [x.strip() for x in rec.split(",")]
    if len(p) < 5:
        return {"error": "record must have at least 5 comma-separated values"}
    date, id1, id2, statn, statc, *slots = p
    return {
        "date": date,
        "persona": id1,
        "action": id2,
        "stat": {"n": statn, "c": statc},
        "slots": slots,
        "meaning": MAP.get(statc, {}).get("desc", "unknown"),
    }
