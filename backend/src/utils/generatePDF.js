const PDFDocument = require('pdfkit');

const generatePDFReport = (res, { title, data, filename = 'report.pdf' }) => {
  const doc = new PDFDocument({ margin: 40 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  doc.pipe(res);

  doc.fontSize(18).text('Karnataka State Police', { align: 'center' });
  doc.fontSize(14).text(title, { align: 'center' });
  doc.moveDown(1.5);

  data.forEach((row, index) => {
    doc.fontSize(11).text(`${index + 1}. ${JSON.stringify(row)}`);
    doc.moveDown(0.5);
  });

  doc.end();
};

module.exports = generatePDFReport;