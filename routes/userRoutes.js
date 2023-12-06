const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uuid = require("uuid");

const app = express();
app.use(express.json());

/* GET USERS (FOR TESTING ONLY) (COMMENT OUT WHEN IN PRODUCTION)  */
router.get("/", (req, res) => {
  const q = `SELECT * FROM users`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json("Error fetching users: ", err);
    return res.status(200).json(data);
  });
});

/* POST USERS */
router.post("/", (req, res) => {
  const { email, password } = req.body;
  const q = "INSERT INTO users (`id`, `email`, `password`) VALUES (?)";
  const values = [uuid.v4(), email, password];

  db.query(q, [values], (err, data) => {
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
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json("Error deleting users: ", err);
    return res.status(200).json("User has been deleted");
  });
});

module.exports = router;
