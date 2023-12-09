const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require("../config/db");
const {
  getAllUsersQuery,
  deleteUserQuery,
  getSingleUserQuery,
  postUserQuery,
  putUserQuery,
} = require("../queries/userQueries");

const saltRounds = 10;

/* GET ALL USERS (FOR TESTING ONLY) (COMMENT OUT WHEN IN PRODUCTION)  */
const getAllUsers = async (req, res) => {
  try {
    const [data] = await db.query(getAllUsersQuery);
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err,
    });
  }
};

const getOneUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [data] = await db.query(getSingleUserQuery, [userId]);
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err,
    });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const values = [uuid.v4(), email, hashedPassword];

    const [data] = await db.query(postUserQuery, values);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: data,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Error creating user. Email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [data] = await db.query(putUserQuery, [
      email,
      hashedPassword,
      userId,
    ]);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: err,
    });
  }
};

const updatePatchUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { q, values } = await patchUserQueryGenerator({
      email: req.body.email,
      hashedPassword,
    });
    values.push(userId);

    const [data] = await db.query(q, values);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: err,
    });
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [data] = await db.query(deleteUserQuery, [userId]);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err,
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  updatePatchUser,
  deleteUser,
};
