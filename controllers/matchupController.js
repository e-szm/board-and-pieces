const Matchup = require("../models/matchupModel");

exports.createMatchup = async (req, res, next) => {
  Matchup.getMatchesByUser(["cashmonnay17"]);
  //   Matchup.aggregateOpenings();

  res.status(200).json({
    status: "success",
    data: "not at the moment",
  });
};
