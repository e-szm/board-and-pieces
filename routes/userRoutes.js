const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

// Public routes
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/forgot-my-password").post(authController.forgotMyPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);

// Authenticated Routes
router
  .route("/change-my-password")
  .patch(authController.protectRoute, authController.changeMyPassword);

module.exports = router;
