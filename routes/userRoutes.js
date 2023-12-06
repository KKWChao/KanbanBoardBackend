const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uuid = require("uuid");

const {
  getAllUsersQuery,
  deleteUserQuery,
  getSingleUserQuery,
  postUserQuery,
} = require("../queries/userQueries");

router.use(express.json());

/* GET USERS (FOR TESTING ONLY) (COMMENT OUT WHEN IN PRODUCTION)  */
router.get("/", (req, res) => {
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

/* POST USERS */
router.post("/", (req, res) => {
  const { email, password } = req.body;
  const q = "INSERT INTO users (`id`, `email`, `password`) VALUES (?)";
  const values = [uuid.v4(), email, password];

  db.query(postUserQuery, [values], (err, data) => {
    if (err) return res.status(500).json("Error creating users: ", err);
    return res.status(200).json("User created");
  });
});

/* PUT USERS */
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  // const values = [req.body.email, req.body.password];
  const { email, password } = req.body;
  const q = "UPDATE users SET `email` = ?, `password` = ? WHERE id = ?";

  db.query(q, [email, password, userId], (err, data) => {
    if (err) return res.status(500).json("Error updating users: ", err);
    return res.status(200).json("User updated");
  });
});

/* DELETE USERS */
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  db.query(deleteUserQuery, [userId], (err, data) => {
    if (err) return res.status(500).json("Error deleting users: ", err);
    return res.status(200).json("User has been deleted");
  });
});

module.exports = router;
