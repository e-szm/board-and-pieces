const Match = require("../models/matchModel");

exports.createMatch = async (req, res, next) => {
  await Match.appendECO(req.body);
  try {
    const matches = await Match.insertMany(req.body, {
      ordered: false,
    });

    res.status(200).json({
      status: "success",
      data: matches,
    });
  } catch (error) {
    console.log(error);
  }
};
