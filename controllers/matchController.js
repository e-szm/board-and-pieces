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
  // TODO: Arch periods/data retrieval centralized
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
        _id: {
          code: "$eco.code",
          // opening: "$eco.name",
          // moves: "$eco.moves",
          color: "$color",
        },
        opening: { $first: "$eco.name" },
        moves: { $first: "$eco.moves" },
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
    {
      $project: {
        _id: 0,
        code: "$_id.code",
        color: "$_id.color",
        opening: 1,
        moves: 1,
        total: 1,
        wins: 1,
        draws: 1,
        losses: 1,
      },
    },
    {
      $sort: { total: 1, wins: 1, losses: 1, draws: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: openingStats,
  });
};

exports.getRatingTrends = async function (req, res, next) {
  // TODO: Arch periods/data retrieval centralized
  const archPeriodBegin = new Date(req.params.year, req.params.month);
  const archPeriodEnd = new Date(archPeriodBegin);
  archPeriodEnd.setMonth(archPeriodEnd.getMonth() + 1);

  const ratingTrends = await Match.aggregate([
    {
      $match: {
        player_username: req.params.username,
        end_time: { $gte: archPeriodBegin, $lt: archPeriodEnd },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%m-%d-%Y", date: "$end_time" } },
          time_class: "$time_class",
        },
        rating: { $avg: "$player_rating" },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromString: { format: "%m-%d-%Y", dateString: "$_id.date" },
        },
        time_class: "$_id.time_class",
        rating: 1,
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: ratingTrends,
  });
};

exports.getDurationStats = async function (req, res, next) {
  const archPeriodBegin = new Date(req.params.year, req.params.month);
  const archPeriodEnd = new Date(archPeriodBegin);
  archPeriodEnd.setMonth(archPeriodEnd.getMonth() + 1);

  const durationStats = await Match.aggregate([
    {
      $match: {
        player_username: req.params.username,
        end_time: { $gte: archPeriodBegin, $lt: archPeriodEnd },
      },
    },
    {
      $project: {
        match_length: {
          $dateDiff: {
            startDate: "$start_time",
            endDate: "$end_time",
            unit: "second",
          },
        },
        num_moves: 1,
        result: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ["$result", "win"],
                },
                then: "win",
              },
              {
                case: {
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
                then: "lose",
              },
              {
                case: {
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
                then: "draw",
              },
            ],
          },
        },
        start_time: 1,
        end_time: 1,
        time_class: 1,
        time_control: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: durationStats,
  });
};
