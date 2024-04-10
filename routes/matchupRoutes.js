const express = require("express");
const matchupController = require("../controllers/matchupController");

const router = express.Router();

router.route("/").post(matchupController.createMatchup);

module.exports = router;
