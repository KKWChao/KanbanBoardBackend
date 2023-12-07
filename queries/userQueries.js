const getAllUsersQuery = `SELECT * FROM users`;

const getSingleUserQuery = `SELECT * FROM users WHERE id = ?`;

const postUserQuery = `
  INSERT INTO users (id, email, password) 
  VALUES (?, ?, ?);
`;

const putUserQuery = `UPDATE users SET email = ?, password = ? WHERE id = ?`;

const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
module.exports = {
  getAllUsersQuery,
  getSingleUserQuery,
  postUserQuery,
  putUserQuery,
  deleteUserQuery,
};
