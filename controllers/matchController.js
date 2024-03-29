const Match = require("../models/matchModel");

exports.createMatch = async (req, res, next) => {
  Match.appendECO(req.body);
  console.log(req.body);

  res.status(200).json({
    status: "success",
    data: "none",
  });
};
