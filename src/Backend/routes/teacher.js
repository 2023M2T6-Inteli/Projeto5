const express = require('express');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const controller = require("../controllers/teacherController")

router.get("/", controller.getAll)
router.post("/", urlencodedParser,controller.post);
router.get("/:teacher_id", controller.get);
router.put("/:teacher_id", urlencodedParser, controller.put);
router.delete("/:teacher_id", urlencodedParser, controller.remove);


module.exports = router;