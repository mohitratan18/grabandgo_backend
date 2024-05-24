const express = require('express');
const User = require('../../DataModels/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Auth = require('../../Middlewares/Auth')
const { default: mongoose } = require('mongoose');
const secret = "life gives you what you need not what you want";

// User login
router.post('/login',async(req,res)=>{
    const {password,email} = req.body;
    // console.log(password," ",email);
    try {
        let status = false;
        if(!password || !email){
           return res.status(401).json({"message":"please enter valid credentials",status})
        }
        const usercheck = await User.findOne({email:email});
        // console.log(usercheck);
        if(!usercheck){
            return res.status(401).json({"message":"User not found",status})
        }
        const ans = await bcrypt.compare(password , usercheck.password);
        if(!ans){
            return res.status(401).json({"message":"Incorrect credentials",status})
        }
        const data = {
            user:{
                id:usercheck._id,
            }
        }
        const authtoken = jwt.sign(data,secret);
        // console.log(authtoken);
        status = true
        return res.status(200).json({"message":"Login success",status,authtoken});
    } catch (error) {
        // console.log("error");
    }
});



// User Signup
router.post('/signup',async(req,res)=>{
    const {password,email,name,phoneno} = req.body;
    // console.log(password," ",email," ",name," ",phoneno);
    try {
        let status = false;
        if(!password || !email ||!name ||!phoneno){
           return res.status(401).json({"message":"please enter valid credentials",status})
        }
        const userfind = await User.findOne({email:email});
        const userfind2 = await User.findOne({phoneno:phoneno});

        // console.log(userfind);
        // console.log(userfind2);
        if(userfind||userfind2){
            return res.status(401).json({"message":"User already exists",status})
        }
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password , salt);
        const usercheck = await User.create({
            name,
            email,
            phoneno,
            password:pass
        })
        // console.log(usercheck);
        const data = {
            user:{
                id:usercheck._id,
            }
        }
        const authtoken = jwt.sign(data,secret);
        // console.log(authtoken);
        status = true
        return res.status(200).json({"message":"Login success",status,authtoken});
    } catch (error) {
        // console.log(error);
    }
});


module.exports = router;