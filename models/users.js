const { db } = require("../config/db");

const sqlUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    time_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

(async () => {
  try {
    await db.query(sqlUserTableQuery);
    console.log("User table created");
  } catch (err) {
    console.error(`Error creating user table: ${err}`);
  }
})();
