const Match = require("../models/matchModel");

exports.createMatch = async (req, res, next) => {
  const newMatch = Match.create(req.body);

  res.status(200).json({
    status: "success",
    data: "none",
  });
};
