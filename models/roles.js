const { db } = require("../config/db");

const sqlRoleTableQuery = `
  CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    permissions INT NOT NULL DEFAULT 0, 
    time_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`;

(async () => {
  try {
    await db.query(sqlRoleTableQuery);
    console.log(`Role tables created`);
  } catch (err) {
    console.error(`Error creating roles table: ${err}`);
  }
})();
