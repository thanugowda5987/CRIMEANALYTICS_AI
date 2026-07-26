const PDFDocument = require("pdfkit");

const generateFIRPdf = (fir, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=FIR-${fir.firNumber}.pdf`);

  doc.pipe(res);

  doc
    .fontSize(18)
    .fillColor("#234B8C")
    .text("Karnataka State Police", { align: "center" });

  doc
    .fontSize(14)
    .fillColor("#000")
    .text("First Information Report (FIR)", { align: "center" });

  doc.moveDown(1.5);

  doc.fontSize(11);
  doc.text(`FIR Number: ${fir.firNumber}`);
  doc.text(`Date Filed: ${new Date(fir.dateFiled).toLocaleDateString()}`);
  doc.text(`Police Station: ${fir.policeStation?.name || "N/A"}`);
  doc.text(`District: ${fir.district?.name || "N/A"}`);
  doc.text(`Crime Category: ${fir.crimeCategory?.name || "N/A"}`);
  doc.text(`Status: ${fir.status}`);
  doc.moveDown();

  doc.text(`Complainant Name: ${fir.complainantName || "N/A"}`);
  doc.text(`Complainant Contact: ${fir.complainantContact || "N/A"}`);
  doc.moveDown();

  doc.text(`Incident Location: ${fir.incidentLocation || "N/A"}`);
  doc.text(
    `Incident Date: ${fir.incidentDate ? new Date(fir.incidentDate).toLocaleDateString() : "N/A"}`
  );
  doc.moveDown();

  doc.text("Description:", { underline: true });
  doc.text(fir.description || "N/A");
  doc.moveDown();

  doc.text(
    `Investigating Officer: ${fir.investigatingOfficer?.name || "Not Assigned"}`
  );

  doc.moveDown(2);
  doc
    .fontSize(9)
    .fillColor("#666")
    .text("This is a system-generated document from the KSP Crime Analytics Platform.", {
      align: "center",
    });

  doc.end();
};

module.exports = { generateFIRPdf };