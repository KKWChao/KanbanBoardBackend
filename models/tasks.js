const db = require("../config/db");

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to db`);
  } else {
    const sqlTaskTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(255) NOT NULL,
        status INT DEFAULT 1,
        priority VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        sub VARCHAR(125),
        vote INT DEFAULT 0,
        FOREIGN KEY (userId) REFERENCES users(id)
    );`;

    db.query(sqlTaskTableQuery, (err, result) => {
      if (err) {
        console.log(`Error creating task table: ${err}`);
      } else {
        console.log(`Task table created`);
      }
    });
  }
});
