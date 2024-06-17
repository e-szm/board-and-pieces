const express = require("express");
const authController = require("../controllers/authController");
const matchController = require("../controllers/matchController");

const router = express.Router();

// Authenticated Routes
router.use(authController.protectRoute);

router
  .route("/refresh/start/:start/end/:end")
  .get(matchController.refreshDashboard);
router
  .route("/opening-stats/start/:start/end/:end")
  .get(matchController.getOpeningStats);
router
  .route("/rating-trends/start/:start/end/:end")
  .get(matchController.getRatingTrends);
router
  .route("/duration-stats/start/:start/end/:end")
  .get(matchController.getDurationStats);

module.exports = router;
