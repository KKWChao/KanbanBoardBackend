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
  WHERE id = ?
`;

const patchTaskQueryGenerator = (body) => {
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

  return {
    query: `UPDATE tasks SET ${qClause.join(", ")} WHERE id = ?`,
    values: values,
  };
};

const deleteTasksQuery = `DELETE FROM tasks WHERE id = ?`;

module.exports = {
  getAllTasksQuery,
  getUserTasksQuery,
  postTasksQuery,
  putTasksQuery,
  patchTaskQueryGenerator,
  deleteTasksQuery,
};
