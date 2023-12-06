const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Create tables if not in database
require("./models/users");
require("./models/tasks");

// Server setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Routes
app.get("/test", (req, res) => {
  res.json("ok");
});
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
