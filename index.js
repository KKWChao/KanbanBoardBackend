const express = require("express");
const mysql = require("mysql2");

const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// Create tables if not in database
require("./models/users");
require("./models/tasks");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  res.json("ok");
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
