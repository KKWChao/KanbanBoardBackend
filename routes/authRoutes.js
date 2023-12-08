const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../config/db");
const { loginQuery } = require("../queries/authQueries");

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    /* find email */
    db.query(loginQuery, [email], (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error fetching user",
          error: err,
        });
      }

      if (data.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const storedHash = data[0]?.password;

      bcrypt.compare(password, storedHash, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else if (result) {
          /* if successful return jwt token */
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ error: "Invalid username or password" });
        }
      });
    });

    /* else return user not found */
  } catch (err) {
    console.log(err);
  }
});
router.post("/logout", (req, res) => {});
router.post("/register", (req, res) => {});

module.exports = router;
