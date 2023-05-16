const express = require('express');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const controller = require("../controllers/studentController")

router.get("/", controller.getAll)
router.post("/", urlencodedParser,controller.post);
router.get("/:student_id", controller.get);
router.put("/:student_id", urlencodedParser, controller.put);
router.delete("/:student_id", urlencodedParser, controller.remove);


module.exports = router;