const express = require("express");
const cors = require("cors");
const mapRoute = require("./routes/mapRoute");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const bcrypt = require("bcrypt");

// Create tables if not in database
require("./models/users");
require("./models/tasks");

// Server setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3333;

// Routes Map
app.get("/uri", mapRoute);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/auth", authRoutes);

/* TESTING BCRYPT VERIFICATION */
app.get("/", (req, res) => {
  res.json("verifying bcrypt");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
