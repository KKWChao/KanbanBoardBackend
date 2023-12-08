const loginQuery = `SELECT * FROM users WHERE email = ?`;

module.exports = { loginQuery };
