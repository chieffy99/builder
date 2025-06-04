Formula Generator - Behavior Based Classification

==============================================
INPUT: พฤติกรรมของข้อมูล
OUTPUT: สูตร SUMIFS พร้อมใช้
==============================================

วิธีใช้:
1. บอกหน้าที่ของข้อมูล เช่น "ลูกค้าที่ซื้อข้าว"
2. เลือกประเภท: เงิน/จำนวน/ราคา, เงินสด/เชื่อ
3. ได้สูตรพร้อมใช้

==============================================
ตัวอย่าง:

INPUT: "ลูกค้าที่ซื้อข้าวจากเรา"
→ Entity: CU (Customer)
→ Action: SA (Sale)  
→ เงินสด + เงินที่ได้
→ OUTPUT: =SUMIFS(slot7,ID1,"CU",ID2,"SA",StatN,"0",StatC,"A")

INPUT: "ผู้จำหน่ายที่ขายข้าวให้เรา"  
→ Entity: SU (Supplier)
→ Action: BY (Buy)
→ เชื่อ + จำนวนชิ้น
→ OUTPUT: =SUMIFS(slot1,ID1,"SU",ID2,"BY",StatN,"1",StatC,"B")

==============================================
Mapping Rules:

ENTITIES:
- ลูกค้า, คนซื้อ, ซื้อจากเรา → CU
- ผู้จำหน่าย, แหล่งสินค้า, ขายให้เรา → SU  
- ร้าน, สาขา, จุดขาย → SH
- ตลาด → MK
- คลัง, สต็อก → SK

ACTIONS:
- ขาย, จำหน่าย → SA
- ซื้อ, สั่งซื้อ → BY
- สั่ง, ใบสั่ง → PO
- เก็บ, หยิบ → PK

STATUS:
- เงินสด → StatN: 0
- เชื่อ → StatN: 1
- เงิน → StatC: A
- จำนวน → StatC: B  
- ราคา → StatC: C

==============================================
สูตรที่ได้:

1. Basic:
=SUMIFS(slot1,ID1,"[ENTITY]",ID2,"[ACTION]")
=SUMIFS(slot7,ID1,"[ENTITY]",ID2,"[ACTION]")

2. Filtered:  
=SUMIFS(slot7,ID1,"[ENTITY]",ID2,"[ACTION]",StatN,"[N]",StatC,"[C]")

3. Date Range:
=SUMIFS(slot7,ID1,"[ENTITY]",ID2,"[ACTION]",Date,">="&TODAY()-30)

4. Wildcard:
=SUMIFS(slot7,ID1,"[ENTITY]*",ID2,"[ACTION]")

==============================================
นี่คือสิ่งที่ใช้งานได้จริง - คัดลอกไปใช้ใน Excel ได้เลย!
