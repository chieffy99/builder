// headerMapper.js
// Module: แปลงชื่อคอลัมน์ต้นทาง → ชื่อฟิลด์กลาง OntologyCore

const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * อ่านไฟล์แม็ป (JSON หรือ YAML) ที่กำหนดการแม็ป header→field ตามตัวอย่างใน 'ก่อน time value_250630_172416.txt'
 * เช่น { mappings: { "วันที่": "Timeing", "ยอดหนี้": "DebtVolume", ... } } :contentReference[oaicite:0]{index=0}
 */
class HeaderMapper {
  /**
   * @param {string} mapFilePath - path to a .json or .yml mapping file
   */
  constructor(mapFilePath) {
    const ext = path.extname(mapFilePath).toLowerCase();
    const raw = fs.readFileSync(mapFilePath, 'utf8');
    this.config = ext === '.json'
      ? JSON.parse(raw)
      : yaml.load(raw);
    this.mappings = this.config.mappings || {};
  }

  /**
   * แปลง header เดิมเป็น field name กลาง
   * 1) ถ้ามีใน mappings ให้ใช้ค่านั้นตรงๆ
   * 2) ถ้าไม่มีก็แปลงเป็น PascalCase: ตัดอักขระพิเศษ, ตัด space, กำกับตัวแรกใหญ่
   * 3) ถ้าชื่อทับ reserved word ให้เติม _ นำหน้า
   */
  map(header) {
    const key = header.trim();
    if (this.mappings[key]) {
      return this.mappings[key];
    }
    // fallback: normalize, remove non-word, split, PascalCase
    const noDiacritics = key
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '');
    const clean = noDiacritics
      .replace(/[^0-9A-Za-zก-๙\s]/g, ' ')
      .trim();
    const parts = clean.split(/\s+/);
    const pascal = parts
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');
    
    const reserved = new Set([
      'Class','Function','Var','Const','Let','Import','Export'
      // เพิ่มเติมตามมาตรฐานของคุณ
    ]);
    return reserved.has(pascal)
      ? `_${pascal}`
      : pascal;
  }
}

module.exports = HeaderMapper;

/*
Usage Example:

// สมมติมีไฟล์ mapping.yml ด้วยเนื้อหาแบบนี้
// mappings:
//   วันที่: Timeing
//   ยอดหนี้: DebtVolume
//   รอบบัญชี: Index
//   จำนวน: Quantity

const HeaderMapper = require('./headerMapper');
const mapper = new HeaderMapper('mapping.yml');

// แปลงชื่อ header หลายตัว
const headers = ['วันที่','ยอดหนี้','ชื่อสินค้า','class','หมายเหตุ'];
const fields = headers.map(h => mapper.map(h));
console.log(fields);
// ผลลัพธ์: ['Timeing','DebtVolume','ชื่อสินค้าPascal','_Class','หมายเหตุPascal']
*/
