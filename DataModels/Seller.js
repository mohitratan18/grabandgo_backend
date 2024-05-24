const mongoose = require('mongoose');
const seller = new mongoose.Schema({
    name:{
        type:String,
    },
    shopName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneno:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    shoplink:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    coord:{
        type:String,
    },
    inventory:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
            }
        }
    ]

});
const Seller = new mongoose.model('Seller',seller);
module.exports = Seller;