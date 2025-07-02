# Generic Data Mapping System

This repository contains the "Generic Data Mapping System" also referred to as the Anti-Normalization Engine. It demonstrates a minimal setup for representing data with logic embedded strings instead of normalized tables.

## Setup

Install the Python dependencies using pip:

```bash
pip install -r requirements.txt
```

## Running the API

Start the FastAPI application with uvicorn:

```bash
uvicorn backend.app:app
```

The API exposes a small `/interpret` endpoint that parses logic strings.

## CLI and Frontend

- `scripts/bootstrap_anti_norm.py` – helper script to bootstrap folders and example stubs.
- `frontend/` – static HTML and JavaScript files that illustrate a basic front end.
