import json
import subprocess
from pathlib import Path

import backend.utils.datadict_mapping as py_map

REPO_ROOT = Path(__file__).resolve().parents[1]


def run_js(func: str, arg: str) -> str:
    script = (
        f"import {{ {func} }} from './datadict_mapping.js';\n"
        f"console.log(JSON.stringify({func}('{arg}')));"
    )
    result = subprocess.check_output(
        [
            "node",
            "--input-type=module",
            "--experimental-json-modules",
            "-e",
            script,
        ],
        cwd=REPO_ROOT,
        text=True,
    )
    return json.loads(result.strip())


def test_python_js_mappings_consistent():
    cases = [
        ("mapStatN", py_map.map_statN, "0"),
        ("mapStatC", py_map.map_statC, "A"),
        ("mapSlot", py_map.map_slot, "slot1"),
        ("mapID1", py_map.map_ID1, "Cust_OT"),
        ("mapID2", py_map.map_ID2, "SA"),
    ]

    for js_func, py_func, arg in cases:
        assert run_js(js_func, arg) == py_func(arg)
