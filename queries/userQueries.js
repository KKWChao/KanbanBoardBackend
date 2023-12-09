const getAllUsersQuery = `SELECT * FROM users`;

const getSingleUserQuery = `SELECT * FROM users WHERE id = ?`;

const postUserQuery = `
  INSERT INTO users (id, email, password) 
  VALUES (?, ?, ?);
`;

const putUserQuery = `UPDATE users SET email = ?, password = ? WHERE id = ?`;

const patchUserQueryGenerator = async (body) => {
  const { email, hashedPassword } = body;
  const qClause = [];
  const values = [];

  if (email !== undefined) {
    qClause.push("`email` = ?");
    values.push(email);
  }
  if (hashedPassword !== undefined) {
    qClause.push("`password` = ?");
    values.push(hashedPassword);
  }
  if (qClause.length === 0) {
    // No fields to update, return early
    throw new Error("No fields to update");
  }

  const q = `UPDATE users SET ${qClause.join(", ")} WHERE id = ?`;

  return {
    q,
    values,
  };
};

const deleteUserQuery = `DELETE FROM users WHERE id = ?`;
module.exports = {
  getAllUsersQuery,
  getSingleUserQuery,
  postUserQuery,
  putUserQuery,
  patchUserQueryGenerator,
  deleteUserQuery,
};
