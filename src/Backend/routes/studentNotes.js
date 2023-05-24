const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const studentNotesController = require("../controllers/studentNotesController");

router.get("/", studentNotesController.getAllStudentNotes);
router.post("/", urlencodedParser, studentNotesController.postStudentNotes);
router.get("/:studentNote_id", studentNotesController.getStudentNotes);
router.put(
  "/:studentNote_id",
  urlencodedParser,
  studentNotesController.putStudentNotes
);
router.delete("/:studentNote_id",urlencodedParser,studentNotesController.removeStudentNotes);

module.exports = router;
