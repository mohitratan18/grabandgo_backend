const express = require('express');
const router = express.Router();
const Products = require('../../DataModels/Products');

// AddItems

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

// Approve Items

router.post('/approve/:id',async(req,res)=>{
    const pid = req.params.id;
    try {
        await Products.findByIdAndUpdate(pid,{approved:true});
        return res.status(201).json({"message":"Approved"});
    } catch (error) {
        console.log(error);
    }
})

// Delete Items

router.post("/delete/:id",async(req,res)=>{
    const pid = req.params.id;
    try {
        await mongoose.findByIdAndDelete(pid);
        return res.status(201).json({"message":"Deleted"});
    } catch (error) {
        console.log(error);
    }
})

// Fetching All Products

router.get('/fetchitems',async(req,res)=>{
    try {
        const items = await Products.find();
        // console.log(items);
        return res.status(201).json(items);
    } catch (error) {
        console.log(error);
    }
})

// Fetch approved producsts


router.get('/fetchitems/approved',async(req,res)=>{
    try {
        const items = await Products.find({approved:true});
        return res.status(201).json(items);
    } catch (error) {
        console.log(items)
    }
})


// Fetch unapproved products

router.get('/fetchitems/unapproved',async(req,res)=>{
    try {
        const items = await Products.find({approved:false});
        return res.status(201).json(items);
    } catch (error) {
        console.log(items)
    }
})




module.exports = router;