// DSLParser.js
/**
 * แปลงบรรทัด DSL record เป็น JS object
 * รูปแบบ: date,{ID1<ID2},{StatN,StatC},{slot1,slot2,…,slotN}
 * Ex: "2024-07-02,{OT<PK},{0,B},{slot1,slot2,slot3}"
 * Output:
 * {
 *   date:       "2024-07-02",
 *   id1:        "OT",
 *   id2:        "PK",
 *   statN:      "0",
 *   statC:      "B",
 *   slots:      ["slot1","slot2","slot3"]
 * }
 */
export function parseDSLRecord(record) {
  // แยกส่วนโดยจับกลุ่ม {...} หรือค่าที่ไม่ใช่ comma
  const parts = Array.from(
    record.matchAll(/\{[^}]*\}|[^,]+/g),
    m => m[0].trim()
  );

  if (parts.length < 4) {
    throw new Error(`Invalid DSL record, expected 4 parts but got ${parts.length}`);
  }

  // ส่วนแรก = date
  const date = parts[0];

  // ส่วนสอง = "{ID1<ID2}", ลบ { } แล้วแยกที่ '<'
  const idPart = parts[1].replace(/^{|}$/g, '');
  const [ id1, id2 ] = idPart.split('<').map(s => s.trim());
  if (!id1 || !id2) {
    throw new Error(`Invalid ID part '${idPart}'`);
  }

  // ส่วนสาม = "{StatN,StatC}", ลบ { } แล้วแยก comma
  const statPart = parts[2].replace(/^{|}$/g, '');
  const [ statN, statC ] = statPart.split(',').map(s => s.trim());
  if (statN === undefined || statC === undefined) {
    throw new Error(`Invalid Stat part '${statPart}'`);
  }

  // ส่วนสี่ = "{slot1,slot2,…}", ลบ { } แล้วแยก comma
  const slotsPart = parts[3].replace(/^{|}$/g, '');
  const slots = slotsPart.split(',').map(s => s.trim()).filter(Boolean);
  if (slots.length === 0) {
    throw new Error(`No slots found in '${slotsPart}'`);
  }

  return { date, id1, id2, statN, statC, slots };
}

// Usage example:
const rec = "2025-07-02,{OT<PK},{0,B},{slot1,slot2,slot3}";
console.log(parseDSLRecord(rec));
// → { date:"2025-07-02", id1:"OT", id2:"PK", statN:"0", statC:"B", slots:["slot1","slot2","slot3"] }
