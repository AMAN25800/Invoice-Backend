import express from "express"
import Transactionrouter from "./route/TransactionRoute.js";
const app = express();
const port = process.env.PORT || 8000;
import cors from 'cors';
import {Connectdb} from "./database/db.js"
import userRouter from "./route/userRoute.js";
import itemRoute from "./route/ItemRoute.js";
import invoicerouter from "./route/InvoiceRoute.js";
app.use(cors());
app.use(express.json());
Connectdb();
app.use('/',userRouter);
app.use('/',itemRoute);
app.use('/',invoicerouter);
app.use('/',Transactionrouter);
app.get("/", (req, res) => {
  
  
    res.send("API is working");
   
  
  
   
  });
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
