const express = require("express");
const playerController = require("../controllers/playerController");

const router = express.Router();

router.route("/:username").post(playerController.createPlayer);

module.exports = router;
