# 🔧 คู่มือผู้ดูแลระบบ - Anti-Normalization Engine Formula Generator

## 📋 ภาพรวมระบบ

### โครงสร้างไฟล์
```
C:\FormulaGen\
├── formula_generator.py    # โปรแกรมหลัก
├── start_generator.bat     # ไฟล์เริ่มต้นใช้งาน  
├── USER_MANUAL.md         # คู่มือผู้ใช้แบบละเอียด
├── QUICK_START.md         # คู่มือเริ่มต้นใช้งาน
├── ADMIN_GUIDE.md         # คู่มือนี้
└── test.bat              # ไฟล์ทดสอบ
```

### ข้อกำหนดระบบ
- **OS**: Windows 10/11
- **Python**: 3.7+ 
- **Memory**: 512MB RAM
- **Storage**: 10MB ว่าง
- **Dependencies**: ไม่มี (ใช้ built-in modules)

---

## ⚙️ การติดตั้งและการตั้งค่า

### การติดตั้งใหม่
```powershell
# 1. สร้างโฟลเดอร์
New-Item -ItemType Directory -Force -Path "C:\FormulaGen"

# 2. ดาวน์โหลดไฟล์
# (วางไฟล์ formula_generator.py ในโฟลเดอร์)

# 3. ทดสอบการทำงาน
cd C:\FormulaGen
python formula_generator.py
```

### การอัปเดต
```powershell
# สำรองไฟล์เก่า
Copy-Item "C:\FormulaGen\formula_generator.py" "C:\FormulaGen\formula_generator.py.backup"

# อัปเดตไฟล์ใหม่
# (แทนที่ไฟล์เก่าด้วยไฟล์ใหม่)

# ทดสอบ
python formula_generator.py
```

---

## 🎛️ การปรับแต่งและการกำหนดค่า

### เพิ่มเอนทิตีใหม่
แก้ไขใน `formula_generator.py`:
```python
ENTITY_MAPPING = {
    "ลูกค้า": "CU", "customer": "CU", "1": "CU",
    "ผู้จำหน่าย": "SU", "supplier": "SU", "2": "SU", 
    "ร้าน": "SH", "shop": "SH", "3": "SH",
    "ตลาด": "MK", "market": "MK", "4": "MK",
    "คลัง": "SK", "stock": "SK", "5": "SK",
    # เพิ่มใหม่
    "พาร์ทเนอร์": "PT", "partner": "PT", "6": "PT",
    "สาขา": "BR", "branch": "BR", "7": "BR"
}
```

### เพิ่มการกระทำใหม่
```python
ACTION_MAPPING = {
    "ขาย": "SA", "sell": "SA", "1": "SA",
    "ซื้อ": "BY", "buy": "BY", "2": "BY",
    "สั่ง": "PO", "order": "PO", "3": "PO", 
    "เก็บ": "PK", "pick": "PK", "4": "PK",
    # เพิ่มใหม่
    "แลกเปลี่ยน": "EX", "exchange": "EX", "5": "EX",
    "คืน": "RT", "return": "RT", "6": "RT"
}
```

### เพิ่มสถานะการชำระใหม่
```python
STATUS_TYPE_MAPPING = {
    "เงินสด": "0", "cash": "0", "1": "0",
    "เชื่อ": "1", "credit": "1", "2": "1",
    # เพิ่มใหม่
    "ผ่อน": "2", "installment": "2", "3": "2"
}
```

### เพิ่มประเภทข้อมูลใหม่
```python
VALUE_TYPE_MAPPING = {
    "เงิน": "A", "money": "A", "1": "A",
    "จำนวน": "B", "quantity": "B", "2": "B", 
    "ราคา": "C", "price": "C", "3": "C",
    # เพิ่มใหม่
    "ส่วนลด": "D", "discount": "D", "4": "D",
    "ภาษี": "E", "tax": "E", "5": "E"
}
```

---

## 🛡️ การรักษาความปลอดภัย

### การสำรองข้อมูล
```powershell
# สร้างไฟล์สำรองรายวัน
$date = Get-Date -Format "yyyyMMdd"
Copy-Item "C:\FormulaGen\*" "C:\Backup\FormulaGen_$date\" -Recurse
```

### การควบคุมการเข้าถึง
```powershell
# จำกัดสิทธิ์โฟลเดอร์ (เฉพาะ Admins)
icacls "C:\FormulaGen" /grant Administrators:F /inheritance:r
icacls "C:\FormulaGen" /grant "Domain Users":R
```

### การตรวจสอบการเปลี่ยนแปลง
```powershell
# ตรวจสอบ hash ของไฟล์
Get-FileHash "C:\FormulaGen\formula_generator.py" -Algorithm SHA256
```

---

## 📊 การติดตามและการตรวจสอบ

### การติดตามการใช้งาน
เพิ่มระบบ logging ใน `formula_generator.py`:
```python
import logging
from datetime import datetime

# ตั้งค่า logging
logging.basicConfig(
    filename='C:\\FormulaGen\\usage.log',
    level=logging.INFO,
    format='%(asctime)s - %(message)s'
)

# ใน function generate_formula()
def generate_formula():
    logging.info(f"Formula generated: Entity={entity}, Action={action}")
    # ... existing code ...
```

### การตรวจสอบประสิทธิภาพ
```python
import time

def performance_monitor(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Execution time: {end_time - start_time:.2f} seconds")
        return result
    return wrapper
```

---

## 🚨 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

#### 1. Python ไม่พบ
```powershell
# ตรวจสอบการติดตั้ง Python
python --version
py --version

# ติดตั้ง Python ใหม่
# ดาวน์โหลดจาก python.org
```

#### 2. Encoding Error (ภาษาไทยแสดงผิด)
```python
# เพิ่มใน formula_generator.py
import sys
sys.stdout.reconfigure(encoding='utf-8')
```

#### 3. Permission Denied
```powershell
# รันด้วยสิทธิ์ Administrator
Start-Process powershell -Verb runAs
cd C:\FormulaGen
python formula_generator.py
```

### Log การแก้ไขปัญหา
```
C:\FormulaGen\troubleshoot.log
[2025-05-31 14:30] Python path issue - Fixed by reinstalling Python
[2025-05-31 15:45] Thai encoding issue - Fixed by adding UTF-8 config
[2025-05-31 16:20] Permission issue - Fixed by running as Admin
```

---

## 🔄 การสำรองและการกู้คืน

### การสำรองอัตโนมัติ
สร้าง scheduled task:
```powershell
# สร้าง backup script
$script = @"
$date = Get-Date -Format "yyyyMMdd_HHmm"
Copy-Item "C:\FormulaGen\*" "C:\Backup\FormulaGen_$date\" -Recurse -Force
Get-ChildItem "C:\Backup\FormulaGen_*" | Where-Object {$_.CreationTime -lt (Get-Date).AddDays(-30)} | Remove-Item -Recurse -Force
"@

$script | Out-File "C:\Scripts\backup_formula_generator.ps1"

# สร้าง scheduled task
schtasks /create /tn "FormulaGenerator_Backup" /tr "powershell.exe -File C:\Scripts\backup_formula_generator.ps1" /sc daily /st 02:00
```

### การกู้คืน
```powershell
# กู้คืนจากการสำรอง
$backupDate = "20250531_1400"  # แก้ไขวันที่ตามต้องการ
Copy-Item "C:\Backup\FormulaGen_$backupDate\*" "C:\FormulaGen\" -Recurse -Force

# ทดสอบการทำงาน
cd C:\FormulaGen
python formula_generator.py
```

---

## 🌐 การติดตั้งแบบ Multi-User

### สำหรับเครือข่าย
```powershell
# ติดตั้งบน network share
$networkPath = "\\server\shared\FormulaGen"
New-Item -ItemType Directory -Force -Path $networkPath
Copy-Item "C:\FormulaGen\*" $networkPath -Recurse

# สร้าง shortcut บน desktop ของผู้ใช้
$shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\Formula Generator.lnk")
$shortcut.TargetPath = "cmd.exe"
$shortcut.Arguments = "/c `"cd /d $networkPath && python formula_generator.py`""
$shortcut.Save()
```

### การควบคุมเวอร์ชัน
```powershell
# ตรวจสอบเวอร์ชัน
$version = Select-String -Path "C:\FormulaGen\formula_generator.py" -Pattern "# Version: (.*)"
Write-Host "Current version: $($version.Matches[0].Groups[1].Value)"
```

---

## 📈 การตรวจสอบประสิทธิภาพ

### Metrics ที่ควรติดตาม
1. **การใช้งาน**: จำนวนสูตรที่สร้างต่อวัน
2. **ความถูกต้อง**: อัตราข้อผิดพลาดในสูตร
3. **ประสิทธิภาพ**: เวลาในการสร้างสูตร
4. **ความพึงพอใจ**: feedback จากผู้ใช้

### การติดตั้ง monitoring
```python
# เพิ่มใน formula_generator.py
def log_metrics(action, duration, success=True):
    with open('C:\\FormulaGen\\metrics.log', 'a') as f:
        timestamp = datetime.now().isoformat()
        f.write(f"{timestamp},{action},{duration},{success}\n")
```

---

## 🔮 การพัฒนาในอนาคต

### Roadmap
- [ ] Web Interface (Flask/Django)
- [ ] REST API 
- [ ] Database Integration
- [ ] Multi-language Support
- [ ] Advanced Analytics
- [ ] Mobile App

### การเตรียมการสำหรับการอัปเกรด
```powershell
# สร้าง development environment
New-Item -ItemType Directory -Force -Path "C:\FormulaGen_Dev"
Copy-Item "C:\FormulaGen\*" "C:\FormulaGen_Dev\" -Recurse

# ทดสอบ compatibility
cd C:\FormulaGen_Dev
python -m pytest tests/ # ถ้ามี test files
```

---

## 📞 การสนับสนุนและการติดต่อ

### ช่องทางการสนับสนุน
1. **Documentation**: อ่านคู่มือใน `USER_MANUAL.md`
2. **Quick Help**: ดู `QUICK_START.md`
3. **Troubleshooting**: ตรวจสอบ log files
4. **Admin Help**: ใช้คู่มือนี้

### การรายงานปัญหา
สร้างไฟล์ issue report:
```
Date: [วันที่]
User: [ชื่อผู้ใช้]
Error: [ข้อความ error]
Steps: [ขั้นตอนที่ทำ]
Expected: [ผลลัพธ์ที่คาดหวัง]
Actual: [ผลลัพธ์จริง]
Environment: [OS, Python version, etc.]
```

---

*คู่มือผู้ดูแลระบบ - อัปเดตล่าสุด: พฤษภาคม 2025*
