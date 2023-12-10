const express = require("express");

// security config
const corsConfig = require("./config/corsConfig");
require("dotenv").config();

// import routes
const mapRoute = require("./routes/mapRoute");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Database config
// const { initializeDatabase } = require("./config/db");
require("./models/users");
require("./models/tasks");
require("./models/roles");
// (async () => {
//   try {
//     await initializeDatabase();

//     console.log("Database initialized successfully.");
//   } catch (error) {
//     console.error("Error initializing the database:", error);
//     process.exit(1);
//   }
// })();

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
