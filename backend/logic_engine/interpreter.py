from .stat_slot_map import MAP


def interpret(rec: str):

    parts = [x.strip() for x in rec.split(",")]
    date, id1, id2, statn, statc, *slots = parts
    return {
        "date": date,
        "persona": id1,
        "action": id2,
        "stat": {"n": statn, "c": statc},
        "slots": slots,
        "meaning": MAP.get(statc, {}).get("desc", "unknown"),
    }
