import datadict from "./backend/utils/dictionary.json" assert { type: "json" };

export function mapStatN(code) {
  return datadict.StatN[String(code)] || "Unknown";
}

export function mapStatC(code) {
  return datadict.StatC[String(code)] || "Unknown";
}

export function mapSlot(slot) {
  return datadict.slotMeaning[slot] || "Unknown";
}

export function mapID1(code) {
  return datadict.ID1Type[code] || "Unknown";
}

export function mapID2(code) {
  return datadict.ID2Type[code] || "Unknown";
}
