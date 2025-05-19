# Dynamic Data Weaver — Anti-Normalization bootstrap

ระบบนี้เก็บข้อมูลเป็น *logic-embedded string* 1 บรรทัดต่อเหตุการณ์
ไม่ใช้ schema / join ตารางแบบเดิม

## โครงสร้าง
- `frontend/`   GitHub Pages + Wizard UI
- `backend/`    FastAPI API
- `backend/logic_engine/` parser · interpreter · reducer
- `agent/`      AI agent เข้าใจ logic string
- `data/samples/` ตัวอย่างไฟล์
