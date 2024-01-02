const { db } = require("../config/db");

const sqlTaskTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255), 
    title VARCHAR(255) NOT NULL,
    status VARCHAR(1) NOT NULL,
    priority VARCHAR(3) NOT NULL,
    sub VARCHAR(5) NOT NULL,
    vote INT NOT NULL DEFAULT 0,
    time_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);
`;

(async () => {
  try {
    await db.query(sqlTaskTableQuery);
    console.log("Task table created");
  } catch (err) {
    console.error(`Error creating task table: ${err}`);
  }
})();
