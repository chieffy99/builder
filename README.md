# Generic Data Mapping System

The Generic Data Mapping System demonstrates the "Anti-Normalization" approach for representing business logic. Instead of normalised tables, it encodes meaning directly in field names and formulas. The project includes a small API and example scripts to bootstrap data.

## Setup

1. Install Python 3.10 packages:

```bash
pip install -r requirements.txt
```

Or run the helper script:

```bash
bash setup.sh
```

## Running the API

Start the FastAPI server:

```bash
uvicorn backend.app:app
```

Visit `/interpret` to test the logic string interpreter.

## Running Tests

Run the unit tests directly from the project root:

```bash
pytest
```

The `pytest.ini` file configures `PYTHONPATH` automatically so no extra setup is required.

## Usage

- `scripts/bootstrap_anti_norm.py` prepares example folders and files.
- `frontend/` holds a minimal static interface for exploring field generation.
- `scripts/image_to_datix_pipeline.py` converts a scanned table image into the
  DaTix CSV format.

## System Overview

The engine maps data via concise tokens:

- **Ontology** – events, words, logic, space, time, gravity and transform.
- **Hierarchy** – `A##` individual, `B##` channel, `C##` business, `D##` market.
- **Operations** – `AG` average, `SM` sum, `CT` count, etc.

Fields follow `{LEVEL}{OPERATION}{TARGET}` such as `AAGPT` ("average PT for individual customers"). A formula template like `SUMIFS` processes the slots behind each field. The pattern system allows infinite combinations without memorising every name.

Pre-computed aggregates and data dictionary entries let the API quickly resolve requests while keeping formulas consistent. AI components match patterns and choose the correct calculation tools rather than computing numbers directly.

---

This concise README provides instructions for installing dependencies, running the API, and understanding the high-level design. For full details, explore the code and configuration files in this repository.
