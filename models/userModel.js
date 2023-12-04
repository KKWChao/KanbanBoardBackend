const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const createUserTable = async () => {
  try {
    await db.execute(`
     CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
     )
    `);
  } catch (error) {
    console.error(`Error creating user table - ERROR: ${error}`);
    throw error;
  }
};

const User = {
  getByUsername: async (username) => {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM users WHERE username = ?`,
        [username]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error(`Error finding user by username - ERROR: ${error}`);
      throw error;
    }
  },

  createUser: async (username, password) => {
    try {
      const id = uuidv4();
      await db.execute(
        `INSERT INTO users (id, username, password) VALUES (?, ?, ?)`,
        [id, username, password]
      );
      return id;
    } catch (error) {
      console.error(`Error creating user - ERROR: ${error}`);
      throw error;
    }
  },
};

module.export = { User, createUserTable };
