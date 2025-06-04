# -*- coding: utf-8 -*-
"""
Anti-Normalization Engine Formula Generator
ระบบสร้างสูตร SUMIFS สำหรับการวิเคราะห์ข้อมูลด้วย Behavior-Based Classification
"""

import os
import sys

# ระบบแมปพฤติกรรม
ENTITY_MAPPING = {
    "ลูกค้า": "CU", "customer": "CU", "1": "CU",
    "ผู้จำหน่าย": "SU", "supplier": "SU", "2": "SU", 
    "ร้าน": "SH", "shop": "SH", "3": "SH",
    "ตลาด": "MK", "market": "MK", "4": "MK",
    "คลัง": "SK", "stock": "SK", "5": "SK"
}

ACTION_MAPPING = {
    "ขาย": "SA", "sell": "SA", "1": "SA",
    "ซื้อ": "BY", "buy": "BY", "2": "BY",
    "สั่ง": "PO", "order": "PO", "3": "PO", 
    "เก็บ": "PK", "pick": "PK", "4": "PK"
}

STATUS_TYPE_MAPPING = {
    "เงินสด": "0", "cash": "0", "1": "0",
    "เชื่อ": "1", "credit": "1", "2": "1"
}

VALUE_TYPE_MAPPING = {
    "เงิน": "A", "money": "A", "1": "A",
    "จำนวน": "B", "quantity": "B", "2": "B", 
    "ราคา": "C", "price": "C", "3": "C"
}

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def show_banner():
    print("=" * 60)
    print("  Anti-Normalization Engine - Formula Generator")
    print("  ระบบสร้างสูตร SUMIFS ด้วย Behavior-Based Analysis")
    print("=" * 60)
    print()

def show_options(mapping, title):
    print(f"\n{title}:")
    for i, (thai, code) in enumerate(mapping.items(), 1):
        if i <= len(mapping) // 2:  # Show first half with Thai names
            print(f"  {i}. {thai} ({code})")

def get_user_choice(mapping, prompt, category):
    while True:
        print(f"\n{prompt}")
        show_options(mapping, f"ตัวเลือก{category}")
        choice = input("\nกรุณาเลือก (หมายเลข/ภาษาไทย/ภาษาอังกฤษ): ").strip().lower()
        
        # Check if it's a direct match
        for key, value in mapping.items():
            if choice == key.lower() or choice == value.lower():
                return value
        
        print("ไม่พบตัวเลือกที่ต้องการ กรุณาลองใหม่")

def generate_formula():
    clear_screen()
    show_banner()
    
    print("ระบบนี้จะถามคำถามเพื่อทำความเข้าใจพฤติกรรมของข้อมูลครับ")
    print("จากนั้นจะสร้างสูตร SUMIFS ให้อัตโนมัติ")
    
    # Get behavior information
    entity = get_user_choice(ENTITY_MAPPING, 
                           "ข้อมูลนี้เกี่ยวกับใครครับ?", "เอนทิตี")
    
    action = get_user_choice(ACTION_MAPPING,
                           "พวกเขาทำอะไรครับ?", "การกระทำ")
    
    status_type = get_user_choice(STATUS_TYPE_MAPPING,
                                "การชำระเงินเป็นแบบไหนครับ?", "สถานะการชำระ")
    
    value_type = get_user_choice(VALUE_TYPE_MAPPING,
                               "ข้อมูลที่ต้องการรวมเป็นประเภทไหนครับ?", "ประเภทข้อมูล")
    
    # Get target column
    target_column = input("\nคอลัมน์ที่ต้องการรวมข้อมูล (เช่น G:G หรือ slot7): ").strip()
    if not target_column:
        target_column = "G:G"
    
    # Generate formula
    formula = f'=SUMIFS({target_column},ID1,"{entity}",ID2,"{action}",StatN,"{status_type}",StatC,"{value_type}")'
    
    # Show result
    clear_screen()
    show_banner()
    print("✅ สูตรที่สร้างเสร็จแล้ว:")
    print("=" * 50)
    print(formula)
    print("=" * 50)
    
    print(f"\nการอธิบาย:")
    print(f"- เอนทิตี: {entity}")
    print(f"- การกระทำ: {action}")
    print(f"- การชำระเงิน: {'เงินสด' if status_type == '0' else 'เชื่อ'}")
    print(f"- ประเภทข้อมูล: {['เงิน', 'จำนวน', 'ราคา'][['A', 'B', 'C'].index(value_type)]}")
    print(f"- คอลัมน์เป้าหมาย: {target_column}")
    
    return formula

def show_examples():
    clear_screen()
    show_banner()
    print("ตัวอย่างสูตรที่ใช้บ่อย:")
    print("=" * 50)
    
    examples = [
        ("ลูกค้าที่ซื้อข้าวจากเรา (เงินสด, เงินที่ได้)", '=SUMIFS(G:G,ID1,"CU",ID2,"SA",StatN,"0",StatC,"A")'),
        ("ผู้จำหน่ายที่ขายข้าวให้เรา (เชื่อ, จำนวนชิ้น)", '=SUMIFS(G:G,ID1,"SU",ID2,"BY",StatN,"1",StatC,"B")'),
        ("ร้านที่สั่งสินค้าจากเรา (เงินสด, ราคารวม)", '=SUMIFS(G:G,ID1,"SH",ID2,"PO",StatN,"0",StatC,"C")'),
        ("ตลาดที่เก็บสินค้าของเรา (เชื่อ, เงินที่ได้)", '=SUMIFS(G:G,ID1,"MK",ID2,"PK",StatN,"1",StatC,"A")')
    ]
    
    for i, (description, formula) in enumerate(examples, 1):
        print(f"{i}. {description}")
        print(f"   {formula}")
        print()

def show_mapping_reference():
    clear_screen()
    show_banner()
    print("ตารางอ้างอิงรหัส (Reference Mapping):")
    print("=" * 50)
    
    print("\n🏢 เอนทิตี (Entities):")
    for thai, code in ENTITY_MAPPING.items():
        if len(thai) > 3:  # Show only Thai names
            print(f"  {thai} → {code}")
    
    print("\n⚡ การกระทำ (Actions):")
    for thai, code in ACTION_MAPPING.items():
        if len(thai) > 2:  # Show only Thai names
            print(f"  {thai} → {code}")
    
    print("\n💰 การชำระเงิน (Payment Status):")
    for thai, code in STATUS_TYPE_MAPPING.items():
        if len(thai) > 3:  # Show only Thai names
            print(f"  {thai} → StatN:{code}")
    
    print("\n📊 ประเภทข้อมูล (Value Types):")
    for thai, code in VALUE_TYPE_MAPPING.items():
        if len(thai) > 3:  # Show only Thai names
            print(f"  {thai} → StatC:{code}")

def main_menu():
    while True:
        clear_screen()
        show_banner()
        print("📋 เมนูหลัก:")
        print("1. สร้างสูตรใหม่ (Generate New Formula)")
        print("2. ดูตัวอย่างสูตร (View Examples)")
        print("3. ดูตารางอ้างอิงรหัส (View Reference)")
        print("4. ออกจากโปรแกรม (Exit)")
        
        choice = input("\nเลือกเมนู (1-4): ").strip()
        
        if choice == "1":
            formula = generate_formula()
            input("\nกด Enter เพื่อกลับสู่เมนูหลัก...")
            
        elif choice == "2":
            show_examples()
            input("\nกด Enter เพื่อกลับสู่เมนูหลัก...")
            
        elif choice == "3":
            show_mapping_reference()
            input("\nกด Enter เพื่อกลับสู่เมนูหลัก...")
            
        elif choice == "4":
            print("\nขอบคุณที่ใช้งานครับ! 👋")
            break
            
        else:
            print("กรุณาเลือกเมนู 1-4")
            input("กด Enter เพื่อลองใหม่...")

if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print("\n\nโปรแกรมถูกยกเลิก")
    except Exception as e:
        print(f"\nเกิดข้อผิดพลาด: {e}")
        input("กด Enter เพื่อออก...")
