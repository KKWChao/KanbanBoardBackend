const db = require("../config/db");

const sqlUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

(async () => {
  try {
    const result = await db.query(sqlUserTableQuery);
    console.log("User table created");
  } catch (err) {
    console.error(`Error creating user table: ${err}`);
  }
})();
