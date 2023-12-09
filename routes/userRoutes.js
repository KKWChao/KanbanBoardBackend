const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../config/db");
const uuid = require("uuid");
const authJWT = require("../middleware/authJWT");

const {
  getAllUsersQuery,
  deleteUserQuery,
  getSingleUserQuery,
  postUserQuery,
  patchUserQueryGenerator,
  putUserQuery,
} = require("../queries/userQueries");

router.use(express.json());

const saltRounds = 10;

/* GET USERS (FOR TESTING ONLY) (COMMENT OUT WHEN IN PRODUCTION)  */
router.get("/", async (req, res) => {
  try {
    const [data, fields] = await db.query(getAllUsersQuery);
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err,
    });
  }
});

/* GET SINGLE USER */
router.get("/:id", async (req, res) => {
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
});

/* POST USERS */
router.post("/", async (req, res) => {
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
});

/* PUT USERS */
router.put("/:id", async (req, res) => {
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
});

/* PATCH USERS */
router.patch("/:id", async (req, res) => {
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
});

/* DELETE USERS */
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
