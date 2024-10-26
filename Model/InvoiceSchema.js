import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema({
  items: [
    {
      item_name: { type: String, required: true },
      item_desc: { type: String, required: true },
      item_price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  email:{type:String,required:true},
  customerName:{type:String,required:true}, // Store date of the invoice
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
