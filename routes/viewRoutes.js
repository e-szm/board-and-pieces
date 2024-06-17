const express = require("express");

const authController = require("../controllers/authController");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

// Pass user login to Pug (if logged in)
router.use(authController.isLoggedIn);

router.route("/").get(viewsController.getHomepage);
router.route("/signup").get(viewsController.getSignupForm);
router.route("/login").get(viewsController.getLoginForm);

// Authenticated Routes
router
  .route("/me")
  .get(authController.protectRoute, viewsController.getAccount);
router
  .route("/dashboard")
  .get(authController.protectRoute, viewsController.getDashboard);

module.exports = router;
