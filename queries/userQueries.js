const getAllUsersQuery = `SELECT * FROM users`;

const getSingleUserQuery = `SELECT * FROM users WHERE id = ?`;

const postUserQuery = `
  INSERT INTO users (id, email, password) 
  VALUES (?, ?, ?);
`;

const putUserQuery = `UPDATE users SET email = ?, password = ? WHERE id = ?`;

const patchUserQuery = (body) => {
  const { email, password } = body;
  const qClause = [];
  const values = [];

  if (email !== undefined) {
    qClause.push("`email` = ?");
    values.push(email);
  }
  if (password !== undefined) {
    qClause.push("`password` = ?");
    values.push(password);
  }

  return {
    query: `UPDATE users SET ${qClause.join(", ")} WHERE id = ?`,
    values: values,
  };
};

const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
module.exports = {
  getAllUsersQuery,
  getSingleUserQuery,
  postUserQuery,
  putUserQuery,
  deleteUserQuery,
};
