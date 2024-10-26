import express from 'express';
import { getTransaction, saveInvoice,getInvoice } from '../Controller/InvoiceController.js';

const invoicerouter = express.Router();

// Route to save an invoice
invoicerouter.post('/invoices', saveInvoice);
invoicerouter.get('/get-transaction',getTransaction)
invoicerouter.get('/get-invoice',getInvoice)

// Route to fetch available items (mock data)


export default invoicerouter;
