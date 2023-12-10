const express = require("express");
const router = express.Router();
router.use(express.json());

/* SETUP URI MAP FOR LEGIBILITY */
router.get("/uri", (req, res) => {
  res.status(200).json({
    status: "ok",
    taskRoutes: {
      GET: `${process.env.URL}/api/tasks`,
      POST: `${process.env.URL}/api/tasks`,
      PUT: `${process.env.URL}/api/tasks/:id`,
      PATCH: `${process.env.URL}/api/tasks/:id`,
      DELETE: `${process.env.URL}/api/tasks/:id`,
    },
    userRoutes: {
      GET: `${process.env.URL}/api/users/:id`,
      POST: `${process.env.URL}/api/users`,
      PUT: `${process.env.URL}/api/users/:id`,
      PATCH: `${process.env.URL}/api/users/:id`,
      DELETE: `${process.env.URL}/api/users/:id`,
    },
    authRoutes: {
      POST: `${process.env.URL}/auth/login`,
      POST: `${process.env.URL}/auth/logout`,
      POST: `${process.env.URL}/auth/register`,
    },
  });
});

module.exports = router;
