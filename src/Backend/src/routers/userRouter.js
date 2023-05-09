const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { signIn, signUp } = require("../controllers/userController.js");
const { Router } = require("express");

const router = Router();

router.post("/sign-up", urlencodedParser, signUp);
router.post("/sign-in", urlencodedParser, signIn);

module.exports = router;
