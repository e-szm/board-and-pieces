const express = require("express");
const matchController = require("../controllers/matchController");

const router = express.Router();

router.route("/:username").post(matchController.createMatch);

router
  .route("/opening-stats/:username/:year/:month")
  .get(matchController.getOpeningStats);

module.exports = router;
