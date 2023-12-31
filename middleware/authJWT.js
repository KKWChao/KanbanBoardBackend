const jwt = require("jsonwebtoken");

function authJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(201)
      .json({ success: false, message: "Unauthorized: Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken.user;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
}

module.exports = authJWT;
