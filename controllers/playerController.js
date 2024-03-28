const Player = require("../models/playerModel");

exports.createPlayer = async (req, res, next) => {
  const playerExists = await Player.exists({ player_id: req.body.player_id });
  if (playerExists) return next("Player already exists.");

  const newPlayer = await Player.create(req.body);

  res.status(200).json({
    status: "success",
    data: newPlayer,
  });
};
