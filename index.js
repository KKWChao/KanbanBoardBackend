const express = require("express");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.json("ok");
});

app.get("/users", (req, res) => {
  const q = `SELECT * FROM users`;
  db.query(q, (err, data) => {
    if (err) return res.json("ERROR", err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
