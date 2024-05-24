const connectDB = require("./Database");
connectDB();
const express = require("express");

const router = express.Router();
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/auth/user", require("./Routes/Auth/UserAuth"));
app.use("/api/auth/seller", require("./Routes/Auth/SellerAuth"));
app.use("/api/sellerfunctions", require("./Routes/Seller/SellerFunctions"));
app.use("/api/adminfunctions", require("./Routes/Admin/Adminfunctions"));
app.use("/api/userfunctions", require("./Routes/User/UserFunctions"));


app.listen(8000, () => {
  console.log("running at port 8000");
});
module.exports = router;
