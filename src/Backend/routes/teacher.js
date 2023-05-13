const express = require('express')
const router = express.Router();

const controller = require("../controllers/teacherController")

router.get("/", controller.getAll)
router.post("/", controller.post);
router.get("/:teacher_id", controller.get);
router.put("/:teacher_id", controller.put);
router.delete("/:teacher_id", controller.delete);


module.exports = router;