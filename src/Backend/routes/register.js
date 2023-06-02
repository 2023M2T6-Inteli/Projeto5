const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const router = express.Router();

const registerController = require("../controllers/registerController");

router.post("/", urlencodedParser, registerController.postRegister);

module.exports = router;