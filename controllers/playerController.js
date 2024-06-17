const Player = require("../models/playerModel");
const ChessDotCom = require("../utils/chessDotCom");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createPlayer = catchAsync(async (req, res, next) => {
  const username = req.params.username;

  if (await Player.exists({ username: username })) {
    return next(new AppError("Player already exists"));
  }

  const profile = await ChessDotCom.getPlayerProfile(username);
  const player = await Player.create({
    player_id: profile.player_id,
    username: profile.username,
  });

  res.status(200).json({
    status: "success",
    data: { player },
  });
});
