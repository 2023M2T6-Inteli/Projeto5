const registerModel = require("../models/registerModel");
const bcrypt = require('bcrypt');

async function postRegister(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;

  const registerData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  }
  const confirmPassword = req.body.confirmPassword;

  if(registerData.password !== confirmPassword) return res.status(401).send("Senha e confirmação de senha devem ser iguais.")

  const SALT = 10;
  const encryptedPassword = await bcrypt.hash(
    registerData.password,
    SALT
  );
  const result = await registerModel.postRegister(req.db, [
    registerData.name,
    registerData.email,
    encryptedPassword,
    registerData.phone
  ]);
  res.json(result);
}

module.exports = {
  postRegister,
};