const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const studentGradesController = require("../controllers/studentGradesController");

router.get("/student/:student_id", studentGradesController.getStudentGrades);
router.get("/", studentGradesController.getAllGrades);
router.get("/:grade_id", studentGradesController.getGrades);
router.get("/getAvg/:class_id", studentGradesController.getAverageClassGrades);
router.put("/:grade_id", urlencodedParser, studentGradesController.putGrades);
router.delete(
    "/:grade_id",
    urlencodedParser,
    studentGradesController.removeGrades
);
router.post("/", urlencodedParser, studentGradesController.postGrades);
router.post(
    "/student/:student_id",
    urlencodedParser,
    studentGradesController.postStudentGrade
);
router.post(
    "/class/:class_id",
    urlencodedParser,
    studentGradesController.postClassGrade
);

module.exports = router;
