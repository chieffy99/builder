# 📋 เอกสารข้อกำหนดการออกแบบการ์ด
**Dashboard Cards Design Specification**

---

## 🎯 วัตถุประสงค์

สร้างการ์ดที่สามารถใช้เป็น **box หน้าเว็บ** และรองรับ**การผสมการ์ด** ในชุดเดียวกัน โดยมีโครงสร้างที่ยืดหยุ่นและระบบควบคุมที่สมบูรณ์

---

## 🏗️ โครงสร้างการ์ด (Card Structure)

### **1. ส่วนประกอบหลัก**
```
┌─────────────────────────────────────┐
│  📌 Card Header (ความสูงคงที่)      │
├─────────────────────────────────────┤
│                                     │
│      📊 Card Body (ยืดหยุ่น)       │
│                                     │
├─────────────────────────────────────┤
│  ⚙️ Card Tools (ฝังในตัว)           │
└─────────────────────────────────────┘
```

### **2. Card Header (ส่วนหัว)**
- **ความสูงคงที่:** 50px (ไม่เปลี่ยนตามการปรับขนาด)
- **องค์ประกอบ:**
  - ชื่อการ์ด (Card Title)
  - ปุ่มควบคุม (Control Buttons)
  - สถานะการล็อค (Lock Status)

### **3. Card Body (เนื้อหา)**
- **ขนาดยืดหยุ่น:** ปรับตามการขยาย/หด
- **เนื้อหา:** กราฟ, ตาราง, ข้อความ, หรือเนื้อหาจากภายนอก
- **สัดส่วน:** ภายในไม่ใหญ่กว่าภายนอก

### **4. Card Tools (เครื่องมือ)**
- **ตำแหน่ง:** ฝังในส่วนหัว + Context Menu
- **ประเภท:** ปุ่มหลัก, ปุ่มรอง, เมนูซ่อน

---

## 🎨 การออกแบบรูปทรงและสีสรร

### **1. รูปทรงพื้นฐาน**
```css
.dashboard-card {
    /* ขนาดพื้นฐาน */
    min-width: 300px;
    min-height: 200px;
    max-width: 800px;
    max-height: 600px;
    
    /* รูปทรง */
    border-radius: 12px;
    border: 1px solid var(--border-light);
    
    /* เงา */
    box-shadow: var(--card-shadow);
    backdrop-filter: blur(10px);
}
```

### **2. สีสรรและธีม**
- **การ์ดปกติ:** พื้นหลังโปร่งแสง + ขอบอ่อน
- **การ์ดที่เลือก:** ขอบเน้นสี + เงาเพิ่ม
- **การ์ดผสม:** ขอบพิเศษ + ไล่สีเบาๆ
- **การ์ดล็อค:** ขอบจุด + ไอคอนล็อค

### **3. ส่วนหัวการ์ด (Header Design)**
```css
.card-header {
    height: 50px; /* คงที่ */
    padding: 10px 15px;
    background: linear-gradient(45deg, primary-color, secondary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    font-size: 1rem;
    font-weight: 500;
    max-width: 60%; /* ป้องกันชื่อยาวเกินไป */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-tools {
    display: flex;
    gap: 8px;
}

.card-tool {
    width: 24px; /* คงที่ */
    height: 24px; /* คงที่ */
    border-radius: 4px;
    /* สไตล์อื่นๆ */
}
```

---

## 🔧 ระบบการปรับขนาด (Responsive Scaling)

### **1. หลักการปรับขนาด**
- **ภายนอก ↔ ภายใน:** สัดส่วนใกล้เคียงกัน
- **ป้องกัน:** ภายในใหญ่กว่าภายนอก (ยากต่อการอ่าน)
- **วิธีการ:** CSS Grid + Flexbox

### **2. การจัดการขนาด**
```css
.card-body {
    flex: 1; /* ขยายเต็มพื้นที่ที่เหลือ */
    padding: 15px;
    overflow: auto; /* scroll ถ้าเนื้อหาเกิน */
    
    /* กริดยืดหยุ่น */
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 10px;
}

/* ขนาดขั้นต่ำ-สูงสุด */
.dashboard-card {
    min-width: 300px;
    min-height: 200px;
    max-width: min(800px, 80vw);
    max-height: min(600px, 80vh);
}
```

### **3. การปรับขนาดแบบ Aspect Ratio**
```css
.card-maintain-ratio {
    aspect-ratio: 16/9; /* หรืออัตราส่วนที่ต้องการ */
}

.card-content {
    /* เนื้อหาปรับตามขนาดการ์ด */
    width: 100%;
    height: 100%;
    object-fit: contain;
}
```

---

## 🖱️ ระบบเครื่องมือและการควบคุม

### **1. เครื่องมือฝังตัว (Embedded Tools)**

#### **ปุ่มหลัก (Primary Buttons) - แสดงในส่วนหัว**
```html
<div class="card-tools-primary">
    <button class="card-tool" data-action="lock" title="ล็อค/ปลดล็อค">🔒</button>
    <button class="card-tool" data-action="settings" title="ตั้งค่า">⚙️</button>
    <button class="card-tool" data-action="close" title="ปิด">×</button>
</div>
```

#### **ปุ่มรอง (Secondary Buttons) - Context Menu**
```html
<div class="context-menu">
    <div class="context-menu-item" data-action="edit">แก้ไขการ์ด</div>
    <div class="context-menu-item" data-action="mix">ผสมการ์ด</div>
    <div class="context-menu-item" data-action="duplicate">คัดลอก</div>
    <div class="context-menu-item" data-action="export">ส่งออก</div>
    <div class="context-menu-item" data-action="delete">ลบ</div>
</div>
```

### **2. ระบบล็อคการ์ด (Card Locking System)**

#### **สถานะการล็อค**
- **ปกติ:** เลื่อนได้, ปรับขนาดได้, แก้ไขได้
- **ล็อค:** ไม่สามารถเลื่อน, ปรับขนาด, หรือแก้ไขได้

#### **การแสดงสถานะ**
```css
/* การ์ดล็อค */
.card-locked {
    border: 2px dashed #ff6b6b;
    cursor: not-allowed;
    position: relative;
}

.card-locked::before {
    content: "🔒";
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(255, 107, 107, 0.9);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 12px;
    z-index: 10;
}

/* ปิดการโต้ตอบ */
.card-locked .card-header {
    pointer-events: none;
}

.card-locked .resize-handle {
    display: none;
}
```

### **3. ปุ่มปรับขนาด (Resize Handle)**
```css
.resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
    background: linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.3) 50%);
    border-bottom-right-radius: 6px;
}

.resize-handle:hover {
    background: linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.5) 50%);
}
```

---

## 💬 ระบบ Tooltip และการแสดงข้อมูล

### **1. หลักการ Tooltip**
- **ขนาด:** auto-sizing ตามเนื้อหา (`fit-content`)
- **Padding:** 3-5% ของขนาดตัวอักษร
- **การปรากฏ:** หน่วงเวลา 400ms หลังเมาส์หยุด
- **การหาย:** ทันทีที่เมาส์เขยับ

### **2. การออกแบบ Tooltip**
```css
.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: calc(var(--font-size) * 0.05); /* 5% ของขนาดตัวอักษร */
    border-radius: 6px;
    font-size: 0.9rem;
    white-space: nowrap;
    z-index: 9999;
    
    /* การแสดง/ซ่อน */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.2s ease;
}

.tooltip.show {
    opacity: 1;
    visibility: visible;
}
```

### **3. JavaScript สำหรับ Tooltip**
```javascript
class TooltipManager {
    constructor() {
        this.tooltipTimer = null;
        this.currentTooltip = null;
    }
    
    showTooltip(element, text, delay = 400) {
        this.hideTooltip(); // ซ่อน tooltip เดิม
        
        element.addEventListener('mouseenter', (e) => {
            this.tooltipTimer = setTimeout(() => {
                this.createTooltip(e.target, text, e.clientX, e.clientY);
            }, delay);
        });
        
        element.addEventListener('mousemove', () => {
            this.hideTooltip();
        });
        
        element.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
    }
    
    createTooltip(element, text, x, y) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        // คำนวณตำแหน่ง
        const rect = tooltip.getBoundingClientRect();
        const posX = Math.min(x + 10, window.innerWidth - rect.width - 10);
        const posY = Math.max(y - rect.height - 10, 10);
        
        tooltip.style.left = posX + 'px';
        tooltip.style.top = posY + 'px';
        tooltip.classList.add('show');
        
        this.currentTooltip = tooltip;
    }
    
    hideTooltip() {
        clearTimeout(this.tooltipTimer);
        
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }
}
```

---

## 📊 การนำเข้าข้อมูลจากภายนอก

### **1. ระบบ Content Import**
- **แหล่งข้อมูล:** HTML จากเว็บอื่น, JSON, API
- **การประมวลผล:** แยกเนื้อหา + สคริปต์จำเป็น
- **การป้องกัน:** Sanitize + Prefix ID

### **2. Content Adapter Pattern**
```javascript
class ContentAdapter {
    constructor(cardId) {
        this.cardId = cardId;
        this.prefix = `card-${cardId}-`;
    }
    
    importHTML(htmlContent) {
        // แปลง ID ให้มี prefix
        const processedHTML = htmlContent.replace(
            /id="([^"]+)"/g, 
            `id="${this.prefix}$1"`
        );
        
        // แยกเฉพาะเนื้อหาสำคัญ
        const parser = new DOMParser();
        const doc = parser.parseFromString(processedHTML, 'text/html');
        
        // เก็บเฉพาะ content และ script ที่จำเป็น
        const essentials = doc.querySelectorAll('.content, .data, script[data-essential="true"]');
        
        return Array.from(essentials).map(el => el.outerHTML).join('');
    }
    
    searchAndImport(keyword) {
        // ค้นหาเนื้อหาตามคำค้น
        return fetch(`/api/search?q=${keyword}`)
            .then(response => response.json())
            .then(results => {
                return results.map(item => ({
                    title: item.title,
                    content: this.importHTML(item.content),
                    metadata: item.metadata
                }));
            });
    }
}
```

### **3. การจัดการธีมและสไตล์**
```css
/* ธีมของระบบ - ใช้กับเนื้อหาที่นำเข้า */
.card-imported-content {
    /* รีเซ็ตสไตล์ */
    font-family: inherit;
    color: inherit;
    
    /* ปรับให้เข้ากับธีมการ์ด */
    background: transparent;
    border: none;
}

/* ปิดสไตล์ที่ขัดแย้ง */
.card-imported-content * {
    max-width: 100% !important;
    overflow-wrap: break-word;
}

/* ซ่อนองค์ประกอบที่ไม่ต้องการ */
.card-imported-content .menu,
.card-imported-content .navigation,
.card-imported-content .footer {
    display: none !important;
}
```

---

## 🔄 ความเข้ากันได้กับระบบผสมการ์ด

### **1. Data Attributes สำหรับการผสม**
```html
<div class="dashboard-card" 
     data-card-id="card-001"
     data-card-type="chart"
     data-card-value="100"
     data-mixable="true">
    <!-- เนื้อหาการ์ด -->
</div>
```

### **2. โครงสร้างรองรับการผสม**
```css
/* การ์ดที่สามารถผสมได้ */
.card-mixable {
    border: 1px solid rgba(107, 138, 253, 0.3);
}

.card-mixable:hover {
    border-color: var(--accent-primary);
    box-shadow: 0 0 15px rgba(107, 138, 253, 0.3);
}

/* การ์ดที่ถูกเลือกเพื่อผสม */
.card-selected-for-mix {
    border: 2px solid var(--accent-primary);
    box-shadow: 0 0 20px rgba(107, 138, 253, 0.5);
    transform: scale(1.02);
}

/* การ์ดผสมแล้ว */
.card-mixed {
    border: 2px solid #4caf50;
    background: linear-gradient(135deg, var(--bg-card), rgba(76, 175, 80, 0.1));
}
```

---

## 🎮 Mouse Control Integration

### **1. Data Attributes สำหรับ Mouse Control**
```html
<div class="dashboard-card" 
     data-mouse-role="draggable-card"
     data-mouse-context="card-menu"
     data-mouse-hover="card-tooltip">
    
    <div class="card-header" data-mouse-role="drag-handle">
        <h3 class="card-title">ชื่อการ์ด</h3>
        <div class="card-tools">
            <button data-mouse-role="lock-toggle">🔒</button>
            <button data-mouse-role="card-close">×</button>
        </div>
    </div>
    
    <div class="card-body" data-mouse-role="content-area">
        <!-- เนื้อหา -->
    </div>
    
    <div class="resize-handle" data-mouse-role="resize-handle"></div>
</div>
```

### **2. Mouse Behavior Definition**
```javascript
const cardMouseBehaviors = {
    'draggable-card': {
        cursor: 'move',
        actions: {
            mousedown: 'startDrag',
            mousemove: 'continueDrag',
            mouseup: 'endDrag'
        }
    },
    
    'lock-toggle': {
        cursor: 'pointer',
        actions: {
            click: 'toggleLock'
        }
    },
    
    'resize-handle': {
        cursor: 'nwse-resize',
        actions: {
            mousedown: 'startResize',
            mousemove: 'continueResize',
            mouseup: 'endResize'
        }
    }
};
```

---

## 📱 Responsive Design

### **1. การปรับตัวตามหน้าจอ**
```css
/* Desktop */
@media (min-width: 1024px) {
    .dashboard-card {
        min-width: 350px;
        min-height: 250px;
    }
}

/* Tablet */
@media (max-width: 1023px) and (min-width: 768px) {
    .dashboard-card {
        min-width: 300px;
        min-height: 200px;
    }
    
    .card-tools {
        gap: 6px;
    }
    
    .card-tool {
        width: 22px;
        height: 22px;
    }
}

/* Mobile */
@media (max-width: 767px) {
    .dashboard-card {
        min-width: 280px;
        min-height: 180px;
        max-width: calc(100vw - 20px);
    }
    
    .card-header {
        height: 44px;
        padding: 8px 12px;
    }
    
    .card-title {
        font-size: 0.9rem;
    }
    
    .card-tool {
        width: 20px;
        height: 20px;
    }
}
```

---

## 🚀 การนำไปใช้งาน

### **1. HTML Template**
```html
<!-- Base Card Template -->
<div class="dashboard-card" data-card-id="" data-mouse-role="draggable-card">
    <div class="card-header" data-mouse-role="drag-handle">
        <h3 class="card-title"></h3>
        <div class="card-tools">
            <button class="card-tool" data-action="lock" data-mouse-role="lock-toggle">🔒</button>
            <button class="card-tool" data-action="settings">⚙️</button>
            <button class="card-tool" data-action="close" data-mouse-role="card-close">×</button>
        </div>
    </div>
    
    <div class="card-body" data-mouse-role="content-area">
        <!-- Dynamic Content -->
    </div>
    
    <div class="resize-handle" data-mouse-role="resize-handle"></div>
</div>
```

### **2. JavaScript Card Factory**
```javascript
class CardFactory {
    static createCard(options = {}) {
        const {
            id = `card-${Date.now()}`,
            title = 'New Card',
            content = '',
            type = 'default',
            mixable = true,
            locked = false
        } = options;
        
        const card = document.createElement('div');
        card.className = `dashboard-card card-${type}`;
        card.setAttribute('data-card-id', id);
        card.setAttribute('data-card-type', type);
        card.setAttribute('data-mixable', mixable);
        card.setAttribute('data-mouse-role', 'draggable-card');
        
        if (locked) {
            card.classList.add('card-locked');
        }
        
        card.innerHTML = `
            <div class="card-header" data-mouse-role="drag-handle">
                <h3 class="card-title">${title}</h3>
                <div class="card-tools">
                    <button class="card-tool" data-action="lock" data-mouse-role="lock-toggle">
                        ${locked ? '🔓' : '🔒'}
                    </button>
                    <button class="card-tool" data-action="settings">⚙️</button>
                    <button class="card-tool" data-action="close" data-mouse-role="card-close">×</button>
                </div>
            </div>
            <div class="card-body" data-mouse-role="content-area">
                ${content}
            </div>
            <div class="resize-handle" data-mouse-role="resize-handle"></div>
        `;
        
        return card;
    }
}
```

---

## 📋 Checklist การพัฒนา

### **Phase 1: การ์ดพื้นฐาน**
- [ ] สร้างโครงสร้าง HTML Template
- [ ] เขียน CSS สำหรับรูปทรงและธีม
- [ ] ระบบปรับขนาดและ responsive
- [ ] ปุ่มควบคุมพื้นฐาน (ปิด, ตั้งค่า)

### **Phase 2: ระบบล็อคและเครื่องมือ**
- [ ] ระบบล็อค/ปลดล็อคการ์ด
- [ ] Context Menu และเครื่องมือเพิ่มเติม
- [ ] ระบบ Tooltip แบบ smart
- [ ] การจัดการสถานะการ์ด

### **Phase 3: การนำเข้าเนื้อหา**
- [ ] Content Adapter System
- [ ] HTML Sanitization
- [ ] ID Prefixing System
- [ ] Search และ Import API

### **Phase 4: ความเข้ากันได้**
- [ ] Integration กับ Mouse Control
- [ ] Support สำหรับระบบผสมการ์ด
- [ ] Data Attributes และ Metadata
- [ ] Performance Optimization

---

## 💾 ระบบจัดการข้อมูล (Data I/O Management System)

### **1. หลักการจัดการข้อมูล**

#### **Input Data Sources**
- **Static Data:** JSON, CSV, XML ที่อัปโหลดเข้ามา
- **Dynamic Data:** API calls, Real-time streams, Database queries
- **User Input:** ฟอร์มข้อมูล, การแก้ไขโดยตรง
- **External Content:** การนำเข้าจากเว็บไซต์อื่น
- **Mixed Data:** ข้อมูลจากการผสมการ์ด

#### **Output Data Types**
- **Visual Output:** กราฟ, ตาราง, รายงาน
- **Processed Data:** ข้อมูลที่ผ่านการคำนวณ
- **Export Formats:** JSON, CSV, PDF, Image
- **Share Data:** ลิงก์, Embed code, API endpoint

### **2. Card Data Schema**

#### **Base Card Data Structure**
```javascript
const CardDataSchema = {
    // Card Metadata
    id: 'card-001',
    type: 'chart|table|text|mixed',
    title: 'Card Title',
    description: 'Card Description',
    tags: ['tag1', 'tag2'],
    
    // Data Configuration
    dataConfig: {
        source: 'api|file|manual|mixed',
        sourceUrl: 'https://api.example.com/data',
        refreshInterval: 300000, // 5 minutes
        lastUpdated: '2025-01-15T10:30:00Z',
        
        // Data transformation
        transforms: [
            {
                type: 'filter',
                condition: 'value > 100'
            },
            {
                type: 'aggregate',
                method: 'sum',
                groupBy: 'category'
            }
        ]
    },
    
    // Input Data
    inputData: {
        raw: [], // ข้อมูลดิบ
        processed: [], // ข้อมูลที่ผ่านการประมวลผล
        schema: {}, // โครงสร้างข้อมูล
        validation: {} // กฎการตรวจสอบ
    },
    
    // Output Configuration
    outputConfig: {
        format: 'chart|table|text',
        options: {
            chartType: 'line|bar|pie',
            colors: ['#ff0000', '#00ff00'],
            responsive: true
        }
    },
    
    // Sharing & Export
    sharing: {
        isPublic: false,
        shareId: 'unique-share-id',
        permissions: ['view', 'edit', 'export'],
        collaborators: ['user1@email.com']
    },
    
    // Mixed Card Information
    mixInfo: {
        isMixed: false,
        parentCards: [], // การ์ดต้นทาง
        mixFormula: '', // สูตรการผสม
        mixType: 'sum|avg|ratio|custom'
    },
    
    // System Data
    system: {
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:30:00Z',
        version: '1.0.0',
        locked: false
    }
};
```

### **3. ระบบ Input Data Management**

#### **Data Input Types**
```javascript
class DataInputManager {
    constructor(cardId) {
        this.cardId = cardId;
        this.inputSources = new Map();
    }
    
    // การอัปโหลดไฟล์
    async uploadFile(file, options = {}) {
        const {
            format = 'auto', // csv, json, xlsx
            encoding = 'utf-8',
            delimiter = ',',
            hasHeader = true
        } = options;
        
        try {
            const data = await this.parseFile(file, format);
            return this.processInputData(data, {
                source: 'file',
                filename: file.name,
                size: file.size,
                format: format
            });
        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }
    
    // การเชื่อมต่อ API
    async connectAPI(config) {
        const {
            url,
            method = 'GET',
            headers = {},
            auth = null,
            refreshInterval = 300000,
            transform = null
        } = config;
        
        const sourceId = `api-${Date.now()}`;
        
        this.inputSources.set(sourceId, {
            type: 'api',
            config: config,
            lastFetch: null,
            data: null,
            status: 'connected'
        });
        
        // เริ่มต้นการดึงข้อมูล
        return this.fetchAPIData(sourceId);
    }
    
    // การป้อนข้อมูลด้วยมือ
    setupManualInput(schema) {
        return {
            type: 'manual',
            schema: schema,
            data: [],
            addRow: (rowData) => this.addManualRow(rowData),
            editRow: (index, rowData) => this.editManualRow(index, rowData),
            deleteRow: (index) => this.deleteManualRow(index),
            validate: () => this.validateManualData()
        };
    }
    
    // การรับข้อมูลจากการ์ดอื่น
    connectToCard(sourceCardId, dataPath = '') {
        const sourceCard = CardRegistry.get(sourceCardId);
        if (!sourceCard) {
            throw new Error(`Source card ${sourceCardId} not found`);
        }
        
        return {
            type: 'card-link',
            sourceCardId: sourceCardId,
            dataPath: dataPath,
            getData: () => this.getLinkedCardData(sourceCardId, dataPath),
            onSourceUpdate: (callback) => this.subscribeToSourceUpdates(sourceCardId, callback)
        };
    }
}
```

#### **Data Transformation Pipeline**
```javascript
class DataTransformPipeline {
    constructor() {
        this.transforms = [];
    }
    
    // เพิ่มการแปลงข้อมูล
    addTransform(type, config) {
        const transform = {
            id: `transform-${Date.now()}`,
            type: type,
            config: config,
            enabled: true
        };
        
        this.transforms.push(transform);
        return transform.id;
    }
    
    // ประมวลผลข้อมูล
    async process(inputData) {
        let data = [...inputData];
        
        for (const transform of this.transforms.filter(t => t.enabled)) {
            try {
                data = await this.applyTransform(data, transform);
            } catch (error) {
                console.error(`Transform ${transform.type} failed:`, error);
                // ตัดสินใจว่าจะข้ามหรือหยุด
                if (transform.config.required) {
                    throw error;
                }
            }
        }
        
        return data;
    }
    
    // ประเภทการแปลงข้อมูล
    async applyTransform(data, transform) {
        switch (transform.type) {
            case 'filter':
                return this.filterData(data, transform.config);
            
            case 'sort':
                return this.sortData(data, transform.config);
            
            case 'aggregate':
                return this.aggregateData(data, transform.config);
            
            case 'join':
                return this.joinData(data, transform.config);
            
            case 'calculate':
                return this.calculateFields(data, transform.config);
            
            case 'format':
                return this.formatData(data, transform.config);
            
            default:
                throw new Error(`Unknown transform type: ${transform.type}`);
        }
    }
    
    // ตัวอย่างการแปลงข้อมูล
    filterData(data, config) {
        const { field, operator, value } = config;
        
        return data.filter(row => {
            const cellValue = row[field];
            
            switch (operator) {
                case '>': return cellValue > value;
                case '<': return cellValue < value;
                case '=': return cellValue === value;
                case '!=': return cellValue !== value;
                case 'contains': return String(cellValue).includes(value);
                case 'startsWith': return String(cellValue).startsWith(value);
                default: return true;
            }
        });
    }
    
    aggregateData(data, config) {
        const { groupBy, aggregations } = config;
        const grouped = new Map();
        
        // จัดกลุ่มข้อมูล
        data.forEach(row => {
            const groupKey = groupBy.map(field => row[field]).join('|');
            
            if (!grouped.has(groupKey)) {
                grouped.set(groupKey, []);
            }
            grouped.get(groupKey).push(row);
        });
        
        // คำนวณค่า aggregate
        return Array.from(grouped.entries()).map(([groupKey, rows]) => {
            const result = {};
            
            // เก็บค่า groupBy fields
            groupBy.forEach((field, index) => {
                result[field] = groupKey.split('|')[index];
            });
            
            // คำนวณ aggregations
            aggregations.forEach(({ field, method, alias }) => {
                const values = rows.map(row => parseFloat(row[field]) || 0);
                
                switch (method) {
                    case 'sum':
                        result[alias || `${field}_sum`] = values.reduce((a, b) => a + b, 0);
                        break;
                    case 'avg':
                        result[alias || `${field}_avg`] = values.reduce((a, b) => a + b, 0) / values.length;
                        break;
                    case 'min':
                        result[alias || `${field}_min`] = Math.min(...values);
                        break;
                    case 'max':
                        result[alias || `${field}_max`] = Math.max(...values);
                        break;
                    case 'count':
                        result[alias || `${field}_count`] = values.length;
                        break;
                }
            });
            
            return result;
        });
    }
}
```

### **4. ระบบ Output Data Management**

#### **Output Formats & Export**
```javascript
class DataOutputManager {
    constructor(cardId) {
        this.cardId = cardId;
        this.outputFormats = new Map();
    }
    
    // ส่งออกข้อมูลเป็น JSON
    exportJSON(data, options = {}) {
        const {
            pretty = true,
            includeMetadata = false
        } = options;
        
        const exportData = {
            cardId: this.cardId,
            exportedAt: new Date().toISOString(),
            data: data
        };
        
        if (includeMetadata) {
            exportData.metadata = this.getCardMetadata();
        }
        
        return pretty ? 
            JSON.stringify(exportData, null, 2) : 
            JSON.stringify(exportData);
    }
    
    // ส่งออกเป็น CSV
    exportCSV(data, options = {}) {
        const {
            delimiter = ',',
            includeHeaders = true,
            encoding = 'utf-8'
        } = options;
        
        if (!Array.isArray(data) || data.length === 0) {
            return '';
        }
        
        const headers = Object.keys(data[0]);
        let csv = '';
        
        if (includeHeaders) {
            csv += headers.join(delimiter) + '\n';
        }
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                // Escape values ที่มี delimiter หรือ quotes
                if (String(value).includes(delimiter) || String(value).includes('"')) {
                    return `"${String(value).replace(/"/g, '""')}"`;
                }
                return value;
            });
            csv += values.join(delimiter) + '\n';
        });
        
        return csv;
    }
    
    // ส่งออกเป็นรูปภาพ
    async exportImage(format = 'png', options = {}) {
        const {
            width = 800,
            height = 600,
            quality = 0.9,
            backgroundColor = '#ffffff'
        } = options;
        
        const canvas = await this.renderToCanvas(width, height, backgroundColor);
        
        return new Promise((resolve) => {
            canvas.toBlob(resolve, `image/${format}`, quality);
        });
    }
    
    // สร้าง API endpoint สำหรับข้อมูล
    createAPIEndpoint(config = {}) {
        const {
            format = 'json',
            refreshRate = 300000,
            authentication = false,
            cors = true
        } = config;
        
        const endpointId = `endpoint-${this.cardId}-${Date.now()}`;
        
        const endpoint = {
            id: endpointId,
            url: `/api/cards/${this.cardId}/data`,
            method: 'GET',
            format: format,
            config: config,
            
            // ข้อมูลสถิติ
            stats: {
                accessCount: 0,
                lastAccessed: null,
                avgResponseTime: 0
            }
        };
        
        // ลงทะเบียน endpoint
        APIEndpointRegistry.register(endpointId, endpoint);
        
        return endpoint;
    }
}
```

### **5. ระบบ Sharing และ Collaboration**

#### **Card Sharing System**
```javascript
class CardSharingManager {
    constructor(cardId) {
        this.cardId = cardId;
    }
    
    // สร้างลิงก์แชร์
    createShareLink(options = {}) {
        const {
            permissions = ['view'],
            expiry = null,
            password = null,
            allowDownload = true
        } = options;
        
        const shareId = this.generateShareId();
        
        const shareConfig = {
            shareId: shareId,
            cardId: this.cardId,
            permissions: permissions,
            expiry: expiry,
            password: password,
            allowDownload: allowDownload,
            createdAt: new Date().toISOString(),
            accessCount: 0,
            lastAccessed: null
        };
        
        // บันทึกการตั้งค่าการแชร์
        ShareRegistry.set(shareId, shareConfig);
        
        return {
            shareId: shareId,
            url: `${window.location.origin}/shared/${shareId}`,
            qrCode: this.generateQRCode(shareId),
            embedCode: this.generateEmbedCode(shareId)
        };
    }
    
    // สร้าง embed code
    generateEmbedCode(shareId, options = {}) {
        const {
            width = 600,
            height = 400,
            responsive = true,
            theme = 'light'
        } = options;
        
        const embedUrl = `${window.location.origin}/embed/${shareId}`;
        
        if (responsive) {
            return `<div style="position: relative; width: 100%; height: 0; padding-bottom: ${(height/width*100).toFixed(2)}%;">
    <iframe src="${embedUrl}?theme=${theme}" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
            allowfullscreen></iframe>
</div>`;
        } else {
            return `<iframe src="${embedUrl}?theme=${theme}" 
        width="${width}" 
        height="${height}" 
        style="border: none;"
        allowfullscreen></iframe>`;
        }
    }
    
    // จัดการสิทธิ์การเข้าถึง
    setPermissions(shareId, userId, permissions) {
        const share = ShareRegistry.get(shareId);
        if (!share) {
            throw new Error('Share not found');
        }
        
        if (!share.collaborators) {
            share.collaborators = new Map();
        }
        
        share.collaborators.set(userId, {
            permissions: permissions,
            addedAt: new Date().toISOString(),
            addedBy: this.getCurrentUserId()
        });
        
        ShareRegistry.set(shareId, share);
    }
}
```

### **6. ระบบ Mixed Cards Data Management**

#### **Data Mixing Strategies**
```javascript
class MixedCardDataManager {
    constructor() {
        this.mixingStrategies = new Map();
        this.initializeStrategies();
    }
    
    initializeStrategies() {
        // การรวมข้อมูลแบบ Sum
        this.mixingStrategies.set('sum', {
            name: 'Sum (รวม)',
            description: 'รวมค่าข้อมูลจากทุกการ์ด',
            apply: (datasets) => this.sumStrategy(datasets),
            requirements: ['numeric-data']
        });
        
        // การรวมข้อมูลแบบ Average
        this.mixingStrategies.set('average', {
            name: 'Average (ค่าเฉลี่ย)',
            description: 'คำนวณค่าเฉลี่ยจากทุกการ์ด',
            apply: (datasets) => this.averageStrategy(datasets),
            requirements: ['numeric-data']
        });
        
        // การรวมข้อมูลแบบ Merge
        this.mixingStrategies.set('merge', {
            name: 'Merge (รวมตาราง)',
            description: 'รวมตารางข้อมูลตาม key fields',
            apply: (datasets, config) => this.mergeStrategy(datasets, config),
            requirements: ['table-data', 'common-fields']
        });
        
        // การรวมข้อมูลแบบ Compare
        this.mixingStrategies.set('compare', {
            name: 'Compare (เปรียบเทียบ)',
            description: 'แสดงข้อมูลเปรียบเทียบแบบ side-by-side',
            apply: (datasets) => this.compareStrategy(datasets),
            requirements: ['compatible-structure']
        });
    }
    
    // ผสมข้อมูลการ์ด
    async mixCardData(sourceCardIds, strategy, config = {}) {
        // ดึงข้อมูลจากการ์ดต้นทาง
        const datasets = await Promise.all(
            sourceCardIds.map(cardId => this.getCardData(cardId))
        );
        
        // ตรวจสอบความเข้ากันได้
        this.validateDataCompatibility(datasets, strategy);
        
        // ใช้กลยุทธ์การผสมข้อมูล
        const mixingFunction = this.mixingStrategies.get(strategy);
        if (!mixingFunction) {
            throw new Error(`Unknown mixing strategy: ${strategy}`);
        }
        
        const result = await mixingFunction.apply(datasets, config);
        
        // สร้างข้อมูล metadata สำหรับการ์ดผสม
        const metadata = {
            sourceCards: sourceCardIds,
            strategy: strategy,
            config: config,
            mixedAt: new Date().toISOString(),
            dataHash: this.calculateDataHash(result)
        };
        
        return {
            data: result,
            metadata: metadata,
            formula: this.generateFormula(sourceCardIds, strategy, config)
        };
    }
    
    // กลยุทธ์การรวมแบบ Sum
    sumStrategy(datasets) {
        // หาโครงสร้างข้อมูลที่เหมือนกัน
        const commonStructure = this.findCommonStructure(datasets);
        
        return commonStructure.map(fieldConfig => {
            const { field, type } = fieldConfig;
            
            if (type === 'numeric') {
                // รวมค่าตัวเลข
                const sum = datasets.reduce((total, dataset) => {
                    const value = this.getFieldValue(dataset, field);
                    return total + (parseFloat(value) || 0);
                }, 0);
                
                return { field, value: sum, type: 'calculated' };
            } else {
                // สำหรับข้อมูลประเภทอื่น ใช้ค่าจากการ์ดแรก
                return { 
                    field, 
                    value: this.getFieldValue(datasets[0], field), 
                    type: 'inherited' 
                };
            }
        });
    }
    
    // กลยุทธ์การรวมแบบ Merge
    mergeStrategy(datasets, config) {
        const { joinType = 'inner', keyFields = [] } = config;
        
        if (keyFields.length === 0) {
            throw new Error('Key fields required for merge strategy');
        }
        
        // เริ่มจากชุดข้อมูลแรก
        let result = [...datasets[0]];
        
        // ผสมชุดข้อมูลทีละชุด
        for (let i = 1; i < datasets.length; i++) {
            result = this.joinDatasets(result, datasets[i], keyFields, joinType);
        }
        
        return result;
    }
    
    // การ Join ข้อมูล
    joinDatasets(left, right, keyFields, joinType) {
        const result = [];
        
        if (joinType === 'inner') {
            left.forEach(leftRow => {
                const matches = right.filter(rightRow =>
                    keyFields.every(field => leftRow[field] === rightRow[field])
                );
                
                matches.forEach(rightRow => {
                    result.push({ ...leftRow, ...rightRow });
                });
            });
        }
        // เพิ่ม joinType อื่นๆ ตามต้องการ
        
        return result;
    }
}
```

### **7. ระบบ Real-time Data และ Node Communication**

#### **Node-like Communication System**
```javascript
class CardNodeSystem {
    constructor() {
        this.nodes = new Map(); // การ์ดทั้งหมด
        this.connections = new Map(); // การเชื่อมต่อระหว่างการ์ด
        this.dataFlows = new Map(); // การไหลของข้อมูล
    }
    
    // ลงทะเบียนการ์ดเป็น node
    registerNode(cardId, config = {}) {
        const node = {
            id: cardId,
            type: config.type || 'data-processor',
            inputs: new Map(),
            outputs: new Map(),
            processors: [],
            
            // Event handlers
            onDataReceived: null,
            onDataProcessed: null,
            onDataOutput: null
        };
        
        this.nodes.set(cardId, node);
        return node;
    }
    
    // เชื่อมต่อการ์ด (output -> input)
    connectCards(fromCardId, toCardId, config = {}) {
        const {
            outputPort = 'default',
            inputPort = 'default',
            transform = null,
            filter = null
        } = config;
        
        const connectionId = `${fromCardId}->${toCardId}`;
        
        const connection = {
            id: connectionId,
            from: { cardId: fromCardId, port: outputPort },
            to: { cardId: toCardId, port: inputPort },
            transform: transform,
            filter: filter,
            active: true,
            
            // สถิติ
            stats: {
                messagesCount: 0,
                lastMessage: null,
                avgProcessingTime: 0
            }
        };
        
        this.connections.set(connectionId, connection);
        
        // อัปเดต node connections
        const fromNode = this.nodes.get(fromCardId);
        const toNode = this.nodes.get(toCardId);
        
        if (fromNode) {
            fromNode.outputs.set(outputPort, connectionId);
        }
        
        if (toNode) {
            toNode.inputs.set(inputPort, connectionId);
        }
    }
    
    // ส่งข้อมูลผ่าน connection
    async sendData(fromCardId, data, port = 'default') {
        const fromNode = this.nodes.get(fromCardId);
        if (!fromNode) {
            throw new Error(`Node ${fromCardId} not found`);
        }
        
        const connectionId = fromNode.outputs.get(port);
        if (!connectionId) {
            console.warn(`No output connection on port ${port} for card ${fromCardId}`);
            return;
        }
        
        const connection = this.connections.get(connectionId);
        if (!connection || !connection.active) {
            return;
        }
        
        // ประมวลผลข้อมูลตาม connection config
        let processedData = data;
        
        // ใช้ filter ถ้ามี
        if (connection.filter) {
            processedData = await this.applyFilter(processedData, connection.filter);
        }
        
        // ใช้ transform ถ้ามี
        if (connection.transform) {
            processedData = await this.applyTransform(processedData, connection.transform);
        }
        
        // ส่งข้อมูลไปยัง destination node
        const toNode = this.nodes.get(connection.to.cardId);
        if (toNode && toNode.onDataReceived) {
            await toNode.onDataReceived(processedData, connection.to.port);
        }
        
        // อัปเดตสถิติ
        connection.stats.messagesCount++;
        connection.stats.lastMessage = new Date().toISOString();
        
        // Trigger events
        this.emit('dataFlow', {
            connection: connectionId,
            data: processedData,
            timestamp: new Date().toISOString()
        });
    }
    
    // Real-time data streaming
    setupDataStream(cardId, config = {}) {
        const {
            source,
            interval = 5000,
            transform = null
        } = config;
        
        const streamId = `stream-${cardId}-${Date.now()}`;
        
        const stream = {
            id: streamId,
            cardId: cardId,
            source: source,
            interval: interval,
            active: false,
            lastData: null,
            
            start: () => this.startStream(streamId),
            stop: () => this.stopStream(streamId),
            pause: () => this.pauseStream(streamId)
        };
        
        this.dataFlows.set(streamId, stream);
        return stream;
    }
    
    async startStream(streamId) {
        const stream = this.dataFlows.get(streamId);
        if (!stream) return;
        
        stream.active = true;
        
        const fetchData = async () => {
            if (!stream.active) return;
            
            try {
                // ดึงข้อมูลจาก source
                const data = await this.fetchStreamData(stream.source);
                
                // ส่งข้อมูลไปยังการ์ด
                await this.sendData(stream.cardId, data);
                
                stream.lastData = data;
                
                // Schedule next fetch
                setTimeout(fetchData, stream.interval);
                
            } catch (error) {
                console.error(`Stream ${streamId} error:`, error);
                
                // Retry หรือหยุด stream ตามการตั้งค่า
                if (stream.retryCount < 3) {
                    stream.retryCount = (stream.retryCount || 0) + 1;
                    setTimeout(fetchData, stream.interval * 2); // เพิ่ม delay
                } else {
                    this.stopStream(streamId);
                }
            }
        };
        
        // เริ่มต้น stream
        fetchData();
    }
}
```

### **8. การบันทึกและจัดเก็บข้อมูล**

#### **Data Storage Strategy**
```javascript
class CardDataStorage {
    constructor() {
        this.storageBackends = {
            local: new LocalStorageBackend(),
            indexeddb: new IndexedDBBackend(),
            api: new APIStorageBackend(),
            cloud: new CloudStorageBackend()
        };
        
        this.defaultBackend = 'indexeddb';
    }
    
    // บันทึกข้อมูลการ์ด
    async saveCard(cardData, options = {}) {
        const {
            backend = this.defaultBackend,
            compress = true,
            backup = true
        } = options;
        
        try {
            // เตรียมข้อมูลสำหรับบันทึก
            const saveData = {
                ...cardData,
                savedAt: new Date().toISOString(),
                version: this.incrementVersion(cardData.version || '1.0.0')
            };
            
            // บีบอัดข้อมูลถ้าต้องการ
            if (compress && saveData.inputData.raw.length > 1000) {
                saveData.inputData.raw = await this.compressData(saveData.inputData.raw);
                saveData.compressed = true;
            }
            
            // บันทึกข้อมูลหลัก
            await this.storageBackends[backend].save(saveData.id, saveData);
            
            // สร้าง backup ถ้าต้องการ
            if (backup) {
                await this.createBackup(saveData);
            }
            
            return {
                success: true,
                cardId: saveData.id,
                version: saveData.version,
                savedAt: saveData.savedAt
            };
            
        } catch (error) {
            console.error('Save card failed:', error);
            throw error;
        }
    }
    
    // โหลดข้อมูลการ์ด
    async loadCard(cardId, options = {}) {
        const {
            backend = this.defaultBackend,
            version = 'latest'
        } = options;
        
        try {
            let cardData = await this.storageBackends[backend].load(cardId);
            
            // โหลดเวอร์ชันเฉพาะถ้าระบุ
            if (version !== 'latest') {
                cardData = await this.loadSpecificVersion(cardId, version);
            }
            
            // ขยายข้อมูลถ้าถูกบีบอัด
            if (cardData.compressed) {
                cardData.inputData.raw = await this.decompressData(cardData.inputData.raw);
            }
            
            return cardData;
            
        } catch (error) {
            console.error('Load card failed:', error);
            throw error;
        }
    }
    
    // ระบบ Version Control
    async createSnapshot(cardId, description = '') {
        const cardData = await this.loadCard(cardId);
        
        const snapshot = {
            id: `${cardId}-snapshot-${Date.now()}`,
            parentCardId: cardId,
            description: description,
            data: cardData,
            createdAt: new Date().toISOString()
        };
        
        await this.storageBackends[this.defaultBackend].save(
            `snapshots:${snapshot.id}`, 
            snapshot
        );
        
        return snapshot;
    }
    
    // Export/Import การ์ด
    async exportCard(cardId, format = 'json') {
        const cardData = await this.loadCard(cardId);
        
        const exportData = {
            cardData: cardData,
            exportedAt: new Date().toISOString(),
            exportFormat: format,
            version: '1.0.0'
        };
        
        switch (format) {
            case 'json':
                return JSON.stringify(exportData, null, 2);
            
            case 'zip':
                return await this.createZipExport(exportData);
            
            case 'package':
                return await this.createPackageExport(exportData);
            
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
    }
    
    async importCard(importData, format = 'json') {
        let cardData;
        
        switch (format) {
            case 'json':
                const parsed = JSON.parse(importData);
                cardData = parsed.cardData;
                break;
            
            case 'zip':
                cardData = await this.extractZipImport(importData);
                break;
            
            default:
                throw new Error(`Unsupported import format: ${format}`);
        }
        
        // สร้าง ID ใหม่หรือใช้ ID เดิม
        const newCardId = `card-${Date.now()}`;
        cardData.id = newCardId;
        cardData.importedAt = new Date().toISOString();
        
        await this.saveCard(cardData);
        
        return newCardId;
    }
}
```

---

## 🔄 Data Flow Diagram

```
[External Data] → [Input Manager] → [Transform Pipeline] → [Card Processing] → [Output Manager] → [Export/Share]
       ↑                ↓                      ↓                    ↓                ↓
[API Sources]    [Data Storage]         [Mix Processing]    [Node System]    [Real-time Stream]
       ↑                ↓                      ↓                    ↓                ↓
[File Upload]    [Version Control]      [Validation]        [Connections]    [Collaborators]
```

---

## 📊 Implementation Priority

### **Phase 1: Core Data System**
- [ ] Card Data Schema
- [ ] Input/Output Managers  
- [ ] Basic Storage System
- [ ] Data Transformation Pipeline

### **Phase 2: Advanced Features**
- [ ] Mixed Cards Data Processing
- [ ] Node Communication System
- [ ] Real-time Data Streams
- [ ] Export/Import Functions

### **Phase 3: Collaboration & Sharing**
- [ ] Share Link System
- [ ] Collaboration Tools
- [ ] API Endpoints
- [ ] Version Control

### **Phase 4: Performance & Scale**
- [ ] Data Compression
- [ ] Caching Systems
- [ ] Background Processing
- [ ] Performance Monitoring
