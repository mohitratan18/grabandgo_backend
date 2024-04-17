const mongoose = require('mongoose');
const inventory = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
    }
});
const Inventory = new mongoose.model('Inventory',inventory);
module.exports = Inventory;