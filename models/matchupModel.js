const mongoose = require("mongoose");
const Match = require("./matchModel");

const matchupSchema = mongoose.Schema({});

matchupSchema.statics.getMatchesByUser = async function (
  playerList,
  startDate,
  endDate
) {
  const matchesByUser = await Match.aggregate([
    {
      $match: {
        $or: [
          { "white.username": { $in: playerList } },
          { "black.username": { $in: playerList } },
        ],
      },
    },
  ]);
  console.log(matchesByUser);
};

matchupSchema.statics.aggregateOpenings = async function () {
  const openings = await Match.aggregate([
    {
      $match: { rules: "chess" },
    },
    {
      $group: {
        _id: "$eco.name",
        matchCount: { $count: {} },
      },
    },
  ]);

  console.log(openings);
};

module.exports = mongoose.model("Matchup", matchupSchema);
