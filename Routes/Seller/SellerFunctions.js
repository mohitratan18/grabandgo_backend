const express = require('express');
const router = express.Router();
const Auth = require('../../Middlewares/Auth');
const Products = require('../../DataModels/Products');
const Seller = require('../../DataModels/Seller');
//Add Item to inventroy 

router.post('/inventory/:id',async(req,res)=>{
    console.log(req.params.id);
    try {
        
    } catch (error) {
        
    }
})

// Products ADD bt admin

router.post('/additems',async(req,res)=>{
    const {name,product_description,price,img} = req.body;
    try {
        const newproduct = await Products.create({
            name,
            product_description,
            price,
            img,
            approved:false,
        })
        return res.status(201).json({"message":"ADDED"});
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;