const Match = require("../models/matchModel");
const Player = require("../models/playerModel");
const ChessDotCom = require("../utils/chessDotCom");

exports.createMatch = async (req, res, next) => {
  const username = req.params.username;
  const archYear = "2024";
  const archMonth = "03";
  const archPeriod = archYear + archMonth;

  const player = await Player.findOne({ username: username });
  if (!player) return next(new Error("Player does not exist"));

  if (player.archAvailFor(archPeriod)) {
    console.log("Archives are available");
  } else {
    console.log("Archives not available. Going to chess.com");
    const data = await ChessDotCom.getMonthlyArchives(
      username,
      archYear,
      archMonth
    );

    const matches = await Match.format(username, data);
    Match.create(matches);
    await player.updateArchive(archPeriod);
  }

  res.status(200).json({
    status: "success",
    data: "we're moving!",
  });
};

exports.getOpeningStats = async function (req, res, next) {
  const archPeriodBegin = new Date(req.params.year, req.params.month);
  const archPeriodEnd = new Date(archPeriodBegin);
  archPeriodEnd.setMonth(archPeriodEnd.getMonth() + 1);

  const openingStats = await Match.aggregate([
    {
      $match: {
        player_username: req.params.username,
        end_time: { $gte: archPeriodBegin, $lt: archPeriodEnd },
      },
    },
    {
      $group: {
        _id: "$eco.name",
        total: { $sum: 1 },
        wins: {
          $sum: {
            $cond: [
              {
                $eq: ["$result", "win"],
              },
              1,
              0,
            ],
          },
        },
        losses: {
          $sum: {
            $cond: [
              {
                $in: [
                  "$result",
                  [
                    "checkmated",
                    "timeout",
                    "resigned",
                    "lose",
                    "abandoned",
                    "kingofthehill",
                    "threecheck",
                    "bughousepartnerlos",
                  ],
                ],
              },
              1,
              0,
            ],
          },
        },
        draws: {
          $sum: {
            $cond: [
              {
                $in: [
                  "$result",
                  [
                    "agreed",
                    "repetition",
                    "stalemate",
                    "insufficient",
                    "50move",
                    "timevsinsufficient",
                  ],
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: openingStats,
  });
};
