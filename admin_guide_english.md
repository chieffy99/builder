# 🔧 System Administrator Guide - Anti-Normalization Engine Formula Generator

## 📋 System Overview

### File Structure
```
C:\FormulaGen\
├── formula_generator.py    # Main program
├── start_generator.bat     # Startup file  
├── USER_MANUAL.md         # Detailed user manual
├── QUICK_START.md         # Quick start guide
├── ADMIN_GUIDE.md         # This guide
└── test.bat              # Test file
```

### System Requirements
- **OS**: Windows 10/11
- **Python**: 3.7+ 
- **Memory**: 512MB RAM
- **Storage**: 10MB free space
- **Dependencies**: None (uses built-in modules)

---

## ⚙️ Installation and Configuration

### Fresh Installation
```powershell
# 1. Create folder
New-Item -ItemType Directory -Force -Path "C:\FormulaGen"

# 2. Download files
# (Place formula_generator.py in folder)

# 3. Test functionality
cd C:\FormulaGen
python formula_generator.py
```

### Updates
```powershell
# Backup old files
Copy-Item "C:\FormulaGen\formula_generator.py" "C:\FormulaGen\formula_generator.py.backup"

# Update with new files
# (Replace old file with new file)

# Test
python formula_generator.py
```

---

## 🎛️ Customization and Configuration

### Adding New Entities
Edit in `formula_generator.py`:
```python
ENTITY_MAPPING = {
    "customer": "CU", "ลูกค้า": "CU", "1": "CU",
    "supplier": "SU", "ผู้จำหน่าย": "SU", "2": "SU", 
    "shop": "SH", "ร้าน": "SH", "3": "SH",
    "market": "MK", "ตลาด": "MK", "4": "MK",
    "stock": "SK", "คลัง": "SK", "5": "SK",
    # Add new
    "partner": "PT", "พาร์ทเนอร์": "PT", "6": "PT",
    "branch": "BR", "สาขา": "BR", "7": "BR"
}
```

### Adding New Actions
```python
ACTION_MAPPING = {
    "sell": "SA", "ขาย": "SA", "1": "SA",
    "buy": "BY", "ซื้อ": "BY", "2": "BY",
    "order": "PO", "สั่ง": "PO", "3": "PO", 
    "pick": "PK", "เก็บ": "PK", "4": "PK",
    # Add new
    "exchange": "EX", "แลกเปลี่ยน": "EX", "5": "EX",
    "return": "RT", "คืน": "RT", "6": "RT"
}
```

### Adding New Payment Status
```python
STATUS_TYPE_MAPPING = {
    "cash": "0", "เงินสด": "0", "1": "0",
    "credit": "1", "เชื่อ": "1", "2": "1",
    # Add new
    "installment": "2", "ผ่อน": "2", "3": "2"
}
```

### Adding New Data Types
```python
VALUE_TYPE_MAPPING = {
    "money": "A", "เงิน": "A", "1": "A",
    "quantity": "B", "จำนวน": "B", "2": "B", 
    "price": "C", "ราคา": "C", "3": "C",
    # Add new
    "discount": "D", "ส่วนลด": "D", "4": "D",
    "tax": "E", "ภาษี": "E", "5": "E"
}
```

---

## 🛡️ Security Management

### Data Backup
```powershell
# Create daily backup
$date = Get-Date -Format "yyyyMMdd"
Copy-Item "C:\FormulaGen\*" "C:\Backup\FormulaGen_$date\" -Recurse
```

### Access Control
```powershell
# Restrict folder permissions (Admins only)
icacls "C:\FormulaGen" /grant Administrators:F /inheritance:r
icacls "C:\FormulaGen" /grant "Domain Users":R
```

### Change Detection
```powershell
# Check file hash
Get-FileHash "C:\FormulaGen\formula_generator.py" -Algorithm SHA256
```

---

## 📊 Monitoring and Auditing

### Usage Tracking
Add logging system to `formula_generator.py`:
```python
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    filename='C:\\FormulaGen\\usage.log',
    level=logging.INFO,
    format='%(asctime)s - %(message)s'
)

# In generate_formula() function
def generate_formula():
    logging.info(f"Formula generated: Entity={entity}, Action={action}")
    # ... existing code ...
```

### Performance Monitoring
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

## 🚨 Troubleshooting

### Common Issues

#### 1. Python Not Found
```powershell
# Check Python installation
python --version
py --version

# Reinstall Python
# Download from python.org
```

#### 2. Encoding Error (Thai characters display incorrectly)
```python
# Add to formula_generator.py
import sys
sys.stdout.reconfigure(encoding='utf-8')
```

#### 3. Permission Denied
```powershell
# Run with Administrator privileges
Start-Process powershell -Verb runAs
cd C:\FormulaGen
python formula_generator.py
```

### Troubleshooting Log
```
C:\FormulaGen\troubleshoot.log
[2025-05-31 14:30] Python path issue - Fixed by reinstalling Python
[2025-05-31 15:45] Thai encoding issue - Fixed by adding UTF-8 config
[2025-05-31 16:20] Permission issue - Fixed by running as Admin
```

---

## 🔄 Backup and Recovery

### Automated Backup
Create scheduled task:
```powershell
# Create backup script
$script = @"
$date = Get-Date -Format "yyyyMMdd_HHmm"
Copy-Item "C:\FormulaGen\*" "C:\Backup\FormulaGen_$date\" -Recurse -Force
Get-ChildItem "C:\Backup\FormulaGen_*" | Where-Object {$_.CreationTime -lt (Get-Date).AddDays(-30)} | Remove-Item -Recurse -Force
"@

$script | Out-File "C:\Scripts\backup_formula_generator.ps1"

# Create scheduled task
schtasks /create /tn "FormulaGenerator_Backup" /tr "powershell.exe -File C:\Scripts\backup_formula_generator.ps1" /sc daily /st 02:00
```

### Recovery
```powershell
# Restore from backup
$backupDate = "20250531_1400"  # Modify date as needed
Copy-Item "C:\Backup\FormulaGen_$backupDate\*" "C:\FormulaGen\" -Recurse -Force

# Test functionality
cd C:\FormulaGen
python formula_generator.py
```

---

## 🌐 Multi-User Installation

### Network Installation
```powershell
# Install on network share
$networkPath = "\\server\shared\FormulaGen"
New-Item -ItemType Directory -Force -Path $networkPath
Copy-Item "C:\FormulaGen\*" $networkPath -Recurse

# Create desktop shortcut for users
$shortcut = $WshShell.CreateShortcut("$env:USERPROFILE\Desktop\Formula Generator.lnk")
$shortcut.TargetPath = "cmd.exe"
$shortcut.Arguments = "/c `"cd /d $networkPath && python formula_generator.py`""
$shortcut.Save()
```

### Version Control
```powershell
# Check version
$version = Select-String -Path "C:\FormulaGen\formula_generator.py" -Pattern "# Version: (.*)"
Write-Host "Current version: $($version.Matches[0].Groups[1].Value)"
```

---

## 📈 Performance Monitoring

### Metrics to Track
1. **Usage**: Number of formulas generated per day
2. **Accuracy**: Error rate in formulas
3. **Performance**: Formula generation time
4. **Satisfaction**: User feedback

### Monitoring Setup
```python
# Add to formula_generator.py
def log_metrics(action, duration, success=True):
    with open('C:\\FormulaGen\\metrics.log', 'a') as f:
        timestamp = datetime.now().isoformat()
        f.write(f"{timestamp},{action},{duration},{success}\n")
```

---

## 🔮 Future Development

### Roadmap
- [ ] Web Interface (Flask/Django)
- [ ] REST API 
- [ ] Database Integration
- [ ] Multi-language Support
- [ ] Advanced Analytics
- [ ] Mobile App

### Preparing for Upgrades
```powershell
# Create development environment
New-Item -ItemType Directory -Force -Path "C:\FormulaGen_Dev"
Copy-Item "C:\FormulaGen\*" "C:\FormulaGen_Dev\" -Recurse

# Test compatibility
cd C:\FormulaGen_Dev
python -m pytest tests/ # if test files exist
```

---

## 📞 Support and Contact

### Support Channels
1. **Documentation**: Read manual in `USER_MANUAL.md`
2. **Quick Help**: See `QUICK_START.md`
3. **Troubleshooting**: Check log files
4. **Admin Help**: Use this guide

### Issue Reporting
Create issue report file:
```
Date: [Date]
User: [Username]
Error: [Error message]
Steps: [Steps taken]
Expected: [Expected result]
Actual: [Actual result]
Environment: [OS, Python version, etc.]
```

---

*System Administrator Guide - Last Updated: May 2025*