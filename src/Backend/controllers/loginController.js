const bcrypt = require("bcrypt")
const loginModel = require("../models/loginModel");

async function postLogin(req, res) {
  res.statusCode = 200;

  const authData = {
    email: req.body.email,
    password: req.body.password
  }
  
  const user = await loginModel.getUserByEmail(db,authData.email);

   if (!(await bcrypt.compare(authData.password, user.password))) {
     return res.status(401).send("Email e/ou senha incorretos.")
   }

  const secretKey = String(process.env.JWT_SECRET);
  const token = user ? jwt.sign({ id: user.id }, secretKey) : "";
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(token);
}

module.exports = {
  postLogin,
};