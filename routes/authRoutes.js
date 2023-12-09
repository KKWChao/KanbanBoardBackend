const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.use(express.json());

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/register", userController.createUser);

module.exports = router;
