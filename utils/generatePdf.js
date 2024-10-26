const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = async (invoice) => {
  const doc = new PDFDocument();
  const pdfPath = `./uploads/invoice_${Date.now()}.pdf`;

  doc.pipe(fs.createWriteStream(pdfPath));
  
  doc.fontSize(25).text('Invoice', { align: 'center' });

  doc.moveDown();
  invoice.items.forEach((item) => {
    doc.fontSize(14).text(
      `${item.quantity}x ${item.item_name} - ${item.item_desc}: $${item.item_price * item.quantity}`
    );
  });

  doc.moveDown();
  doc.fontSize(18).text(`Total: $${invoice.total}`, { align: 'right' });

  doc.end();

  return pdfPath;
};

export default generatePDF;
