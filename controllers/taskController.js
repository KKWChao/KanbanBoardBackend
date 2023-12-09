const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require("../config/db");
const {
  postTasksQuery,
  deleteTasksQuery,
  putTasksQuery,
  patchTaskQueryGenerator,
  getUserTasksQuery,
} = require("../queries/taskQueries");

/* USING TOKEN TO GET USER ID/EMAIL */

const getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [data] = await db.query(getUserTasksQuery, [userId]);

    return res.status(200).json({
      success: true,
      message: "User tasks fetched successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user tasks",
      error: err,
    });
  }
};

const createTask = async (req, res) => {
  const userId = req.user.userId;
  const { status, priority, title, sub, vote } = req.body;
  const values = [uuid.v4(), userId, status, priority, title, sub, vote];

  try {
    const [data] = await db.query(postTasksQuery, values);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating tasks",
      error: err,
    });
  }
};

const updateTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;
  const { status, priority, title, sub, vote } = req.body;
  const values = [status, priority, title, sub, vote, taskId, userId];

  try {
    const [data] = await db.query(putTasksQuery, values);

    return res.status(200).json({
      success: true,
      message: "Tasks updated successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating tasks",
      error: err,
    });
  }
};

const updatePatchTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const { q, values } = await patchTaskQueryGenerator(req.body);
    values.push(taskId, userId);
    const [data] = await db.query(q, values);

    return res.status(200).json({
      success: true,
      message: "Tasks updated successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating tasks",
      error: err,
    });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  try {
    const [data] = await db.query(deleteTasksQuery, [taskId, userId]);

    return res.status(200).json({
      success: true,
      message: "Tasks deleted successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting tasks",
      error: err,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  updatePatchTask,
  deleteTask,
};
