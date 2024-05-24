const express = require("express");
const User = require("../../DataModels/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("../../Middlewares/Auth");
const { default: mongoose } = require("mongoose");
const Seller = require("../../DataModels/Seller");
const secret = "life gives you what you need not what you want";

// functions to calculate distance

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Calculate the differences between the coordinates
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  // Apply the Haversine formula
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = R * c 

  return distance; // Distance in kilometers
}

// Fetch User details

router.post("/details", Auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/additems/list", Auth, async (req, res) => {
  const userId = req.user.id;
  const { productID } = req.body;
  console.log(productID);
  try {
    const usercheck = await User.findOne({ _id: userId });
    // console.log(usercheck);
    const list = usercheck.list;
    console.log(list);
    let flag = false;
    // console.log(flag);
    for (let i = 0; i < list.length; i++) {
      console.log(list[i].productId + " " + productID);
      if (list[i].productId == productID) {
        flag = true;
        break;
      }
    }
    console.log(flag);
    if (flag) {
      return res.status(201).json({ message: "Product already added" });
    } else {
      const obj = {
        productId: req.body.productID,
      };
      const check = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { list: obj } },
        { new: true }
      );
      return res.status(201).json({ message: "product added" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchlist", Auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ _id: userId });
    const list = user.list;
    return res.status(201).json(list);
  } catch (error) {
    console.log(error);
  }
});

// update address abd cords
router.post("/update/address", Auth, async (req, res) => {
  console.log(req.user.id);
  const { address, coord } = req.body;
  console.log(coord);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { address, coord }
    );
    console.log(user);
    return res.status(201).json({ message: "Updated Successfuly" });
  } catch (error) {
    console.log(error);
  }
});

// update account details
router.post("/update/account", Auth, async (req, res) => {
  const { name, phoneno, email } = req.body;
  try {
    if (name) {
      const user = await User.findOneAndUpdate({ _id: req.user.id }, { name });
    }
    if (phoneno) {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { phoneno }
      );
    }
    if (email) {
      const user = await User.findOneAndUpdate({ _id: req.user.id }, { email });
    }
    return res.status(201).json({ message: "updated succesfully" });
  } catch (error) {}
});

// get nearby shops

router.get("/findstore/:id", Auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const coords = user.coord.split(",");

    const lat = parseFloat(coords[0]);
    const lng = parseFloat(coords[1]);
    // console.log("user coords : ", lat, " ", lng);
    const shops = await Seller.find({ "inventory.productId": req.params.id });
    // console.log(shops);
    let list = [];
    for (let i = 0; i < shops.length; i++) {
      // console.log(shops[i].coord);
      let scoords = shops[i].coord.split(",");
      let slat = parseFloat(scoords[0]);
      let slng = parseFloat(scoords[1]);
      // console.log(slat, " ", slng);
      const distance = haversine(lat, lng, slat, slng);
      const temp = {
        distance:  distance.toFixed(2),
        coord: shops[i].coord,
        name: shops[i].shopName,
      };
      list.push(temp);
    }
    list.sort((a,b)=>a.distance - b.distance);
    return res.status(201).json(list);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
