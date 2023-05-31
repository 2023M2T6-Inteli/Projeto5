const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const tokenValidation = require("../middlewares/tokenValidation");

const teacherController = require("../controllers/teacherController");

router.get("/", tokenValidation, teacherController.getAllTeachers);
router.post("/", tokenValidation, urlencodedParser, teacherController.postTeachers);
router.get("/:teacher_id", tokenValidation, teacherController.getTeachers);
router.put("/:teacher_id", tokenValidation, urlencodedParser, teacherController.putTeachers);
router.delete("/:teacher_id", tokenValidation, urlencodedParser, teacherController.removeTeachers);

module.exports = router;
