const express = require("express");
const router = express.Router();
const Auth = require("../../Middlewares/Auth");
const Products = require("../../DataModels/Products");
const Seller = require("../../DataModels/Seller");

//Add Item to inventroy

router.post("/inventory/:id", Auth, async (req, res) => {
  // console.log(req.params.id);
  // console.log(req.user.id);
  try {
    const obj = {
      productId: req.params.id,
      quantity: 1,
    };
    // console.log(obj);
    const checkk = await Seller.findOne({ _id: req.user.id });
    const inventory = checkk.inventory;
    // console.log(inventory);
    let findproduct = false;
    for (let i = 0; i < inventory.length; i++) {
      // console.log(inventory[i].productId +" "+obj.productId );
      if (inventory[i].productId == obj.productId) {
        findproduct = true;
        break;
      }
    }
    // console.log(findproduct)
    if (findproduct) {
      return res
        .status(201)
        .json({ flag: false, message: "product already added" });
    } else {
      const check = await Seller.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { inventory: obj } },
        { new: true }
      );
      // console.log(check);
      return res
        .status(200)
        .json({ flag: true, message: "added successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Products ADD bt admin

router.post("/additems", async (req, res) => {
  const { name, product_description, price, img } = req.body;
  try {
    const newproduct = await Products.create({
      name,
      product_description,
      price,
      img,
      approved: false,
    });
    return res.status(201).json({ message: "ADDED" });
  } catch (error) {
    console.log(error);
  }
});

// Fetching seller inventory

router.get("/inventory/getitems", Auth, async (req, res) => {
  const userId = req.user.id;
  const sellerDetails = await Seller.findOne({ _id: userId });
  if (sellerDetails) {
    const inventory = sellerDetails.inventory;
    return res.status(201).json(inventory);
  }
});

// Fetch Products

router.get("/fetchitem/:id", Auth, async (req, res) => {
  try {
    const ProductId = req.params.id;
    const product = await Products.findOne({ _id: ProductId });

    return res.status(201).json(product);
  } catch (error) {}
});

//Incrementing items

router.post("/items/increment/:id", Auth, async (req, res) => {
  try {
    const userInventory = await Seller.findOne({ _id: req.user.id });
    const inventory = userInventory.inventory;
    // console.log(inventory);
    let present_quantity = 0;
    for (let i = 0; i < inventory.length; i++) {
      // console.log(inventory[i].productId + " " +req.params.id);
      if (inventory[i].productId == req.params.id) {
        present_quantity = inventory[i].quantity;
        break;
      }
    }
    // console.log(present_quantity);
    present_quantity = present_quantity + 1;
    // console.log(present_quantity);
    const { quantity } = req.body;
    console.log(quantity);
    if (quantity) {
      present_quantity = quantity;
    }
    const updatedqunatity = await Seller.findOneAndUpdate(
      { _id: req.user.id, "inventory.productId": req.params.id },
      { $set: { "inventory.$.quantity": present_quantity } }
    );
    // console.log(updatedqunatity);
    return res.status(201).json({ message: "updated quantity" });
  } catch (error) {
    // console.log(eror);
    console.error(error);
  }
});

//Decrementing items

router.post("/items/decrement/:id", Auth, async (req, res) => {
  try {
    const userInventory = await Seller.findOne({ _id: req.user.id });
    const inventory = userInventory.inventory;
    // console.log(inventory);
    let present_quantity = 0;
    for (let i = 0; i < inventory.length; i++) {
      // console.log(inventory[i].productId + " " +req.params.id);
      if (inventory[i].productId == req.params.id) {
        present_quantity = inventory[i].quantity;
        break;
      }
    }
    // console.log(present_quantity);
    if (present_quantity == 1) {
      const updatedSeller = await Seller.findOneAndUpdate(
        { _id: req.user.id }, // Find the seller by ID
        { $pull: { inventory: { productId: req.params.id } } },
        { new: true }
      );
      return res.status(201).json({ message: "Done" });
    }
    present_quantity = present_quantity - 1;
    // console.log(present_quantity);
    const updatedqunatity = await Seller.findOneAndUpdate(
      { _id: req.user.id, "inventory.productId": req.params.id },
      { $set: { "inventory.$.quantity": present_quantity } }
    );
    // console.log(updatedqunatity);
    return res.status(201).json({ message: "updated quantity" });
  } catch (error) {
    // console.log(eror);
    console.error(error);
  }
});

// Delete item

router.post("/items/delete/:id", Auth, async (req, res) => {
  try {
    const updatedSeller = await Seller.findOneAndUpdate(
      { _id: req.user.id }, // Find the seller by ID
      { $pull: { inventory: { productId: req.params.id } } },
      { new: true }
    );
    return res.status(201).json({ result: true });
  } catch (error) {}
});

module.exports = router;
