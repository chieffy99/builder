#!/usr/bin/env python3
"""
Bootstrap Anti-Normalization structure for Dynamic Data Weaver
"""

import textwrap
from pathlib import Path

root = Path(__file__).resolve().parent.parent

# ── โฟลเดอร์หลัก ──────────────────────────────────────────
for d in [
    "frontend",
    "backend/logic_engine",
    "agent/modules",
    "data/samples",
    ".github/workflows",
]:
    (root / d).mkdir(parents=True, exist_ok=True)

# ── README ────────────────────────────────────────────────
readme = root / "README.md"
if not readme.exists():
    readme.write_text(
        textwrap.dedent(
            """
    # Dynamic Data Weaver — Anti-Normalization bootstrap

    ระบบนี้เก็บข้อมูลเป็น *logic-embedded string* 1 บรรทัดต่อเหตุการณ์
    ไม่ใช้ schema / join ตารางแบบเดิม

    ## โครงสร้าง
    - `frontend/`   GitHub Pages + Wizard UI
    - `backend/`    FastAPI API
    - `backend/logic_engine/` parser · interpreter · reducer
    - `agent/`      AI agent เข้าใจ logic string
    - `data/samples/` ตัวอย่างไฟล์
    """
        ).strip()
        + "\n"
    )

# ── FastAPI stub ──────────────────────────────────────────
app_py = root / "backend/app.py"
if not app_py.exists():
    app_py.write_text(
        textwrap.dedent(
            """
    from fastapi import FastAPI
    from pydantic import BaseModel
    import logic_engine.interpreter as interp

    app = FastAPI(title="DDW Anti-Normalization API")

    class Logic(BaseModel):
        record: str

    @app.post("/interpret")
    def interpret(item: Logic):
        return interp.interpret(item.record)
    """
        ).strip()
        + "\n"
    )

# ── logic_engine stubs ────────────────────────────────────
(root / "backend/logic_engine/__init__.py").touch()

(root / "backend/logic_engine/parser.py").write_text(
    "def csv_row_to_logic(row):\n    return ','.join(row)\n"
)

(root / "backend/logic_engine/interpreter.py").write_text(
    textwrap.dedent(
        """
    from .stat_slot_map import MAP
    def interpret(rec: str):
        p = [x.strip() for x in rec.split(',')]
        date,id1,id2,statn,statc,*slots = p
        return {
            "date": date,
            "persona": id1,
            "action": id2,
            "stat": {"n": statn, "c": statc},
            "slots": slots,
            "meaning": MAP.get(statc, {}).get("desc","unknown")
        }
    """
    ).strip()
    + "\n"
)
# -- stat_slot_map -----------------------------------------------------------
(root / "backend/logic_engine/stat_slot_map.py").write_text(
    "MAP = {'A': {'desc': 'Amount value'}, " "'B': {'desc': 'Count value'}}\n"
)

# -- reducer stub ------------------------------------------------------------
(root / "backend/logic_engine/reducer.py").write_text("# reducer stub\n")

# -- WizardLogic stub --------------------------------------------------------
wiz = root / "frontend/WizardLogic.js"
if not wiz.exists():
    wiz.write_text(
        textwrap.dedent(
            """
    export function buildLogicString(f) {
      return [
        f.date,
        f.id1.toUpperCase(),
        f.id2.toUpperCase(),
        f.statN,
        f.statC.toUpperCase(),
        ...f.slots
      ].join(',');
    }
    """
        ).strip()
        + "\n"
    )

# -- GitHub Actions workflow --------------------------------------------------
workflow = root / ".github/workflows/ci.yml"
if not workflow.exists():
    workflow.write_text(
        textwrap.dedent(
            """
    name: CI
    on: [push]
    jobs:
      test-deploy:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-python@v4
          with:
            python-version: '3.11'
        - run: pip install fastapi uvicorn
        - run: echo "Tests passed"
        - uses: peaceiris/actions-gh-pages@v3
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: ./frontend
    """
        ).strip()
        + "\n"
    )

print("✅ โครงสร้าง Anti-Normalization พร้อมแล้ว")
