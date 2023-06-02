const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const classController = require("../controllers/classController");
const tokenValidation = require("../middlewares/tokenValidation");

router.post("/postClassByTeacherId", tokenValidation, urlencodedParser, classController.postClassByTeacherId);
router.get("/classByTeacherId", tokenValidation, classController.getClassesByTeacherId);
router.get("/teachers", classController.getTeachers);
router.get("/", classController.getAllClass);
router.post("/", urlencodedParser, classController.postClass);
router.get("/:class_id", classController.getClass);
router.put("/:class_id", urlencodedParser, classController.putClass);
router.delete("/:class_id", urlencodedParser, classController.removeClass);


module.exports = router;
