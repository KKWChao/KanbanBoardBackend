const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uuid = require("uuid");

const app = express();
app.use(express.json());

/* GET TASKS */
router.get("/", (req, res) => {
  const q = `SELECT * FROM tasks`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json("Error fetching tasks: ", err);
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
  const q =
    "INSERT INTO tasks (`id`, `userId`, `status`, `priority`, `title`, `sub`, `vote`) VALUES (?)";
  const values = [uuid.v4(), userId, status, priority, title, sub, vote];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json("Error creating tasks: ", err);

    const createdTask = {
      id: taskId,
      userId,
      status,
      priority,
      title,
      sub,
      vote,
    };

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: createdTask,
    });
  });
});

/* PUT TASKS */
router.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const { status, priority, title, sub, vote } = req.body;
  const q =
    "UPDATE tasks SET `status` = ?, `priority` = ?, `title` = ?, `sub` = ?, `vote` = ? WHERE id = ?";
  const values = [status, priority, title, sub, vote];

  db.query(q, [...values, taskId], (err, data) => {
    if (err) return res.status(500).json("Error updaing tasks: ", err);

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
  const { status, priority, title, sub, vote } = req.body;

  // creating sql queries based on body request
  const qClause = [];
  const values = [];

  if (status !== undefined) {
    qClause.push("`status` = ?");
    values.push(status);
  }

  if (priority !== undefined) {
    qClause.push("`priority` = ?");
    values.push(priority);
  }

  if (title !== undefined) {
    qClause.push("`title` = ?");
    values.push(title);
  }

  if (sub !== undefined) {
    qClause.push("`sub` = ?");
    values.push(sub);
  }

  if (vote !== undefined) {
    qClause.push("`vote` = ?");
    values.push(vote);
  }

  const q = `UPDATE tasks SET ${qClause.join(", ")} WHERE id = ?`;
  values.push(taskId);

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json("Error updating task: ", err);
    return res.status(200).json(data);
  });
});

/* DELETE TASKS */
router.delete("//:id", (req, res) => {
  const q = `DELETE FROM tasks WHERE id = ?`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json("Error fetching tasks: ", err);
    return res.status(200).json(data);
  });
});

module.exports = router;
