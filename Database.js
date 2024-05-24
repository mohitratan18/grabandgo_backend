const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://mohitratan2003:mohitratan6317@cluster0.jzlaenv.mongodb.net/GG?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
      }
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
