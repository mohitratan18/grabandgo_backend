const jwt = require("jsonwebtoken");
const secret = "life gives you what you need not what you want";
const verifyJWT = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "please authenticate your auth-token" });
  } else {
    try {
      const data = jwt.verify(token, secret);
      req.user = data.user;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("there is an please try again");
    }
  }
};
module.exports = verifyJWT;
