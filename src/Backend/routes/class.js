const express = require('express');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const controller = require("../controllers/classController")



router.get("/teachers", controller.getTeachers);
router.get("/", controller.getAll)
router.post("/", urlencodedParser,controller.post);
router.get("/:class_id", controller.get);
router.put("/:class_id", urlencodedParser, controller.put);
router.delete("/:class_id", urlencodedParser, controller.remove);



module.exports = router;