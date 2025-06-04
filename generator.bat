@echo off
echo ============================================
echo Formula Generator - Behavior Classification  
echo ============================================
echo.

:INPUT
set /p behavior="พิมพ์หน้าที่ของข้อมูล: "
if "%behavior%"=="" goto INPUT

echo.
echo เลือกประเภทข้อมูล:
echo 1. เงินที่ได้/จ่าย
echo 2. จำนวนชิ้น
echo 3. ราคาต่อหน่วย
set /p valuetype="เลือก (1-3): "

echo.
echo เลือกการทำรายการ:
echo 1. เงินสด
echo 2. เชื่อ
set /p transtype="เลือก (1-2): "

echo.
echo ============================================
echo ผลการวิเคราะห์:
echo ============================================

rem Simple mapping logic
set entity=XX
set action=XX

echo %behavior% | findstr /i "ลูกค้า" >nul && set entity=CU
echo %behavior% | findstr /i "ซื้อจากเรา" >nul && set entity=CU
echo %behavior% | findstr /i "ผู้จำหน่าย" >nul && set entity=SU
echo %behavior% | findstr /i "ขายให้เรา" >nul && set entity=SU
echo %behavior% | findstr /i "ร้าน" >nul && set entity=SH
echo %behavior% | findstr /i "ตลาด" >nul && set entity=MK

echo %behavior% | findstr /i "ขาย" >nul && set action=SA
echo %behavior% | findstr /i "ซื้อ" >nul && set action=BY
echo %behavior% | findstr /i "สั่ง" >nul && set action=PO

rem Set status codes
if "%valuetype%"=="1" set statc=A
if "%valuetype%"=="2" set statc=B  
if "%valuetype%"=="3" set statc=C

if "%transtype%"=="1" set statn=0
if "%transtype%"=="2" set statn=1

echo ข้อความ: "%behavior%"
echo Entity: %entity%
echo Action: %action%
echo Field: %entity%%action%
echo StatC: %statc%
echo StatN: %statn%
echo.

echo ============================================
echo สูตรที่ใช้งานได้:
echo ============================================
echo.
echo Basic:
echo =SUMIFS(slot1,ID1,"%entity%",ID2,"%action%"^)
echo =SUMIFS(slot7,ID1,"%entity%",ID2,"%action%"^)
echo.
echo Filtered:
echo =SUMIFS(slot7,ID1,"%entity%",ID2,"%action%",StatN,"%statn%",StatC,"%statc%"^)
echo.
echo Date Range:
echo =SUMIFS(slot7,ID1,"%entity%",ID2,"%action%",Date,"^>="^&TODAY(^)-30^)
echo.
echo Wildcard:
echo =SUMIFS(slot7,ID1,"%entity%*",ID2,"%action%"^)
echo.

echo ============================================
echo พร้อมใช้ - คัดลอกไปใส่ Excel ได้เลย!
echo ============================================
echo.

pause
goto INPUT
