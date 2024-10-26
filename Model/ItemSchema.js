import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    email:{type:String,required:true},
    items:[{
        item_name:{type:String,required:true},
        item_desc:{type:String,required:true},
        item_price:{type:String,required:true},
        
    }]
})



const ProductList = mongoose.model('ProductList', ItemSchema);
export default ProductList;
