const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
router.use(express.json());

/* GET TASKS */
router.get("/", taskController.getTasks);

/* CREATE TASKS */
router.post("/", taskController.createTask);

/* UPDATE TASKS */
router.put("/:id", taskController.updateTask);
router.patch("/:id", taskController.updatePatchTask);

/* DELETE TASKS */
router.delete("/:id", taskController.deleteTask);

module.exports = router;
