const express = require("express");
const userController = require("../controllers/userController");
const authJWT = require("../middleware/authJWT");
const router = express.Router();
router.use(express.json());

router.use(authJWT);

/* GET USERS */
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);

/* CREATE USERS - possibly remove option */
router.post("/", userController.createUser);

/* UPDATE USERS */
router.put("/:id", userController.updateUser);
router.patch("/:id", userController.updatePatchUser);

/* DELETE USERS */
router.delete("/:id", userController.deleteUser);

module.exports = router;
