const datadict = {
  "statN": {
    "0": "เงินสด",
    "1": "เงินเชื่อ",
    "2": "ชำระสินเชื่อ",
    "3": "เงินโอน"
  },
  "statC": {
    "A": "ผลลัพธ์คำนวณ",
    "B": "จำนวนนับ",
    "C": "ค่าคงที่"
  },
  "slotMeaning": {
    "slot1": "สินค้าประเภท 1",
    "slot2": "สินค้าประเภท 2",
    "slot3": "สินค้าประเภท 3",
    "slot4": "ค่าใช้จ่ายอื่น",
    "slot5": "ค่าลดหย่อน/อื่นๆ",
    "slot6": "ลด (Reduce)",
    "slot7": "หักลบ (Deduce)"
  },
  "ID1": {
    "Per_sup": "ซัพพลายเออร์",
    "DistRv": "ศูนย์กระจาย",
    "Cust_OT": "ลูกค้า OT",
    "Cust_MK": "ลูกค้า MK",
    "Cust_SH": "ลูกค้า SH",
    "ST": "คลังสินค้า"
  },
  "ID2": {
    "PO": "สั่งสินค้า",
    "RV": "ตีกลับ",
    "BL": "คงเหลือ",
    "PK": "เบิก",
    "RT": "ส่งคืน",
    "DM": "ของเสีย",
    "RF": "อ้างอิง",
    "SA": "ขาย",
    "BYT": "ซื้อ (OT)",
    "BYK": "ซื้อ (MK)",
    "BYH": "ซื้อ (SH)"
  }
};

export function mapStatN(code) {
  return datadict.statN[String(code)] || "Unknown";
}

export function mapStatC(code) {
  return datadict.statC[String(code)] || "Unknown";
}

export function mapSlot(slot) {
  return datadict.slotMeaning[slot] || "Unknown";
}

export function mapID1(code) {
  return datadict.ID1[code] || "Unknown";
}

export function mapID2(code) {
  return datadict.ID2[code] || "Unknown";
}
