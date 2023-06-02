const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const loginController = require("../controllers/loginController");

router.post("/", urlencodedParser, loginController.postLogin);

module.exports = router;
