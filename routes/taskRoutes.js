const express = require("express");
const { Task, createTasksTable } = require("../models/taskModel");
const { User } = require("../models/userModel");

const router = express.Router();

// Create tasks table on startup
createTasksTable().then(() => {
  console.log("Task table created");
});

router.post("/tasks", async (req, res) => {
  const { title, status, priority, sub, vote, username } = req.body;

  try {
    // find by username
    const user = await User.getByUsername(username);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(`Error creating task - ERROR: ${error}`);
    throw error;
  }
});
