const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dbConfig = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

console.log(dbConfig);

// test db connection
// const testDbConnection = async () => {
//   try {
//     // connection
//     const connection = await mysql.createConnection(dbConfig);
//     console.log(`Database Connected to: ${connection.config.database}`);
//   } catch (error) {
//     console.error(`Error connection to database: ${error}`);
//   }
// };
// testDbConnection();

// test basic route
app.use("/", (req, res) => {
  res.json({ message: "Testing" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
