const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  checkAuth,
  adminLogin,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin); // Special admin login route
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, checkAuth);

module.exports = router;