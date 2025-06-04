# Formula Generator - ใช้งานได้จริง!

## วิธีใช้ทันที:

### ตัวอย่าง 1: ลูกค้าซื้อข้าว
**INPUT:** "ลูกค้าที่ซื้อข้าวจากเรา" + เงินสด + เงินที่ได้
**MAPPING:** CU (ลูกค้า) + SA (ขาย) + StatN:0 (เงินสด) + StatC:A (เงิน)
**สูตร:** `=SUMIFS(slot7,ID1,"CU",ID2,"SA",StatN,"0",StatC,"A")`

### ตัวอย่าง 2: ซัพพลายเออร์ขายข้าว  
**INPUT:** "ผู้จำหน่ายที่ขายข้าวให้เรา" + เชื่อ + จำนวนชิ้น
**MAPPING:** SU (ซัพพลายเออร์) + BY (ซื้อ) + StatN:1 (เชื่อ) + StatC:B (จำนวน)
**สูตร:** `=SUMIFS(slot1,ID1,"SU",ID2,"BY",StatN,"1",StatC,"B")`

## Mapping Rules ที่ใช้ได้เลย:

```
ENTITIES (ใครหรืออะไร):
"ลูกค้า" → CU
"ผู้จำหน่าย" → SU  
"ร้าน" → SH
"ตลาด" → MK
"คลัง" → SK

ACTIONS (ทำอะไร):
"ขาย" → SA
"ซื้อ" → BY
"สั่ง" → PO
"เก็บ" → PK

STATUS (ประเภท):
เงินสด → StatN:0
เชื่อ → StatN:1
เงิน → StatC:A
จำนวน → StatC:B
ราคา → StatC:C
```

## สูตรพร้อมใช้:

```excel
// Basic
=SUMIFS(slot1,ID1,"CU",ID2,"SA")
=SUMIFS(slot7,ID1,"CU",ID2,"SA")

// Filtered  
=SUMIFS(slot7,ID1,"CU",ID2,"SA",StatN,"0",StatC,"A")

// Date Range
=SUMIFS(slot7,ID1,"CU",ID2,"SA",Date,">="&TODAY()-30)

// Wildcard
=SUMIFS(slot7,ID1,"CU*",ID2,"SA")
```

## ใช้งานจริง:
1. อ่าน mapping rules
2. แปลงพฤติกรรมเป็นรหัส
3. คัดลอกสูตรไปใช้ใน Excel

**นี่คือสิ่งที่ใช้งานได้จริง!** 🎯
