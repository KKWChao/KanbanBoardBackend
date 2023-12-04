const db = require("../config/db");

const createTaskTable = async () => {
  const connection = await db.getConnection();

  try {
    await connection.execute(`
    CREATE TABLE IF NOT ESISTS taskDB (
      id VARCHAR() AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      status VARCHAR(30) NOT NULL,
      priority: VARCHAR(255),
      sub VARCHAR(255),
      vote INT,
      user_id VARCHAR(36),
      FOREIGN KEY (user_id) REFRENCES users(id) ON DELETE CASCADE
    )
    `);
  } catch (error) {
    console.error(`Error creating tasks table - ERROR: ${error}`);
    throw error;
  }
};

const Task = {
  get: async (userId) => {
    try {
      const [rows] = await db.execute(`SELECT * FROM tasks WHERE user_id = ?`, [
        userId,
      ]);
      return rows;
    } catch (error) {
      console.error(`Error fetching tasks - ERROR: ${error}`);
      throw error;
    }
  },

  create: async (task) => {
    try {
      await db.execute(`INSERT INTO tasks SET ?`, task);
    } catch (error) {
      console.error(`Error creating task - ERROR: ${error}`);
      throw error;
    }
  },
};

module.exports = { Task, createTaskTable };
