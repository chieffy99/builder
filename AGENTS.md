# AGENTS.md
Contributor / Codex Ground Rules

> **Goal:** Stop accidental breakage; make every edit predictable & reviewable.
>
> **Audience:** ❶ Codex / AI agents that open PRs ❷ Human contributors.
> **Scope:** `/public` UI, `/core` logic, config, docs.

---

## 1. Folder Contract

| Folder       | Purpose                                                                    | Handlers               |
| ------------ | -------------------------------------------------------------------------- | ---------------------- |
| `/public`    | Static front‑end: `index.html`, `dashboard.html`, `wizard.html`, `assets/` | **UI PRs only**        |
| `/core`      | Python / FastAPI: `mapper.py`, `engine.py`, `api.py`                       | **Logic PRs only**     |
| `/config`    | `validate_rules.ini`, `compute_rules.yml`, `dict_core.json`                | updated via config PRs |
| `/tests`     | `pytest` suites — must stay **GREEN**                                      | auto‑run on every PR   |
| `/prototype` | throw‑away demos; **never** referenced from `/public`                      | free playground        |
| `/docs`      | PRD, Sitemap, design notes                                                 | read‑only in prod      |
| `/archive`   | Old snapshots                                                              | auto‑ignored           |

> **CI guard:** Deleting or editing a file **outside** the declared folder for that PR type fails the pipeline.

---

## 2. Theme Toggle (dark / light)

```css
/* in /public/assets/theme.css */
:root {
  --bg: #ffffff; --fg: #111; --card: #f5f5f5;
}
[data-theme="dark"] {
  --bg:#111; --fg:#eee; --card:#1e1e1e;
}
body {background:var(--bg); color:var(--fg);}  /* apply tokens */
.card {background:var(--card);}                 /* example */
```

```html
<!-- toggle button (add once in every html that needs it) -->
<button id="themeToggle" aria-label="switch theme">🌙</button>
<script>
  const root = document.documentElement;
  const current = localStorage.getItem('theme');
  if (current==='dark') root.setAttribute('data-theme','dark');
  document.getElementById('themeToggle').onclick = () => {
    root.toggleAttribute('data-theme','dark');
    localStorage.setItem('theme',root.hasAttribute('data-theme')?'dark':'light');
  };
</script>
```

*PRs that touch theme **MUST** follow this token system — no hard‑coded colours.*

---

## 3. Language Switch (i18n)

Minimal JS stub (to be replaced by real i18n later):

```html
<script type="module">
import strings from '/assets/i18n/th.json' assert { type: 'json' };
const $ = id => document.getElementById(id);
$('_lang').onclick = () => switchLang();
function switchLang(lang='th'){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.textContent = strings[lang][key] ?? key;
  })
}
</script>
```

*All new visible text **MUST** be wrapped in `[data-i18n]`.*

---

## 4. Compute & Validate Separation

1. **Phase‑1 Validate**  → `/config/validate_rules.ini`
2. **Phase‑2 Compute**   → `/config/compute_rules.yml`

> Codex: Never mix validate logic into `engine.py` — use the rule files.

---

## 5. Required Files

`/config/required_files.yml` defines critical assets.
CI fails if any PR deletes or renames them.

```yaml
required:
  - /public/dashboard.html
  - /core/engine.py
  - /config/dict_core.json
```

---

## 6. Contributor Checklist (every PR)

* [ ] CI ✅
* [ ] Folder compliance
* [ ] Tests added if logic touched
* [ ] README / Docs updated

> *Merge blocked* until all boxes ticked & one human reviewer approves.

---

## 7. Quick Commands

```bash
# run local dev
uvicorn core.api:app --reload
python -m http.server -d public 8080   # static preview
pytest -q                              # all tests
```

---

*Last updated: 2025‑07‑09*

## Data Storage Design Summary (Reference)

**Context:** When an *Obligation/Behaviour* is fully mapped to Logic, the engine can store & compute without extra JOINs.

| Step                                    | What happens                                                                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Field Mapping**                    | Bi‑directional `FieldMap` (external header ↔ Core Field) loaded as JSON. All incoming CSV/JSON headers are renamed on the fly.                          |
| **2. Central `TransactionSting` Table** | Wide table / DataFrame with core columns:<br>`Timeing Obligor Relation DebtIndicator CalcState Slot1‑7 FormulaBalance FormulaInterest Balance Interest` |
| **3. Formula Parser & Executor**        | Excel‑like strings kept in row (`Formula*`). Call `run_formula(expr, df, extra_vars)` row‑wise (time‑ordered).                                          |
| **4. Execution Chain**                  | `Ingest → Bind → Compute → Output` as single pipeline.                                                                                                  |
| **5. Storage Options**                  | a) Single CSV (no‑DB)  b) RDBMS Wide‑table (no JOIN)  c) Graph DB (Event + URI).                                                                        |

>    With this design, *Input fields → Logic → Output* coexist in one record; schema changes rarely needed.

---
# Instructions
- The user will provide a task.
- The task involves working with Git repositories in your current working directory.
- Wait for all terminal commands to be completed (or terminate them) before finishing.

# Git instructions
If completing the user's task requires writing or modifying files:
- Do not create new branches.
- Use git to commit your changes.
- If pre-commit fails, fix issues and retry.
- Check git status to confirm your commit. You must leave your worktree in a clean state.
- Only committed code will be evaluated.
- Do not modify or amend existing commits.

# AGENTS.md spec
- Containers often contain AGENTS.md files. These files can appear anywhere in the container's filesystem. Typical locations include `/`, `~`, and in various places inside of Git repos.
- These files are a way for humans to give you (the agent) instructions or tips for working within the container.
- Some examples might be: coding conventions, info about how code is organized, or instructions for how to run or test code.
- AGENTS.md files may provide instructions about PR messages (messages attached to a GitHub Pull Request produced by the agent, describing the PR). These instructions should be respected.
- Instructions in AGENTS.md files:
  - The scope of an AGENTS.md file is the entire directory tree rooted at the folder that contains it.
  - For every file you touch in the final patch, you must obey instructions in any AGENTS.md file whose scope includes that file.
  - Instructions about code style, structure, naming, etc. apply only to code within the AGENTS.md file's scope, unless the file states otherwise.
  - More-deeply-nested AGENTS.md files take precedence in the case of conflicting instructions.
  - Direct system/developer/user instructions (as part of a prompt) take precedence over AGENTS.md instructions.
- AGENTS.md files need not live only in Git repos. For example, you may find one in your home directory.
- If the AGENTS.md includes programmatic checks to verify your work, you MUST run all of them and make a best effort to validate that the checks pass AFTER all code changes have been made.
  - This applies even for changes that appear simple, i.e. documentation. You still must run all of the programmatic checks.

# Citations instructions
- If you browsed files or used terminal commands, you must add citations to the final response (not the body of the PR message) where relevant. Citations reference file paths and terminal outputs with the following formats:
  1) `【F:<file_path>†L<line_start>(-L<line_end>)?】`
  - File path citations must start with `F:`. `file_path` is the exact file path of the file relative to the root of the repository that contains the relevant text.
  - `line_start` is the 1-indexed start line number of the relevant output within that file.
  2) `【<chunk_id>†L<line_start>(-L<line_end>)?】`
  - Where `chunk_id` is the chunk_id of the terminal output, `line_start` and `line_end` are the 1-indexed start and end line numbers of the relevant output within that chunk.
- Line ends are optional, and if not provided, line end is the same as line start, so only 1 line is cited.
- Ensure that the line numbers are correct, and that the cited file paths or terminal outputs are directly relevant to the word or clause before the citation.
- Do not cite completely empty lines inside the chunk, only cite lines that have content.
- Only cite from file paths and terminal outputs, DO NOT cite from previous pr diffs and comments, nor cite git hashes as chunk ids.
- Use file path citations that reference any code changes, documentation or files, and use terminal citations only for relevant terminal output.
- Prefer file citations over terminal citations unless the terminal output is directly relevant to the clauses before the citation, i.e. clauses on test results.
  - For PR creation tasks, use file citations when referring to code changes in the summary section of your final response, and terminal citations in the testing section.
  - For question-answering tasks, you should only use terminal citations if you need to programmatically verify an answer (i.e. counting lines of code). Otherwise, use file citations.

*ref from OpenAI blog <a>https://openai.com/index/introducing-codex/</a>

---

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
