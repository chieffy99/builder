// This file is an example of processing the "sting" transactions.
// The code loads a CSV file using PapaParse, maps header names to internal variable names,
// and then applies the embedded formula logic to compute summary values.

document.addEventListener("DOMContentLoaded", function () {
  // URL of the CSV file on GitHub or your server.
  const csvUrl = "https://raw.githubusercontent.com/chieffy99/File-reader/main/เปลี่ยน%202.csv";

  // Parse the CSV using PapaParse.
  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      
      // Process each transaction row ("sting").
      data.forEach(function(row) {
        // Mapping header fields with A0 prefix to internal variables.
        const date = row["A0Date"];
        const id1 = row["A0ID1"];
        const id2 = row["A0ID2"];
        const statN = row["A0StatN"];
        const statC = row["A0StatC"];
        // Mapping slot fields.
        const slots = [];
        for (let i = 1; i <= 7; i++) {
          slots.push(row[`A0slot${i}`]);
        }

        // Example of how fields act as filters:
        // If id1 is not "OT" and id2 equals "BYT", apply a formula.
        if(id1 !== "OT" && id2 === "BYT") {
          // Suppose we want to compute a total value via a simple B×C formula:
          // Let B be the count in slot4 and C be derived from another calculation (fixed constant for demo).
          let countValue = parseFloat(slots[3]) || 0;  // slot4 value
          let price = 6.5; // Example price constant.
          let totalValue = countValue * price;
          console.log(`Transaction on ${date}: Total Value (B×C) = ${totalValue}`);
        }
      });
    }
  });
});