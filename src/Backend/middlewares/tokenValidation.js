
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenValidation(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization?.replace("Bearer", "").trim();
    const secretKey = process.env.JWT_SECRET || "";

    if(!authorization) {
      return res.status(401).send("Envie um token");
    }

    const returnJWT = jwt.verify(token, secretKey);
    
    res.locals.returnJwtVerify = returnJWT;
    next();
  } catch(error) {
    return res.status(401).send("Token inválido.")
  }
}
module.exports = tokenValidation
