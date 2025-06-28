# Dynamic Data Weaver

This project bootstraps a small FastAPI backend and a simple static frontend.
The backend lives under `backend/` and is a proper Python package so modules can
be imported using package‑relative paths.

## Setup

1. Install Python 3.10 or later.
2. Run the setup script to install requirements and tools:

   ```bash
   bash setup.sh
   ```

## Running the API

Start the development server with `uvicorn`:

```bash
uvicorn backend.app:app --reload
```

The API exposes two endpoints:

* `GET /` – health check
* `POST /interpret` – process a logic string

## Using the Frontend

Open `frontend/index.html` in a browser. Update the `API` constant if your API
runs on a different host or port. The page provides a small form for testing the
interpret endpoint.

## Development Notes

Run the following checks before committing changes:

```bash
flake8 .
black --check .
pyright
pytest
```

See `AGENTS.md` for more details.
