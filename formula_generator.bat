@echo off
chcp 65001 >nul
title Anti-Normalization Engine - Formula Generator

:MAIN_MENU
cls
echo ================================================================
echo   Anti-Normalization Engine - Formula Generator
echo   ระบบสร้างสูตร SUMIFS ด้วย Behavior-Based Analysis  
echo ================================================================
echo.
echo 📋 เมนูหลัก:
echo 1. สร้างสูตรใหม่ (Generate New Formula)
echo 2. ดูตัวอย่างสูตร (View Examples)  
echo 3. ดูตารางอ้างอิงรหัส (View Reference)
echo 4. ออกจากโปรแกรม (Exit)
echo.
set /p choice="เลือกเมนู (1-4): "

if "%choice%"=="1" goto GENERATE_FORMULA
if "%choice%"=="2" goto SHOW_EXAMPLES
if "%choice%"=="3" goto SHOW_REFERENCE
if "%choice%"=="4" goto EXIT
echo กรุณาเลือกเมนู 1-4
pause
goto MAIN_MENU

:GENERATE_FORMULA
cls
echo ================================================================
echo   สร้างสูตรใหม่ - Behavior-Based Analysis
echo ================================================================
echo.
echo ข้อมูลนี้เกี่ยวกับใครครับ?
echo 1. ลูกค้า (CU)
echo 2. ผู้จำหน่าย (SU)  
echo 3. ร้าน (SH)
echo 4. ตลาด (MK)
echo 5. คลัง (SK)
echo.
set /p entity_choice="เลือก (1-5): "

echo.
echo พวกเขาทำอะไรครับ?
echo 1. ขาย (SA)
echo 2. ซื้อ (BY)
echo 3. สั่ง (PO) 
echo 4. เก็บ (PK)
echo.
set /p action_choice="เลือก (1-4): "

echo.
echo การชำระเงินเป็นแบบไหนครับ?
echo 1. เงินสด (0)
echo 2. เชื่อ (1)
echo.
set /p status_choice="เลือก (1-2): "

echo.
echo ข้อมูลที่ต้องการรวมเป็นประเภทไหนครับ?
echo 1. เงิน (A)
echo 2. จำนวน (B)
echo 3. ราคา (C)
echo.
set /p value_choice="เลือก (1-3): "

echo.
set /p target_column="คอลัมน์ที่ต้องการรวมข้อมูล (เช่น G:G หรือ slot7): "
if "%target_column%"=="" set target_column=G:G

rem Map choices to codes
if "%entity_choice%"=="1" set entity_code=CU
if "%entity_choice%"=="2" set entity_code=SU
if "%entity_choice%"=="3" set entity_code=SH
if "%entity_choice%"=="4" set entity_code=MK
if "%entity_choice%"=="5" set entity_code=SK

if "%action_choice%"=="1" set action_code=SA
if "%action_choice%"=="2" set action_code=BY
if "%action_choice%"=="3" set action_code=PO
if "%action_choice%"=="4" set action_code=PK

if "%status_choice%"=="1" set status_code=0
if "%status_choice%"=="2" set status_code=1

if "%value_choice%"=="1" set value_code=A
if "%value_choice%"=="2" set value_code=B
if "%value_choice%"=="3" set value_code=C

cls
echo ================================================================
echo   ✅ สูตรที่สร้างเสร็จแล้ว
echo ================================================================
echo.
echo =SUMIFS(%target_column%,ID1,"%entity_code%",ID2,"%action_code%",StatN,"%status_code%",StatC,"%value_code%")
echo.
echo ================================================================
echo.
echo การอธิบาย:
echo - เอนทิตี: %entity_code%
echo - การกระทำ: %action_code%  
echo - การชำระเงิน: %status_code%
echo - ประเภทข้อมูล: %value_code%
echo - คอลัมน์เป้าหมาย: %target_column%
echo.
pause
goto MAIN_MENU

:SHOW_EXAMPLES
cls
echo ================================================================
echo   ตัวอย่างสูตรที่ใช้บ่อย
echo ================================================================
echo.
echo 1. ลูกค้าที่ซื้อข้าวจากเรา (เงินสด, เงินที่ได้)
echo    =SUMIFS(G:G,ID1,"CU",ID2,"SA",StatN,"0",StatC,"A")
echo.
echo 2. ผู้จำหน่ายที่ขายข้าวให้เรา (เชื่อ, จำนวนชิ้น)
echo    =SUMIFS(G:G,ID1,"SU",ID2,"BY",StatN,"1",StatC,"B")
echo.
echo 3. ร้านที่สั่งสินค้าจากเรา (เงินสด, ราคารวม)
echo    =SUMIFS(G:G,ID1,"SH",ID2,"PO",StatN,"0",StatC,"C")
echo.
echo 4. ตลาดที่เก็บสินค้าของเรา (เชื่อ, เงินที่ได้)
echo    =SUMIFS(G:G,ID1,"MK",ID2,"PK",StatN,"1",StatC,"A")
echo.
pause
goto MAIN_MENU

:SHOW_REFERENCE
cls
echo ================================================================
echo   ตารางอ้างอิงรหัส (Reference Mapping)
echo ================================================================
echo.
echo 🏢 เอนทิตี (Entities):
echo   ลูกค้า → CU
echo   ผู้จำหน่าย → SU
echo   ร้าน → SH
echo   ตลาด → MK
echo   คลัง → SK
echo.
echo ⚡ การกระทำ (Actions):
echo   ขาย → SA
echo   ซื้อ → BY
echo   สั่ง → PO
echo   เก็บ → PK
echo.
echo 💰 การชำระเงิน (Payment Status):
echo   เงินสด → StatN:0
echo   เชื่อ → StatN:1
echo.
echo 📊 ประเภทข้อมูล (Value Types):
echo   เงิน → StatC:A
echo   จำนวน → StatC:B
echo   ราคา → StatC:C
echo.
pause
goto MAIN_MENU

:EXIT
cls
echo ขอบคุณที่ใช้งานครับ! 👋
timeout /t 2 >nul
exit
