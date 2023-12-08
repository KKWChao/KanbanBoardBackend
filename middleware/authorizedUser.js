function authUser(req, res, next) {
  const userRole = req.user.userRole;
  if (userRole.includes(`admin`)) {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Insufficient privileges" });
  }
}

module.exports = authUser;
