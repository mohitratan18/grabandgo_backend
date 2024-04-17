const express = require('express');
const router = express.Router();
const Auth = require('../../Middlewares/Auth');
const Products = require('../../DataModels/Products');

//Add Item
// router.post('/additem',Auth,async(req,res)=>{
//     const {name,product_description,price,img} = req.body;
//     const token = req.user;
//     const tokenid = token.id;
//     // console.log(token.id);
//     try {
//         const checkproduct = await Products.findOne({name,product_description,price,img});
//         console.log(checkproduct)
//         const status = false;
//         if(checkproduct){
//             const pid = checkproduct._id;
//             return res.status(401).json({"message":"Item exists",status});
//         }
//         else{
//             const product = await Products.create({
//                 name,
//                 product_description,
//                 inventory,
//                 price,
//                 img,
//                 userId:token.id,
//             })
//             // console.log(product);
//             return res.status(200).json({"message":"Added successfully"});
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });

// //reduce the inventory
// router.post('/decrement/:id',Auth,async(req,res)=>{
//     const itemid = req.params.id;
//     const item = await Products.findOne({_id:itemid});
//     if(!item){
//         return res.status(400).json({"message":"item not found"});
//     }
//     else if(req.user.id != item.userId){
//         console.log(req.user.id);
//         console.log(item.userId);
//         return res.status(400).json({"message":"Permission denied"});
//     }
//     else{
//         const inventory = item.inventory - 1;
//         console.log(inventory);
//         await Products.findOneAndUpdate({_id:itemid},{inventory:inventory});
//         return res.status(201).json({"message":"Decrement done"}); 
//     }
// })

// //increase the inventory
// router.post('/increment/:id',Auth,async(req,res)=>{
//     const itemid = req.params.id;
//     const item = await Products.findOne({_id:itemid});
//     if(!item){
//         return res.status(400).json({"message":"item not found"});
//     }
//     else if(req.user.id != item.userId){
//         console.log(req.user.id);
//         console.log(item.userId);
//         return res.status(400).json({"message":"Permission denied"});
//     }
//     else{
//         const inventory = item.inventory + 1;
//         console.log(inventory);
//         await Products.findOneAndUpdate({_id:itemid},{inventory:inventory});
//         return res.status(201).json({"message":"Increment done"}); 
//     }
// })

// //delete the item
// router.post('/delete/:id',Auth,async(req,res)=>{
//     const itemid = req.params.id;
//     const item = await Products.findOne({_id:itemid});
//     if(!item){
//         return res.status(400).json({"message":"item not found"});
//     }
//     else if(req.user.id != item.userId){
//         console.log(req.user.id);
//         console.log(item.userId);
//         return res.status(400).json({"message":"Permission denied"});
//     }
//     else{
//         await Products.findByIdAndDelete(req.params.id);
//         return res.status(201).json({"message":"delete done"}); 
//     }
// })

// Products ADD bt admin

router.post('/additems',async(req,res)=>{
    const {name,product_description,price,img} = req.body;
    try {
        const newproduct = await Products.create({
            name,
            product_description,
            price,
            img,
            approved:true,
        })
        return res.status(201).json({"message":"ADDED"});
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;