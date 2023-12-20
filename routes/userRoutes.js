const express = require("express");
const userController = require("../controllers/userController");
const authJWT = require("../middleware/authJWT");
const router = express.Router();
router.use(express.json());

// router.use(authJWT);

/* GET USERS */
router.get("/", authJWT, userController.getAllUsers);
router.get("/:id", authJWT, userController.getOneUser);

/* CREATE USERS - possibly remove option */
router.post("/", userController.createUser);

/* UPDATE USERS */
router.put("/:id", authJWT, userController.updateUser);
router.patch("/:id", authJWT, userController.updatePatchUser);

/* DELETE USERS */
router.delete("/:id", authJWT, userController.deleteUser);

module.exports = router;
