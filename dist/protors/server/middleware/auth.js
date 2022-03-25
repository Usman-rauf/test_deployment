const jwt = require('jsonwebtoken')
const config = require("../config")

const verifyToken = (req, res, next) => {


  const token = req.headers['authorization']

  if (!token) {
    return res.status(404).json("Token Not Found")
  }

  try {
    const decodeToken = jwt.verify(token, config.JWT_SECRET)
    req.user = decodeToken
  }
  catch (error) {
    return res.status(403).json({ error: "Token Expired", message: "Kindly Login Again" })
  }

  return next();
};


module.exports = verifyToken;
