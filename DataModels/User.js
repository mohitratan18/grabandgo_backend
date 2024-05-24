const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneno: {
    type: String,
    unique: true,
  },
  address:{
    type:String,
  },
  coord:{
    type:String,
  },
  list: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    },
  ],
});
const User = new mongoose.model("User", user);
module.exports = User;
