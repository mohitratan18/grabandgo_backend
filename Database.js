const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/grabandgo", {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
