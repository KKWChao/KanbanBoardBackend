const db = require("../config/db");

db.connect(function (err) {
  if (err) {
    console.log(`Error connecting to db`);
  } else {
    const sqlUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );`;

    db.query(sqlUserTableQuery, (err, result) => {
      if (err) {
        console.log(`Error creating user table: ${err}`);
      } else {
        console.log(`User table created`);
      }
    });
  }
});
