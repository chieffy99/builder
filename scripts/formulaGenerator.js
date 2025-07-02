// formulaGenerator.js
// A self-contained module to parse DSL codes and generate Excel SUMIFS/IF formulas
// Based strictly on your DSL and mapping examples (e.g. OTPKPT, OTSAPT, etc.)

// Map each two-letter target to its slot index
const slotMapping = {
  PT: 1, LT: 2, ST: 3, CL: 4, CU: 5,
  RU: 6, DU: 7, BL: 1, RF: 1, BY: 1, // BL/RF/BY use slot1 per examples
  // add more if needed
};

/**
 * parseCode(code)
 * @param {string} code - e.g. 'OTPKPT'
 * @returns {{ id1: string, id2: string, target: string }}
 */
export function parseCode(code) {
  if (code.length < 6) {
    throw new Error(`Invalid code '${code}', expected at least 6 chars`);
  }
  const id1     = code.slice(0, 2);
  const id2     = code.slice(2, 4);
  const target  = code.slice(4, 6);
  return { id1, id2, target };
}

/**
 * generateSumifs(code, opts)
 * Build a SUMIFS or IF-wrapped formula string matching your examples.
 * @param {string} code     - DSL code (e.g. 'OTPKPT')
 * @param {object} opts     - field names and date refs (optional)
 *   slotField:    'slot1'       // default based on target
 *   id1Field:     'ID1'         // default
 *   id2Field:     'ID2'
 *   statNCond:    '"0"'         // default
 *   statCCond:    '"B"'
 *   dateField:    'DaTiX'
 *   dateStartRef: 'DaTiXFin'
 *   dateEndRef:   'DaTiXFin'
 *   wrapIfC:      true          // if StatC='C' wrap with IF(..., slot, "0")
 */
export function generateSumifs(code, opts = {}) {
  const {
    slotField    = null,
    id1Field     = 'ID1',
    id2Field     = 'ID2',
    statNCond    = '"0"',
    statCCond    = '"B"',
    dateField    = 'DaTiX',
    dateStartRef = 'DaTiXFin',
    dateEndRef   = 'DaTiXFin',
    wrapIfC      = false,
  } = opts;

  const { id1, id2, target } = parseCode(code);
  const slotIdx = slotMapping[target];
  if (!slotIdx) {
    throw new Error(`No slot mapping for target '${target}'`);
  }
  const slotRef = slotField || `slot${slotIdx}`;

  // Build SUMIFS args in the order: slotField, ID1, ID2, StatN, StatC, date>=, date<=
  const args = [
    slotRef,
    `${id1Field}, "${id1}"`,
    `${id2Field}, "${id2}"`,
    `StatN, ${statNCond}`,
    `StatC, ${statCCond}`,
    `${dateField}, ">="&${dateStartRef}`,
    `${dateField}, "<="&${dateEndRef}`,
  ];

  let formula = `=SUMIFS(${args.join(', ')})`;

  // If wrapIfC, generate an IF formula for StatC="C" case, per your examples
  if (wrapIfC) {
    formula = `=IF(AND(${id1Field}="${id1}", ${id2Field}="${id2}", StatN=${statNCond}, StatC="C", ${dateField}<="${dateEndRef}"), ${slotRef}, "0") * ${formula}`;
  }

  return formula;
}

/**
 * generateBatch(codes, opts)
 * @param {string[]} codes - list of DSL codes
 * @param {object} opts    - passed to generateSumifs
 * @returns {object}       - { code: formula } map
 */
export function generateBatch(codes, opts) {
  const result = {};
  for (const code of codes) {
    try {
      result[code] = generateSumifs(code, opts);
    } catch (e) {
      result[code] = `#ERROR: ${e.message}`;
    }
  }
  return result;
}

// Example usage:
if (require.main === module) {
  const codes = ['OTPKPT','OTPKLT','OTPKST','OTPKCL','OTPKCU'];
  const formulas = generateBatch(codes);
  console.log(formulas);
  /*
  {
    OTPKPT: '=SUMIFS(slot1, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)',
    OTPKLT: '=SUMIFS(slot2, ID1, "OT", ID2, "PK", StatN, "0", StatC, "B", DaTiX, ">="&DaTiXFin, DaTiX, "<="&DaTiXFin)',
    ...
  }
  */
}
