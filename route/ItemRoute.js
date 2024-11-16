import express from 'express'
import { addOrUpdateItems,listItems } from '../Controller/ItemsController.js'
const itemRoute=express.Router();
itemRoute.post('/additem',addItems);
itemRoute.get('/listitems',listItems);
export default itemRoute;
