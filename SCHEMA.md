# Data Dictionary Schema

This repository uses a JSON file (`backend/utils/dictionary.json`) to map short codes to their Thai descriptions. The following sections describe the available mappings.

## Fields

- **statN** – Numeric status indicator
- **statC** – Character status indicator
- **slotMeaning** – Description for each slot field
- **ID1** – Primary entity identifiers
- **ID2** – Transaction type identifiers
- **Obligor** – Codes describing a debt holder
- **Obligetion** – Codes describing obligation details

The JSON file can be extended with additional fields as needed. Each field is an object whose keys are the codes and whose values are the human‑readable descriptions.
