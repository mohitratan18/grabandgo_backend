const express = require("express");
const router = express.Router();
const Seller = require('../../DataModels/Seller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "life gives you what you need not what you want";

// seller login
router.post("/login", async (req, res) => {
  const { name, shopName, password, email, shoplink } = req.body;
//   console.log(name, shopName, password, email, shoplink);
  let status = false;
  try {
    const newseller = await Seller.findOne({email});
    if(!newseller){
        return res.status(401).json({"message":"Account doesn't exists" , status});
    }
    const ans = await bcrypt.compare(password , newseller.password);
    if(!ans){
        return res.status(401).json({"message":"Invalid credentials" , status});
    }
    const data = {
        user:{
            id:newseller._id,
        }
    }
    const authtoken = jwt.sign(data,secret);
    // console.log(authtoken);
    status = true
    return res.status(200).json({"message":"Login success",status,authtoken});
  } catch (error) {
    console.log(error);
  }
});

// seller signup
router.post('/signup',async(req,res)=>{
    const {password,email,name,phoneno,shoplink,shopName,pincode,address} = req.body;
    console.log(password," ",email," ",name," ",phoneno," ",pincode," ",address);
    try {
        let status = false;
        if(!password || !email ||!name ||!phoneno||!shopName||!shoplink ||!pincode||!address){
           return res.status(401).json({"message":"please enter valid credentials or each and every detail",status})
        }
        const sellerfind = await Seller.findOne({email:email});
        const sellerfind2 = await Seller.findOne({phoneno:phoneno});

        // console.log(userfind);
        // console.log(userfind2);
        if(sellerfind||sellerfind2){
            return res.status(401).json({"message":"User already exists",status})
        }
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password , salt);
        const Sellercheck = await Seller.create({
            name,
            email,
            phoneno,
            shoplink,
            shopName,
            password:pass,
            pincode,
            address
        })
        // console.log(usercheck);
        const data = {
            user:{
                id:Sellercheck._id,
            }
        }
        const authtoken = jwt.sign(data,secret);
        // console.log(authtoken);
        status = true
        return res.status(200).json({"message":"Login success",status,authtoken});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
