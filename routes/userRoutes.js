const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uuid = require("uuid");

const app = express();
app.use(express.json());

router.get("/users", (req, res) => {
  const q = `SELECT * FROM users`;
  db.query(q, (err, data) => {
    if (err) return res.json("ERROR", err);
    return res.json(data);
  });
});

router.post("/users", (req, res) => {
  const { email, password } = req.body;
  const q = "INSERT INTO users (`id`, `email`, `password`) VALUES (?)";
  const values = [uuid.v4(), email, password];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("User created");
  });
});

router.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  // const values = [req.body.email, req.body.password];
  const { email, password } = req.body;
  const q = "UPDATE users SET `email` = ?, `password` = ? WHERE id = ?";

  db.query(q, [email, password, userId], (err, data) => {
    if (err) return res.json(err);
    return res.json("User updated");
  });
});

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been deleted");
  });
});

module.exports = router;
