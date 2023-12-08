const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/db");
const authenticateJWT = require("../middleware/authJWT");
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
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const storedHash = data[0]?.password;

      bcrypt.compare(password, storedHash, (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, error: "Internal server error" });
        } else if (result) {
          /* if successful return jwt token */
          const userId = data[0]?.id;
          const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
          });
        } else {
          res.status(401).json({
            sucess: false,
            error: "Invalid username or password",
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", (req, res) => {
  // Logout logic if needed
  res.status(200).json({ success: true, message: "Logout successful" });
});

// testing jwt delete after
router.get("/protected-route", authenticateJWT, (req, res) => {
  const userId = req.user.userId;
  res
    .status(200)
    .json({ success: true, message: "Protected route accessed", userId });
});

router.post("/register", (req, res) => {});

module.exports = router;
