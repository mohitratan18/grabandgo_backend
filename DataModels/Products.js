const mongoose = require('mongoose');
const product = new mongoose.Schema({
    name:{
        type:String,
    },
    product_description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    approved:{
        type:Boolean,
    }
});
const Product = new mongoose.model('Product',product);
module.exports = Product;