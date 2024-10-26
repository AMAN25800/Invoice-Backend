// models/Transaction.js
import mongoose from 'mongoose';

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // Store the timestamp of each transaction
});

// Export the model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
