// สมมุติว่าเราได้อ่าน sting ที่มีโครงสร้างดังนี้:
// [Date, ID1, ID2, StatN, StatC, Slot1, Slot2, ..., SlotN]

// ฟังก์ชันสำหรับดึงค่า C จาก sting ที่มีเงื่อนไขเฉพาะ (Date, ID1, ID2, 0, C)
function getCValue(transaction: string[]): number {
  // สมมุติว่า Slot ที่เก็บค่า C อยู่ที่ตำแหน่งที่ N (ปรับตามการกำหนด)
  const slotC = transaction[transaction.length - 1];
  return Number(slotC);
}

// ฟังก์ชันคำนวณราคาทั้งหมดของ transaction
function calculatePrice(transaction: string[]): number {
  // สมมุติว่าค่า B (จำนวนสินค้า) อยู่ใน Slot ที่กำหนด
  const quantity = Number(transaction[5]); // ตัวอย่าง สมมุติเลข index =5
  const price = getCValue(transaction);
  return quantity * price;
}