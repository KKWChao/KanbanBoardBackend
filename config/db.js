const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PW,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// };

// const db = mysql.createPool(dbConfig);

const initializeDatabase = async () => {
  try {
    const connection = await db.getConnection();
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await connection.query(`USE ${process.env.DB_NAME}`);
    await connection.release();

    dbConfig.database = process.env.DB_NAME;

    console.log("Database initialized.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

module.exports = { db, initializeDatabase };
