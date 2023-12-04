const mysql2 = require("mysql2");
const dbConfig = require("./dbConfig");

// Creating connection
const connection = mysql2.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
});

// Connection to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log(
    `Successfully connected to the db: ${connection.config.database} on Port: ${connection.config.port}`
  );
});

module.export = connection;
