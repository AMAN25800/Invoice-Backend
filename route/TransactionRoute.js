// routes/transactionRoutes.js
import express from 'express';
const Transactionrouter = express.Router();
import {getTotalForToday} from '../Controller/TransactionController.js';

// Route to get total amount for today's transactions
Transactionrouter.get('/total-today', getTotalForToday);

export default  Transactionrouter;