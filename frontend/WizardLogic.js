export function buildLogicString(f) {
  return [
    f.date,
    f.id1.toUpperCase(),
    f.id2.toUpperCase(),
    f.statN,
    f.statC.toUpperCase(),
    ...f.slots
  ].join(',');
}
