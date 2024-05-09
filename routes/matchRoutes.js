const express = require("express");
const matchController = require("../controllers/matchController");

const router = express.Router();

router.route("/:username").post(matchController.createMatch);

router
  .route("/opening-stats/:username/:year/:month")
  .get(matchController.getOpeningStats);
router
  .route("/rating-trends/:username/:year/:month")
  .get(matchController.getRatingTrends);
router
  .route("/duration-stats/:username/:year/:month")
  .get(matchController.getDurationStats);

module.exports = router;
