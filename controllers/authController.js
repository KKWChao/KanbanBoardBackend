const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../config/db");
const { loginQuery } = require("../queries/authQueries");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // searching for email in db
    const [data] = await db.query(loginQuery, [email]);

    // If no user exists
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const storedHash = data[0].password;

    bcrypt.compare(password, storedHash, (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: "Internal server error",
        });
      } else if (result) {
        const user = {
          userId: data[0]?.id,
          email: data[0]?.email,
        };

        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({
          success: true,
          message: "Login successful",
          userId: user.userId,
          token: token,
        });
      } else {
        res.status(401).json({
          sucess: false,
          message: "ERR_PW",
          error: "Invalid username or password",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err,
    });
  }
};

const logout = async (req, res) => {
  // Logout logic if needed
  res.status(200).json({ success: true, message: "Logout successful" });
};

const register = async (req, res) => {};

module.exports = {
  login,
  logout,
  register,
};
