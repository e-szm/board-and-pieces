const Player = require("../models/playerModel");
const ChessDotCom = require("../utils/chessDotCom");

exports.createPlayer = async (req, res, next) => {
  const username = req.params.username;

  let player = await Player.exists({ username: username });
  if (player) return next(new Error("Player already exists"));

  const profile = await ChessDotCom.getPlayerProfile(username);
  player = await Player.create({
    player_id: profile.player_id,
    username: profile.username,
  });

  res.status(200).json({
    status: "success",
    data: player,
  });
};
