const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const studentGradesController = require("../controllers/studentGradesController");

router.get("/", studentGradesController.getAllGrades);
router.post("/", urlencodedParser, studentGradesController.postGrades);
router.get("/:grade_id", studentGradesController.getGrades);
router.put("/:grade_id", urlencodedParser, studentGradesController.putGrades);
router.delete("/:grade_id",urlencodedParser,studentGradesController.removeGrades);
router.get("/getAvg/:class_id", studentGradesController.getAverageClassGrades);
router.post("/student/:student_id", urlencodedParser, studentGradesController.postStudentGrade)

module.exports = router;