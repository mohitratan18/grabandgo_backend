const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    phoneno:{
        type:String,
        unique:true,
    },
})
const User = new mongoose.model('User',user);
module.exports = User;