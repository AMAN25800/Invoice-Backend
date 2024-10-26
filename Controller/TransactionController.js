// controllers/invoiceController.js
import Invoice from "../Model/InvoiceSchema.js";
// Controller to get the total sum of all invoices for today's date
const getTotalForToday = async (req, res) => {
    const {email}=req.query;
  try {
    // Get today's start and end time
    const startOfDay = new Date().setHours(0, 0, 0, 0); // Start of today
    const endOfDay = new Date().setHours(23, 59, 59, 999); // End of today

    // Find all invoices for today
    const invoices = await Invoice.find({
      email,
      date: { $gte: new Date(startOfDay), $lte: new Date(endOfDay) },
    });

    // Sum the 'total' field of all today's invoices
    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

    // Send the total amount to the frontend
    res.status(200).json({ total: totalAmount });
  } catch (error) {
    console.error('Error fetching total amount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export {getTotalForToday};