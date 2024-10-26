import express from 'express'
import { addItems,listItems } from '../Controller/ItemsController.js'
const itemRoute=express.Router();
itemRoute.post('/additem',addItems);
itemRoute.get('/listitems',listItems);
export default itemRoute;