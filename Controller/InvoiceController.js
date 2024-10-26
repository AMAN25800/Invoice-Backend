// InvoiceController.js
import Invoice from '../Model/InvoiceSchema.js';



// Save invoice
const saveInvoice = async (req, res) => {
  const { items, total, date,email,customerName} = req.body;

  try {
    const newInvoice = new Invoice({ items, total, date,email,customerName });
    await newInvoice.save();
    res.status(201).json({ message: 'Invoice saved successfully!' });
  } catch (error) {
    console.error('Error saving invoice:', error);
    res.status(500).json({ message: 'Failed to save invoice.' });
  }
};
const getTransaction = async (req, res) => {
  try {
    const { email, fromDate, toDate } = req.query;

    // Validate query parameters
    if (!email || !fromDate || !toDate) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Parse the dates to ensure proper comparison
    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Check if end date is greater than start date
    if (end < start) {
      return res.status(400).json({ message: 'End date must be greater than or equal to start date' });
    }

    // Adjust end date to include the full end date
    end.setHours(23, 59, 59, 999); // Set the end date to the end of the day

    const invoices = await Invoice.find({
      email,
      date: { $gte: start, $lte: end },  // Use `$gte` and `$lte` for inclusive range filtering
    }).exec();

    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getInvoice=async(req,res)=>{
  try {
    const { customerName, date,email } = req.query;
    const startOfDay = new Date(date);
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date(date);
endOfDay.setHours(23, 59, 59, 999);


    console.log('Received Query Params:', { customerName, date,email });

    if (!customerName || !date) {
      return res.status(400).json({ message: 'Customer name and date are required.' });
    }

    // Adjust this to fit your actual database schema.
    const invoiceData = await Invoice.find({
      customerName,
      date: { $gte: startOfDay, $lte: endOfDay },// Ensure the date format matches your DB.
    });

    if (!invoiceData) {
      console.log('No invoice found for:', { customerName, date });
      return res.status(404).json({ message: 'Invoice not found.' });
    }

    console.log('Found Invoice:', invoiceData);
    res.json(invoiceData);

  } catch (error) {
    console.error('Error in /invoice route:', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
}
export {getTransaction,saveInvoice,getInvoice};