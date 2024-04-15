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
  player_username: String,
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

matchSchema.statics.format = async function (username, matches) {
  const result = [];
  const openingsMap = await Opening.getOpenings();

  for (let match of matches) {
    const color = username === match.white.username ? "white" : "black";
    const ecoCode = this.getECOCode(match.pgn);
    const opening = openingsMap.get(ecoCode);

    result.push({
      color: color,
      eco: {
        code: ecoCode,
        name: opening.name,
        moves: opening.moves,
      },
      end_time: new Date(match.end_time * 1000),
      player_username: username,
      rated: match.rated,
      result: match[color].result,
      rules: match.rules,
      time_class: match.time_class,
      time_control: match.time_control,
      url: match.url,
    });
  }

  return result;
};

module.exports = mongoose.model("Match", matchSchema);
