const mongoose = require("mongoose");
const Opening = require("./openingModel");

const matchSchema = new mongoose.Schema({
  archive_month: {
    type: String,
    minLength: 2,
    maxLength: 2,
  },
  archive_year: {
    type: String,
    minLength: 4,
    maxLength: 4,
  },
  color: {
    type: String,
    enum: ["white", "black"],
  },
  eco: {
    code: String,
    name: String,
    moves: String,
  },
  end_time: Date,
  num_moves: Number,
  player: {
    type: mongoose.ObjectId,
    required: true,
  },
  player_rating: Number,
  player_username: {
    type: String,
    required: true,
  },
  rated: Boolean,
  result: {
    type: String,
    enum: [
      "win", // Win
      "checkmated", // Lose
      "agreed", // Draw
      "repetition", // Draw
      "timeout", // Lose
      "resigned", // Lose
      "stalemate", // Draw
      "lose", // Lose
      "insufficient", // Draw
      "50move", // Draw
      "abandoned", // Lose
      "kingofthehill", // Lose
      "threecheck", // Lose
      "timevsinsufficient", // Draw
      "bughousepartnerlos", // Lose
    ],
  },
  rules: {
    type: String,
    enum: [
      "chess",
      "chess960",
      "bughouse",
      "kingofthehill",
      "threecheck",
      "crazyhouse",
    ],
  },
  start_time: Date,
  time_class: {
    type: String,
    enum: ["daily", "rapid", "blitz", "bullet"],
  },
  time_control: String,
  url: String,
});

matchSchema.statics.getECOCode = function (pgn) {
  const regex = /ECO \"[A-E][0-9][0-9]\"/;
  const ecoStartIndex = pgn.search(regex) + 5;
  return pgn.slice(ecoStartIndex, ecoStartIndex + 3);
};

matchSchema.statics.getNumOfMoves = function (pgn) {
  for (let i = pgn.length - 1; i >= 0; i--) {
    if (pgn[i] !== ".") continue;
    else if (pgn[i] + pgn[i - 1] + pgn[i - 2] === "...") {
      let j = i - 3;
      let num = "";
      while ((pgn[j] >= 0) & (pgn[j] <= 9)) {
        num = pgn[j] + num;
        j--;
      }
      return parseInt(num);
    }
  }
};

matchSchema.statics.getStartTime = function (pgn) {
  const regex = /UTCDate/;
  const dateStartIndex = pgn.search(regex) + 9;
  const timeStartIndex = dateStartIndex + 23;

  const date = pgn.slice(dateStartIndex, dateStartIndex + 10);
  const time = pgn.slice(timeStartIndex, timeStartIndex + 8);

  return new Date(Date.parse(date + " " + time + " GMT"));
};

matchSchema.statics.format = async function (player, matches) {
  const result = [];
  const openingsMap = await Opening.getOpenings();

  for (let match of matches) {
    const color = player.username === match.white.username ? "white" : "black";
    const ecoCode = this.getECOCode(match.pgn);
    const opening = openingsMap.get(ecoCode);
    const startTime = this.getStartTime(match.pgn);
    const numMoves = this.getNumOfMoves(match.pgn);

    result.push({
      color: color,
      eco: {
        code: ecoCode,
        name: opening.name,
        moves: opening.moves,
      },
      end_time: new Date(match.end_time * 1000),
      num_moves: numMoves,
      player: player._id,
      player_username: player.username,
      player_rating: match[color].rating,
      rated: match.rated,
      result: match[color].result,
      rules: match.rules,
      start_time: startTime,
      time_class: match.time_class,
      time_control: match.time_control,
      url: match.url,
    });
  }

  return result;
};

module.exports = mongoose.model("Match", matchSchema);
