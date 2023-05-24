const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const teacherController = require("../controllers/teacherController");

router.get("/", teacherController.getAllTeachers);
router.post("/", urlencodedParser, teacherController.postTeachers);
router.get("/:teacher_id", teacherController.getTeachers);
router.put("/:teacher_id", urlencodedParser, teacherController.putTeachers);
router.delete("/:teacher_id",urlencodedParser,teacherController.removeTeachers);

module.exports = router;
