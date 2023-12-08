const express = require("express");

// security config
const bcrypt = require("bcrypt");
const corsConfig = require("./config/corsConfig");
require("dotenv").config();

// import routes
const mapRoute = require("./routes/mapRoute");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Create tables if not in database
require("./models/users");
require("./models/tasks");

// Server setup
const app = express();
app.use(express.json());
app.use(corsConfig);

const PORT = process.env.PORT || 3333;

// Routes Map
app.get("/uri", mapRoute);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
