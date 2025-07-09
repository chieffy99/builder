// This file is an example of processing the "sting" transactions.
// The code loads a CSV file using PapaParse, maps header names to internal variable names,
// and then applies the embedded formula logic to compute summary values.

import {
  mapStatN,
  mapStatC,
  mapSlot,
  mapID1,
  mapID2
} from './datadict_mapping.js';

document.addEventListener('DOMContentLoaded', () => {
  const csvUrl =
    'https://raw.githubusercontent.com/chieffy99/File-reader/main/%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%2520%25202.csv';

  let transactions = [];

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: results => {
      transactions = results.data;
      renderTransactions();
    }
  });

  const obligorInput = document.getElementById('filterObligor');
  const activityInput = document.getElementById('filterActivity');
  if (obligorInput) obligorInput.addEventListener('input', renderTransactions);
  if (activityInput) activityInput.addEventListener('input', renderTransactions);

  function passesFilters(row) {
    if (obligorInput && obligorInput.value && row['A0ID1'] !== obligorInput.value)
      return false;
    if (
      activityInput &&
      activityInput.value &&
      row['A0ID2'] !== activityInput.value
    )
      return false;
    return true;
  }

  function renderTransactions() {
    const container = document.getElementById('transactions');
    container.innerHTML = '';

    transactions.forEach(row => {
      if (!passesFilters(row)) return;

      const date = row['A0Date'];
      const id1 = mapID1(row['A0ID1']);
      const id2 = mapID2(row['A0ID2']);
      const statN = mapStatN(row['A0StatN']);
      const statC = mapStatC(row['A0StatC']);

      const slots = [];
      for (let i = 1; i <= 7; i++) {
        slots.push(row[`A0slot${i}`] || '');
      }

      let div = document.createElement('div');
      div.className = 'transaction';
      div.innerHTML =
        `<strong>${date}</strong> - ${id1} / ${id2} ` +
        `(${statN}, ${statC})<br>` +
        `Slots: ${slots.join(', ')}`;
      container.appendChild(div);
    });
  }
});
