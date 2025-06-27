#,#ตัวอย่างการตั้งชื่อฟีลด์, name จับคู่กับสูตร ต่างๆ



PK: เบิกสินค้าแยกประเภทของ Dist = sumif(slot1,Dist_ID,PK,condition)
MKPKPT MKPKLT MKPKST MKPKCL MKPKCU
SHPKPT SHPKLT SHPKST SHPKCL SHPKCU

OTPKPT =SUMIFS(slot1, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTPKLT =SUMIFS(slot2, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTPKST =SUMIFS(slot3, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTPKCL =SUMIFS(slot4, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTPKCU =SUMIFS(slot5, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)


SA: ยอดขายแยกประเภทสินค้าของ Dist = Sum(sumif(slot1,Cust_ID,BY#,condition)) 
MKSAPT MKSALT MKSAST MKSACL MKSACU
SHSAPT SHSALT SHSAST SHSACL SHSACU

OTSAPT =SUMIFS(slot1, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTSALT =SUMIFS(slot2, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTSAST =SUMIFS(slot3, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTSACL =SUMIFS(slot4, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTSACU =SUMIFS(slot5, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)


DM: สินค้าเสื่อมสภาพแยกประเภท ของ Dist = sumif(slot1,Dist_ID,MK,condition) 
MKDMPT MKDMLT MKDMST MKDMCL MKDMCU
SHDMPT SHDMLT SHDMST SHDMCL SHDMCU

OTDMPT =SUMIFS(slot1, ID1, "OT", ID2, "DM", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTDMLT =SUMIFS(slot2, ID1, "OT", ID2, "DM", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTDMST =SUMIFS(slot3, ID1, "OT", ID2, "DM", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTDMCL =SUMIFS(slot4, ID1, "OT", ID2, "DM", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTDMCU =SUMIFS(slot5, ID1, "OT", ID2, "DM", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)

RT: สินค้าเหลือส่งกลับแยกประเภท ของ Dist = sumif(slot1,Dist_ID,RT,condition) 
MKRTPT MKRTLT MKRTST MKRTCL MKRTCU
SHRTPT SHRTLT SHRTST SHRTCL SHRTCU

OTRTPT =SUMIFS(slot1, ID1, "OT", ID2, "RT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTRTLT =SUMIFS(slot2, ID1, "OT", ID2, "RT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTRTST =SUMIFS(slot3, ID1, "OT", ID2, "RT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTRTCL =SUMIFS(slot4, ID1, "OT", ID2, "RT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
OTRTCU =SUMIFS(slot5, ID1, "OT", ID2, "RT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)



RU: ส่วนลดจากการขาย ของ Dist = sum(sumif(slot6,Cust_ID,BY#,condition))
OTSARU, MKSARU, SHSARU
=SUMIFS(slot6, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)


DU: รับเงินลูกหนี้การค้า (ในกรณีนี้คือเงินสดรับการชำระหนี้ที่เกิดจากการขายสินค้า) ของ Dist = sum(sumif(slot7,Cust_ID,BY#,condition))
OTSADU, MKSADU, SHSADU
=SUMIFS(slot7, ID1, "OT", ID2, "SA", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)

BL: ยอดคงเหลือของ Store
(ในกรณีนี้คือการรวมกันของยอดสินค้าเข้า (PO สั่งจาก Sup) ออก (PK เบิกจาก Dist) ของรอบวันของ store)
STBLPT, STBLLT, STBLST, STBLCL, STBLCU
=SUMIFS(slot1, ID1, "ST", ID2, "BL", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)

RF: ยอดโอนย้ายของ ST เป็นยอดเริ่มต้น (กรณีที่ปิดรอบ หรือเปิดรอบใหม่ โดยทั่วไปแล้วรายวันจะเป็น BL ต่อเนื่องกัน)
STRFPT, STRFLT, STRFST, STRFCL, STRFCU
=SUMIFS(slot1, ID1, "ST", ID2, "RF", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)

รอแก้ไข
TT: Totle ยอดรวม (sum Slot)
ตัวอย่าง: OTTTLT,MKTTLT,SHTTLT
=SUMIFS(slot1, ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")
=SUMIFS(slot2, ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot2,"0")
=SUMIFS(slot3, ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot3,"0")
=SUMIFS(slot4, ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot4,"0")
=SUMIFS(slot5, ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot5,"0")

รอแก้ไข
OTCLSH,MKCLSH,SHCLSH
=SUMIFS(slot1, ID1, "<>OT", ID2, "BYT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")
=SUMIFS(slot2, ID1, "<>OT", ID2, "BYT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot2,"0")
=SUMIFS(slot3, ID1, "<>OT", ID2, "BYT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot3,"0")
=SUMIFS(slot4, ID1, "<>OT", ID2, "BYT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot4,"0")
=SUMIFS(slot5, ID1, "<>OT", ID2, "BYT", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot5,"0")

รอแก้ไข
OTDEPT,MKDEPT,SHDEPT 
=SUMIFS(slot1, ID1, "<>OT", ID2, "BYT", StatN, "1", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")
=SUMIFS(slot2, ID1, "<>OT", ID2, "BYT", StatN, "1", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot2,"0")
=SUMIFS(slot3, ID1, "<>OT", ID2, "BYT", StatN, "1", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot3,"0")
=SUMIFS(slot4, ID1, "<>OT", ID2, "BYT", StatN, "1", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot4,"0")
=SUMIFS(slot5, ID1, "<>OT", ID2, "BYT", StatN, "1", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)*If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot5,"0")


statC=C: ตัวแปร(ราคาตั้งต้นเช่น)
OTSAPT
=If(and(ID1, "<>OT", ID2, "BYT", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")
=If(and(ID1, "OT", ID2, "SA", StatN, ">=0", StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")

SUPOPT
=If(and(ID1="SU",ID2="PO",StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")

=If(and(ID1="Name",ID2="Name",StatC="C",DaTiX"<="&DaTiXFin),slot1,"0")


PO: สินค้าเข้าแยกประเภทของ Sup
SUPOPT,SUPOLT,SUPOST,SUPOCL,SUPOCU

=SUMIFS(slot1, ID1, "SU", ID2, "PO", StatN, ">=0", StatC, "B",DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
=SUMIFS(slot2, ID1, "PS", ID2, "PO", StatN, ">=0", StatC, "B",DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
=SUMIFS(slot3, ID1, "SK", ID2, "PO", StatN, ">=0", StatC, "B",DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
=SUMIFS(slot4, ID1, "RE", ID2, "PO", StatN, ">=0", StatC, "B",DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)
=SUMIFS(slot5, ID1, "Name", ID2, "PO", StatN, ">=0", StatC, "B",DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)

12/31/2023,SU,PO,0,C,4.25,27,27,28,13.33,0,45170
12/31/2023,PS,PO,0,C,0,0,27,27,0,0,45170
12/31/2023,SK,PO,0,C,4,27,27,23,0,0,45170
12/31/2023,RE,PO,0,C,55,45,45,45,25,0,45170
12/31/2023,CS,BYT,0,C,6.5,55,55,55,25,0,45170
12/31/2023,CS,BYK,0,C,6.5,55,55,55,25,0,45170
12/31/2023,CS,BYH,0,C,6.5,55,55,55,25,0,45170
12/31/2023,SH00,BYH,0,C,7,55,55,55,25,0,45170



SHCLSH,SHDEPT,SHREDU,SHDEDU
MKCLSH,MKDEPT,MKREDU,MKDEDU
OTCLSH,OTDEPT,OTREDU,OTDEDU
OTPKPT,OTPKLT,OTPKST,OTPKCL,OTPKCU
OTSAPT,OTSALT,OTSAST,OTSACL,OTSACU
OTDMPT,OTDMLT,OTDMST,OTDMCL,OTDMCU
OTRTPT,OTRTLT,OTRTST,OTRTCL,OTRTCU


MKPKPT,MKPKLT,MKPKST,MKPKCL,MKPKCU
MKSAPT,MKSALT,MKSAST,MKSACL,MKSACU
MKDMPT,MKDMLT,MKDMST,MKDMCL,MKDMCU
MKRTPT,MKRTLT,MKRTST,MKRTCL,MKRTCU


SHPKPT,SHPKLT,SHPKST,SHPKCL,SHPKCU
SHSAPT,SHSALT,SHSAST,SHSACL,SHSACU
SHDMPT,SHDMLT,SHDMST,SHDMCL,SHDMCU
SHRTPT,SHRTLT,SHRTST,SHRTCL,SHRTCU
++++++++++++++++++++++++++++++++++++++++++++

### Description of each field จาก superstore data

* index (PK): Unique primary code (Auto run or UUID)
* Customer\ ID: Customer ID
* Item\ ID: Product/service code
* Channel: Sales channel (Online, Offline, etc.)
* DaTiX: Transaction date and time
* Event\ Type: Activity type (Sale, Return, Exchange, etc.)
* TID (Transaction ID): Bill/event code (can use grouping per bill)
* Quantity: Quantity
* Unit\ Price: Price per unit
* Base\ Cost: Cost per unit
* Discount: Discount
* Shipping\ Type: Transportation type (Normal, Express, etc.)
* Distance\ Grade: Distance level (1 = near, 2 = medium, 3 = far)
* Area\ Grade: Area grade (1 = city/center, 2 = suburban, 3 = provincial)
* Shipping\ Grade: Transportation grade (1 = economical, 2 = medium, 3 = Expensive)
* Shipping\ Indicator: Synthetic value for estimating shipping cost (Distance\ Grade + Area\ Grade + Shipping\ Grade)
* Geo\ Area: Destination area (province code, district, coordinates, etc.)
* Shipping\ Cost: Actual shipping cost (if any; if none, use Shipping\ Indicator)
* Profit: Profit (Unit\ Price - Base\ Cost - Shipping\ Cost) × Quantity
* Profit\ Ratio: % profit
* Remark/Note: Note
* SlotX/CustomField: Additional fields for encoding other logic/conditions


Row_ID,shiptime,Quantity,Totle,Unit_Price,DC_price,Margin,ต้นทุน,Sales,Discount,upd-ate_Profit,Loss_Profit,Profit,Ship Mode,Category,Sub-Category,Product Name,Product ID,Order ID,Customer ID,Customer Name,Segment,City,Postal Code,State,Region,Country
1709,6,2,7.42,3.71,3.71,1.855,1.855,7.42,0,3.71,0,3.71,Standard Class,Office Supplies,Paper,"While you Were Out" Message Book, One Form per Page,OFF-PA-10003424,CA-2017-123491,JK-15205,Jamie Kunitz,Consumer,San Francisco,94122,California,West,United States
3783,3,3,11.13,3.71,2.968,1.113,1.855,8.904,0.2,3.339,0,3.339,Second Class,Office Supplies,Paper,"While you Were Out" Message Book, One Form per Page,OFF-PA-10003424,CA-2017-165204,MN-17935,Michael Nguyen,Consumer,Memphis,38109,Tennessee,South,United States
7322,4,3,11.13,3.71,2.968,1.113,1.855,8.904,0.2,3.339,0,3.339,Standard Class,Office Supplies,Paper,"While you Were Out" Message Book, One Form per Page,OFF-PA-10003424,CA-2017-167626,MY-18295,Muhammed Yedwab,Corporate,Chicago,60623,Illinois,Central,United States


# ตัวอย่างการตั้งชื่อฟีลด์, name และการใช้งานในรูปแบบต่างๆ 
+++++++++++++++++++++++++++++++++
Index, Field Name, Data Type, Description
1, DaTiX, Date (YYYY/MM/DD), Date of data
2, ID1, Text, ID from the original database key or newly created used with ID2 to define the location and behavior of the added input. Can contain both letters and numbers
3, ID2, Text, ID from the original database key or newly created used with ID1 to define the location and behavior of the added input. Can contain both letters and numbers
4, StatN, Single Number (0:9), used with StatC to represent the rules of the data system used. This number does not need to be entered as an input
5, StatC, Single Character (A:Z), used with StatN to represent the rules of the data system used. This character does not need to be entered as an input
6, slot (1:n), Text, The required value Input can be as many as the logic management and data system used can support. Both Text and Number can be used. These values ​​are counted in order from left to right and cannot be blank. In this context slot1 to 5 are normal input values. The definition will be in the end rule or logic.
7, slot6, Text, reduce here means the discount value of data that is different according to the group to be used. For example the warehouse will be the number of products while the sales will be the customer's discount amount which does not change according to the usage of the data system used.
8, slot7, Text, Debpaid is a value used in the trading system when the customer pays the debt of the product. In finance it may be used as a total area to check in the data set itself. It has no meaning when in the code form.


*This text system is still in the testing phase. The definition of the call or meaning has not been specified. The number of slots of the Input can be as many as the logic management and data system used can be used. Both Text and Number can be used,,but the purpose is to create the leanest. These values ​​will be counted in order from left to right and cannot be empty. The first one will always be after StatC.
+++++++++++++++++++++++

StatC, label, Description
A, Result value, แสดงค่าเงินที่ผ่านการคำนวนในระบบบัญชี หรือใช้ในระบบคลังสินค้าเพื่อดูมูลค่าหรือผลคำนวนจาก B กับ C 
B, Count value, แสดงค่าของจำนวนต่างๆที่ยังไม่ผ่านการคำนวนกับตัวแปรในตาราของ slot ในรหัส Input ลดการคำนวนที่ไม่จำเป็นได้ดี หากเป็นรหัส Input ที่มาจากข้อมูลอื่น เข้ามาใตระบบการเงิน ค่านี้จะบังคับเป็น A ด้วยการคำนวนกับ Static Value ในตารางของมัน
C, Static value, เป็นค่าที่จะใช้แก้ไขในระบบฐานข้อมูลประเภทค่าคงที่หรือฐานข้อมูลที่ไม่มีการเปลี่ยนแปลงตามเวลา สามารถดูจุดที่จะแก้ไขได้จาก ID1 จับคู่กับ ID2 หากมีการใช้ในคำสั่งอื่นที่ไม่ได้กำหนดการแก้ไข จะหมายถึงการเรียกดูค่าที่ตรงกับ input ของ slot ในรหัส
++++++++++++++++++++++++++++++++++++

StatN, label, Description
0, เงินสด, 0
1, หนี้,เงินเชื่อ
2, ชำระสินเชื่อ, ใช้ในระบบข้อมูลบัญชี หากมาจาก รหัส input ที่ใช้กับฐานข้อมูลอื่น จะเป็นค่าของ slot7:Debpaid 
3, เงินโอน, ใช้ในระบบข้อมูลบัญชีเพื่อแยกรายการชำระ
+++++++++++++++++++++++++++++++++++++++++

ID1, Key, ตัวอย่าง
Per_sup, Sup_ID, "SU,PS,SK"
ST_ID, Store_ID, "ST"
Per_dist, Dist_ID, "OT,MK,SH"
Cust_OT, "Dist_ID with suffix sus as charecter or number",,"OTE,OT00,OT01,...,OTn"
Cust_MK, "Dist_ID with suffix sus as charecter or number",,"MKE,MK00,MK01,...,MKn"
Cust_SH, "Dist_ID with suffix sus as charecter or number",,"SHE,SH00,SH01,...,SHn"
+++++++++++++++++++++++++++++++++

ID2, ความหมาย, from, result, to
BL, คงเหลือ (Balancr), ST, เช็ค, ST
PO, สั่งสินค้า (Order), Sup_id, เพิ่ม, ST
RV, ตีกลับ (Rrvert), Sup_id, ลด, ST
PK, เบิก (Picking), Dist_ID, ลด, ST
RT, ส่งคืน (Return), Dist_ID, เพิ่ม, ST
DM, DM (Damage), Dist_ID, ลด, Dist_ID
RF, อ้าอิง (Refer), Dist_ID, ยกยอด, Dist_ID
BY, ซื้อ (Buy), Cust_id, ลด, Dist_ID
SA, ขาย (sale) , Dist_ID, เพิ่ม, Cust_id
+++++++++++++++++++++++++++++++++++++++

Sup_ID, Sup_name, Sup_cost, PT, LT, ST, CL, CU, Wc, Bs
SU, SU supply, SU0cost, 4.25, 27, 27, 28, 13.33, 0, 0
PS, PS เพชรสมุทร, PS0cost, 0, 0, 27, 27, 0, 0, 0
SK, SK supply, SK0cost, 4, 27, 27, 22.86, 0, 0, 0
RE, RE ซื้อปลีก, RE0cost, 5, 40, 40, 40, 20, 55, 0
++++++++++++++++

Store_ID, Province_name, PT, LT, ST, CL, CU, Wc, Bs
ST, วัดพันท้าย, 6.50, 55, 55, 55, 25, 75, 100
+++++++++++++++++++++++++++++++

Dist_ID, Province_name, PT, LT, ST, CL, CU, Wc, Bs
OT, วัดศาล, 6.50, 55, 55, 55, 25, 75, 100
MK, ตลาดศาล, 6.50, 55, 55, 55, 25, 75, 100
SH, วัดพันท้าย, 6.50, 55, 55, 55, 25, 75, 100
+++++++++++++++++++++++++++

Cust_id, Cust_name, Cust_status, Dist_ID, Dep
++++++++++++++++++++++++++++++

Pro_id, Pro_name, Pro_cost,,WS_price, RS_price, SU0cost, PS0cost, SK0cost, RE0cost, Cate_id, Shelf_no, Pro_status, Record_DaTiX
PT, แพค, 4.25, 6.5, 7, 4.25, 0, 4, 5, ice, shf, 1, 1/9/2023
LT, ล.ใหญ่, 27, 55, 60, 27, 0, 27, 40, ice, shl, 1, 1/9/2023
ST, ล.เล็ก, 27, 55, 60, 27, 27, 27, 40, ice, shl, 1, 1/9/2023
CL, ป่น, 28, 55, 60, 28, 27, 23, 40, ice, shl, 1, 1/9/2023
CU, กั๊ก, 13.33, 25, 25, 13.33, 0, 0, 20, ice, shl, 1, 1/9/2023
Wc, น้ำถ้วย, 55, 75, 75, 0, 0, 0, 55, wa, shl, 1, 1/9/2023
Bs, บริการถัง, 0, 100, 100, 0, 0, 0, 0, svr, shs, 1, 1/9/2023
++++++++++++++++++++++++++++++++++++++++

Shelf_no, Shelf_name
shf, ตู่แช่
shl, ถัง
shs, ถังเล็ก
+++++++++++++++++++++++++++++++++

Cate_id, Cate_name
ice, น้าแข็ง
wa, น้าดื่ม
svr, บริการ

+++++++++++++++++++++++++++++++++


ข้อมูลการเงิน
------------------
ID1, ID2, slot1, slot2, slot3, slot4, slot5

Per_dist, INC, ST, OT, MK, EX, Other
INC, INC, คุ้มสกุล, CH, แม่, Other, 0

Fuel, Vehicle, ST, OT, MK, 0, 0
Part, Vehicle, ST, OT, MK, 0, 0
ทะเบียน, Vehicle, ST, OT, MK, 0, 0
ค่างวด, Vehicle, ST, OT, MK, 0, 0

EL_WA, Upk, E0House, E0Office, W0House, W0Office, W0Papa
อื่นๆ, Upk, เอกสาร, ขยะ, ที่ดิน, 0, 0
Call, Upk, Aoff, Doff, Apapa, Dpapa, 0
Call2, Upk, JACK, แม่, พี่ต้อย, wifi, ai

JACK, JA, JACK, ออมแม่, เรียน, 0, 0
Other, JA, ออมถัง, Other, 0, 0, 0
พ่อ, JA, พ่อ, 0, 0, 0, 0
name, Other, name, 0, 0, 0, 0


บีน, Wag, 220, 170, 0, 0, 0
เบน์, Wag, 220, 200, 0, 0, 0
มด, Wag, 230, 200, 0, 0, 0
ดาว, Wag, 320, 130, 0, 0, 0
บัง, Wag, 220, 170, 150, 0, 0
ต้น, Wag, 220, 170, 0, 0, 0
ปัง, Wag, 220, 170, 0, 0, 0

SU, Pro_Cost, PT, LT, ST, CL, CU
PS, Pro_Cost, PT, LT, ST, CL, CU
SK, Pro_Cost, PT, LT, ST, CL, CU
RE, Pro_Cost, PT, LT, ST, CL, CU

+++++++++++++++++++++++++++++++++
ข้อมูลพนักงาน
Emp_id, Emp_name, Emp_type, ครึ่งเช้า, ครึ่งบ่าย, ค่าแรงแทน, แบบงวด
พ่อ_Pr, พ่อ, Prime, 0, 0, 0, 0
แม่_Pr, แม่, Prime, 0, 0, 0, 0
Kai_Cl, Kai, Clerk, 500, 0, 35, 0
หนุ่ย_Dr, หนุ่ย, Driver, 500, 0, 0, 0
บีน_Cl, บีน, Clerk, 220, 170, 0, 0
เบน์_Cl, เบน์, Clerk, 220, 200, 0, 0
มด_Dr, มด, Driver, 230, 200, 0, 0
ดาว_Ge, ดาว, General, 320, 130, 0, 0
บัง_Ge, บัง, General, 220, 170, 150, 0
ต้น_Ge, ต้น, General, 220, 170, 0, 0
ปัง_Ge, ปัง, General, 220, 170, 0, 0
พิเศษ_Ex, พิเศษ, Extra, 0, 0, 0, 0
แจ็ค_Fi, แจ็ค, Finance, 0, 0, 0, 0

