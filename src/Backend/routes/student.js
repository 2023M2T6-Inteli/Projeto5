const express = require("express");
const bodyParser = require("body-parser");
const tokenValidation = require("../middlewares/tokenValidation")
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const studentController = require("../controllers/studentController");

router.get("/class/:class_id", tokenValidation, urlencodedParser, studentController.getStudentByClassId)
router.get("/:student_id", studentController.getStudent);
router.get("/", studentController.getAllStudent);
router.post("/", urlencodedParser, studentController.postStudent);
router.put("/:student_id", urlencodedParser, studentController.putStudent);
router.delete("/:student_id",urlencodedParser,studentController.removeStudent);

module.exports = router;
