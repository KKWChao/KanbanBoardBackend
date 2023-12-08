const db = require("../config/db");

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to db`);
  } else {
    const sqlTaskTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        userId VARCHAR(255) NOT NULL,
        role VARCHAR(15),
        permissions VARCHAR(255) DEFAULT 'read'
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );`;

    db.query(sqlTaskTableQuery, (err, result) => {
      if (err) {
        console.log(`Error creating roles table: ${err}`);
      } else {
        console.log(`Roles table created`);
      }
    });
  }
});
