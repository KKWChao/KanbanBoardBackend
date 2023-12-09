const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authJWT = require("../middleware/authJWT");

router.use(express.json());
router.use(authJWT);

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
