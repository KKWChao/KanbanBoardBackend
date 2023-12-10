const getAllTasksQuery = `SELECT * FROM tasks`;

const getUserTasksQuery = `SELECT * FROM tasks WHERE userId = ?`;

const postTasksQuery = `
  INSERT INTO tasks
  (id, userId, status, priority, title, sub, vote)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

const putTasksQuery = `
  UPDATE tasks
  SET status = ?, priority = ?, title = ?, sub = ?, vote = ?
  WHERE id = ? AND userId = ?
`;

const patchTaskQueryGenerator = async (body) => {
  const { status, priority, title, sub, vote } = body;

  const qClause = [];
  const values = [];

  if (status !== undefined) {
    qClause.push("`status` = ?");
    values.push(status);
  }

  if (priority !== undefined) {
    qClause.push("`priority` = ?");
    values.push(priority);
  }

  if (title !== undefined) {
    qClause.push("`title` = ?");
    values.push(title);
  }

  if (sub !== undefined) {
    qClause.push("`sub` = ?");
    values.push(sub);
  }

  if (vote !== undefined) {
    qClause.push("`vote` = ?");
    values.push(vote);
  }

  const q = `
    UPDATE tasks 
    SET ${qClause.join(", ")}
    WHERE id = ? AND userId = ?`;

  return {
    q,
    values,
  };
};

const deleteTasksQuery = `DELETE FROM tasks WHERE id = ? AND userId = ?`;

module.exports = {
  getAllTasksQuery,
  getUserTasksQuery,
  postTasksQuery,
  putTasksQuery,
  patchTaskQueryGenerator,
  deleteTasksQuery,
};
