# DSL and Rules for Anti-Normalization of Data

{datix,{id<id+1,{statN,statC,{slot1,slot2,...,slotN-1,slotN}}}}


## datix: Temporal/Sequential Data Status

Represents the **status field** used to classify, group, and order data based on **time-related behavior**. It prioritizes fields like date, time, and index. Time values that are not used for ordering do not qualify. Other fields like length or height are treated as part of the index group. If no date/time/index exists, a system-defined order should be used as the default.

When multiple time-related fields exist (e.g., day, month, year), assign priority using suffixes:
- datix1, datix2, ... based on descending time granularity
- The index comes last

**Rules:**
- If date/index is missing → default to row index
- Store values as decimals (e.g., 45555.235959)
- In Python, use float or Decimal types
- Duplicates not forbidden, but sequence must be preserved if needed for indexing/iteration

---

## id: Entity Relationship Identifier

Used to classify, group, and order data based on **relational behavior** (e.g., actor/participant roles in an event). Typically, at least **two distinct IDs** must exist with symbolic logic like id < id+1 indicating order or membership.

In legacy use, id1 and id2 represented **person** and **action**, respectively. Be cautious—these are **semantic placeholders**, not strict definitions.

**Rules:**
- Use id1 < id2 or assign one greater weight
- Column names mapped to each id must be unique
- Duplicate id values allowed within a column, but **not within the same row**

---

## stat: Symbolic State/Logic Modifier

Encodes **symbolic logic state** using single-character values:
- N: digits (0–9)
- C: uppercase letters (A–Z)

The order is strictly N before C in any row. This field may encode logic, formulas, or value flags mapped to specific slot data:
- Example: N = product name, C = cost price, P = sale price
- Binary flags like 1/0 may encode yes/no states

**Rules:**
- Fields mapped to stat are optional but must not conflict
- Default value required if not used in logic
- No duplicates or position swaps allowed

---

## slot: Operable Values / Data Carriers

The main container for **quantitative or operational data** used in processing, aggregation, or computation. May vary in type within the same row and work alongside stat for structured interpretation.

**Rules:**
- Structure: Slot1, Slot2, ..., SlotN
- Slot **headers must be unique**, though values can repeat
- Order of slots matters; count from a single direction
- Leave blank if data is missing
- Compatible with varying row counts or schemas, but logic should not conflict
- Cross-reference with id and slot headers to ensure safe usage

---

## Example Format Summary

You may use a combined format like:


DaTiX, id1, id2, {StatN, StatC}, {Slot1:1, ..., SlotN:N}


Ensure:
- No duplicate keys
- Column order is significant → rely on **Python dict insertion order** (3.7+) or use OrderedDict to enforce explicit ordering

