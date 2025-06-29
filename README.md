# Dynamic Data Weaver Demo

This repository contains a small prototype of the **Anti-Normalization** engine.
The backend provides a FastAPI service used by several HTML dashboards.

## Quick Setup

1. Install Python **3.10**.
2. Install dependencies using the provided `requirements.txt` (it lists
   **FastAPI**, **Uvicorn** and **Pydantic**):
   ```bash
   pip install -r requirements.txt
   ```
   You may also use `poetry install` if you prefer.
3. To install code style tools create `setup.sh` in the root with:
   ```bash
   #!/usr/bin/env bash
   pip install -r requirements.txt
   pip install flake8 black pyright
   echo 'export PYTHONPATH="$PWD"' >> ~/.bashrc
   ```
   Run it using:
   ```bash
   bash setup.sh
   ```
4. Optional secrets go in `.env.example`. Copy it to `.env` and fill your
   values. Keep your real `.env` out of version control.

### Validating Changes

Run these checks before committing:
```bash
flake8 .
black --check .
pyright
pytest
```

## Launching the API

Run the FastAPI app with Uvicorn:
```bash
uvicorn backend.app:app --reload
```
The API will be available at `http://localhost:8000`.

## Viewing the Frontend

Open `frontend/index.html` or any of the HTML files in the project with a web
browser. You can use a simple HTTP server such as:
```bash
python -m http.server
```
Then navigate to the desired page at `http://localhost:8000` (or the port
printed by the command).

