const Match = require("../models/matchModel");
const Player = require("../models/playerModel");
const dateHelper = require("../utils/dateHelper");
const catchAsync = require("../utils/catchAsync");

function validateParams(params) {
  const { start, end } = params;
  dateHelper.isValidDateString([start, end]);

  const queryStart = new Date(start);
  const endDate = new Date(end);
  dateHelper.isValidDateRange(queryStart, endDate);
  const queryEnd = dateHelper.addMonths(endDate, 1);

  return {
    queryStart,
    queryEnd,
  };
}

exports.getColorAnalysis = catchAsync(async (req, res, next) => {
  const { queryStart, queryEnd } = validateParams(req.params);

  const colorAnalysis = await Match.aggregate([
    {
      $match: {
        player: req.user.player,
        end_time: { $gte: queryStart, $lt: queryEnd },
      },
    },
    {
      $group: {
        _id: {
          color: "$color",
        },
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
        summary: [
          {
            color: "$_id.color",
            name: "wins",
            value: "$wins",
          },
          {
            color: "$_id.color",
            name: "draws",
            value: "$draws",
          },
          {
            color: "$_id.color",
            name: "losses",
            value: "$losses",
          },
        ],
      },
    },
    {
      $unwind: "$summary",
    },
    {
      $project: {
        color: "$summary.color",
        name: "$summary.name",
        value: "$summary.value",
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      colorAnalysis,
    },
  });
});

exports.getOpeningStats = catchAsync(async function (req, res, next) {
  const { queryStart, queryEnd } = validateParams(req.params);

  const openingStats = await Match.aggregate([
    {
      $match: {
        player: req.user.player,
        end_time: { $gte: queryStart, $lt: queryEnd },
      },
    },
    {
      $group: {
        _id: {
          code: "$eco.code",
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
    results: openingStats.length,
    data: {
      openingStats,
    },
  });
});

exports.getRatingTrends = catchAsync(async function (req, res, next) {
  const { queryStart, queryEnd } = validateParams(req.params);

  const ratingTrends = await Match.aggregate([
    {
      $match: {
        player: req.user.player,
        end_time: { $gte: queryStart, $lt: queryEnd },
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
    results: ratingTrends.length,
    data: {
      ratingTrends,
    },
  });
});

exports.getDurationStats = catchAsync(async function (req, res, next) {
  const { queryStart, queryEnd } = validateParams(req.params);

  const durationStats = await Match.aggregate([
    {
      $match: {
        player: req.user.player,
        end_time: { $gte: queryStart, $lt: queryEnd },
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
    results: durationStats.length,
    data: {
      durationStats,
    },
  });
});

exports.refreshDashboard = catchAsync(async (req, res, next) => {
  let { username, start, end } = req.params;
  const { queryStart, queryEnd } = validateParams(req.params);

  // 1) Get Player from username or JWT
  let player;
  if (username) {
    player = await Player.validateOrCreatePlayer(username);
  } else {
    player = await Player.findById(req.user.player);
  }

  // 2) Convert date range to dates
  const dateList = Player.getDatesList(start, end);

  // 3) Loop dates
  let newMatches = [];
  for (let i = 0; i < dateList.length; i++) {
    newMatches.push(...(await player.refreshArchivesFor(dateList[i])));
  }

  newMatches = await Match.format(player, newMatches);
  await Match.create(newMatches);
  // Archive updates persisted AFTER successful match creation
  await player.save();

  const highlights = await Match.aggregate([
    {
      $match: {
        player: req.user.player,
        end_time: { $gte: queryStart, $lt: queryEnd },
      },
    },
    {
      $group: {
        _id: null,
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
    data: {
      username: player.username,
      startDateStr: start,
      endDateStr: end,
      highlights: highlights[0],
    },
  });
});
