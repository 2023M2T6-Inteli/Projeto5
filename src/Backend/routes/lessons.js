const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const lessonsController = require("../controllers/lessonsController");

router.get("/", lessonsController.getAllLessons);
router.post("/", urlencodedParser, lessonsController.postLessons);
router.get("/:lesson_id", lessonsController.getLessons);
router.put("/:lesson_id", urlencodedParser, lessonsController.putLessons);
router.delete("/:lesson_id", urlencodedParser, lessonsController.removeLessons);

module.exports = router;
