"""Helper to summarise stat numbers by code."""

from typing import Iterable, Dict

from .interpreter import interpret


def reduce_records(records: Iterable[str]) -> Dict[str, float]:
    """Aggregate numeric values by stat code.

    Parameters
    ----------
    records:
        Iterable of logic string records.

    Returns
    -------
    dict
        Mapping of stat code to summed numeric value.
    """

    totals: Dict[str, float] = {}
    for rec in records:
        parsed = interpret(rec)
        code = parsed["stat"]["c"]
        try:
            value = float(parsed["stat"]["n"])
        except ValueError:
            # skip if the value cannot be parsed to a number
            continue
        totals[code] = totals.get(code, 0.0) + value
    return totals
