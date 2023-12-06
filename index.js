const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

// Create tables if not in database
require("./models/users");
require("./models/tasks");

// Server setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Routes Map
app.get("/uri", (req, res) => {
  res.status(200).json({
    status: "ok",
    taskRoutes: {
      GET: `${process.env.URL}/api/tasks`,
      POST: `${process.env.URL}/api/tasks`,
      PUT: `${process.env.URL}/api/tasks/:id`,
      DELETE: `${process.env.URL}/api/tasks/:id`,
    },
    userRoutes: { GET: "test", POST: "test", PUT: "test", DELETE: "test" },
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
