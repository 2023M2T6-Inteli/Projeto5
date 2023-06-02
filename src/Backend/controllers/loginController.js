const bcrypt = require("bcrypt")
const loginModel = require("../models/loginModel");
const jwt = require('jsonwebtoken');

async function postLogin(req, res) {
  res.statusCode = 200;

  const authData = {
    email: req.body.email,
    password: req.body.password
  }
  
  const user = await loginModel.getUserByEmail(req.db,authData.email);
  console.log(user)
   if (user[0] && !(await bcrypt.compare(authData.password, user[0].password))) {
     return res.status(401).send("Email e/ou senha incorretos.")
   }

  const secretKey = String(process.env.JWT_SECRET);
  const token = user ? jwt.sign({ id: user[0].id }, secretKey) : "";
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(token);
}

module.exports = {
  postLogin,
};