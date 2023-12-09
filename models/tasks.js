const db = require("../config/db");

const sqlTaskTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(255) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    userId VARCHAR(255), 
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`;

(async () => {
  try {
    const result = await db.query(sqlTaskTableQuery);
    console.log("Task table created");
  } catch (err) {
    console.error(`Error creating task table: ${err}`);
  }
})();
