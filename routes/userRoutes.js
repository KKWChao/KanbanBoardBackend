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
  putUserQuery,
} = require("../queries/userQueries");
const { patchUpdateQueryGenerator } = require("../queries/taskQueries");

router.use(express.json());

const saltRounds = 10;

/* GET USERS (FOR TESTING ONLY) (COMMENT OUT WHEN IN PRODUCTION)  */
router.get("/", authJWT, (req, res) => {
  db.query(getAllUsersQuery, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: err,
      });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: data,
    });
  });
});

/* GET SINGLE USER */
router.get("/:id", (req, res) => {
  const userId = req.params.id;

  db.query(getSingleUserQuery, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: err,
      });
    }

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
  });
});

/* GET HASH */

/* POST USERS */
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const values = [uuid.v4(), email, hashedPassword];

    db.query(postUserQuery, values, (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error creating user",
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "User created successfully",
        data: data,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err,
    });
  }
});

/* PUT USERS */
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  db.query(putUserQuery, [email, password, userId], (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error updating user",
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: data,
    });
  });
});

/* PATCH USERS */
router.patch("/:id", (req, res) => {
  const userId = req.params.id;
  const { q, values } = patchUpdateQueryGenerator(req.body);
  values.push(userId);

  db.query(q, values, (err, data) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Error updating user",
        error: err,
      });
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: data,
    });
  });
});

/* DELETE USERS */
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  db.query(deleteUserQuery, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: data,
    });
  });
});

module.exports = router;
