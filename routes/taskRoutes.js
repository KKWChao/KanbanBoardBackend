const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uuid = require("uuid");
const {
  getAllTasksQuery,
  postTasksQuery,
  deleteTasksQuery,
  putTasksQuery,
  patchUpdateQueryGenerator,
} = require("../queries/taskQueries");

router.use(express.json());

/* GET TASKS */
router.get("/", (req, res) => {
  db.query(getAllTasksQuery, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error fetching tasks",
        error: err,
      });
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: data,
    });
  });
});

/* POST TASKS */
router.post("/", (req, res) => {
  const { userId, status, priority, title, sub, vote } = req.body;
  const values = [uuid.v4(), userId, status, priority, title, sub, vote];

  db.query(postTasksQuery, values, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error creating tasks",
        error: err,
      });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: data,
    });
  });
});

/* PUT TASKS */
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const { status, priority, title, sub, vote } = req.body;
  const values = [status, priority, title, sub, vote, taskId];

  db.query(putTasksQuery, values, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error updating tasks",
        error: err,
      });

    return res.status(200).json({
      success: true,
      message: "Tasks updated successfully",
      data: data,
    });
  });
});

/* PATCH TASK - smaller updates */
router.patch("/:id", (req, res) => {
  const taskId = req.params.id;
  const { q, values } = patchUpdateQueryGenerator(req.body);
  values.push(taskId);

  db.query(q, values, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error updating tasks",
        error: err,
      });
    return res.status(200).json({
      success: true,
      message: "Tasks updated successfully",
      data: data,
    });
  });
});

/* DELETE TASKS */
router.delete("/:id", (req, res) => {
  db.query(deleteTasksQuery, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error deleting tasks",
        error: err,
      });
    return res.status(200).json({
      success: true,
      message: "Tasks deleted successfully",
      data: data,
    });
  });
});

module.exports = router;
