# AGENTS.md  
**A no-frills guide for Codex agents and humans**  

---

## 1. Where to Work  
• All code and data live in the root folder of this repo.  
• If you need to read or write files, use relative paths from here.  

---

## 2. Environment Setup  
1. **Python version**  
   • We use Python 3.10.  
2. **Dependencies**  
   • Run `pip install -r requirements.txt`  
   • (Or: `poetry install` if you prefer Poetry)  
3. **Linters & Formatters**  
   • Code style: `flake8` and `black`  
   • Type checking: `pyright`  

---

## 3. Setup Script  
Create a file called `setup.sh` in the root with these lines:
```bash
#!/usr/bin/env bash
# 1. Install main packages
pip install -r requirements.txt

# 2. Install linter and type checker
pip install flake8 black pyright

# 3. (Optional) Persist any exports
echo 'export PYTHONPATH="$PWD"' >> ~/.bashrc
```
**How to run it**:  
```
bash setup.sh
```

---

## 4. Environment Variables & Secrets  
• If you need a variable (e.g. `API_KEY`), put it in a file named `.env.example` like this:  
  ```env
  # copy this to .env and fill in your values
  API_KEY=
  OTHER_SECRET=
  ```  
• **Codex** will load `.env` automatically if present.  
• **Do NOT** commit your real `.env`.

---

## 5. How to Validate Changes  
1. **Lint**  
   ```
   flake8 .
   ```  
2. **Format Check**  
   ```
   black --check .
   ```  
3. **Type Check**  
   ```
   pyright
   ```  
4. **Unit Tests**  
   ```
   pytest
   ```  
All checks must pass before merging.

---

## 6. How Codex Should Work  
1. **Read AGENTS.md** → then run `setup.sh`.  
2. **Never** hard-code field names—use the `field_map` dict.  
3. **Embed** any formula logic in `FormulaBalance` or `FormulaInterest` columns.  
4. **Use** `run_formula(expr, df, extra_vars)` for calculations.  
5. **Write** all outputs back to a single CSV/Excel—no JOINs.  

---

## 7. Pull Request & Commit Messages  
• **Branch name**: `feature/<short-description>`  
• **Commit message**:  
  ```
  [area] short sentence in present tense  
  ```  
  e.g. `[ingestion] add setup.sh and requirements.txt`  

---

## 8. Agent Reporting  
• Each time Codex makes a change, add a one-line note to `CHANGELOG.md`  
  ```
  2025-06-07: MapperAgent added mapping for 'ชื่อผู้ใช้' → 'Obligor'
  ```  
• Use simple English sentences.  

---

## 9. Summary  
With this file in place, Codex can:  
1. Install exactly what it needs  
2. Know where to run and write code  
3. Use consistent style and tests  
4. Log every change for you to review  

No jargon, no hidden steps—just drop **AGENTS.md** and let Codex get to work.  
