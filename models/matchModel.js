const mongoose = require("mongoose");
const Opening = require("./openingModel");

const matchSchema = new mongoose.Schema({
  uuid: {
    type: mongoose.Schema.Types.UUID,
    required: true,
    unique: true,
    select: false,
  },
  url: String,
  end_time: Number,
  rated: Boolean,
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
  white: {
    rating: Number,
    result: {
      type: String,
      enum: [
        "win",
        "checkmated",
        "agreed",
        "repetition",
        "timeout",
        "resigned",
        "stalemate",
        "lose",
        "insufficient",
        "50move",
        "abandoned",
        "kingofthehill",
        "threecheck",
        "timevsinsufficient",
        "bughousepartnerlos",
      ],
    },
    username: String,
    uuid: mongoose.Schema.Types.UUID,
  },
  black: {
    rating: Number,
    result: {
      type: String,
      enum: [
        "win",
        "checkmated",
        "agreed",
        "repetition",
        "timeout",
        "resigned",
        "stalemate",
        "lose",
        "insufficient",
        "50move",
        "abandoned",
        "kingofthehill",
        "threecheck",
        "timevsinsufficient",
        "bughousepartnerlos",
      ],
    },
    username: String,
    uuid: mongoose.Schema.Types.UUID,
  },
  eco: {
    code: String,
    name: String,
  },
});

matchSchema.statics.appendECO = async function (matches) {
  const openingsMap = await Opening.getOpenings();
  const regex = /ECO \"[A-E][0-9][0-9]\"/;

  for (let match of matches) {
    const ecoStartIndex = match.pgn.search(regex) + 5;
    const ecoCode = match.pgn.slice(ecoStartIndex, ecoStartIndex + 3);

    match.eco = {
      code: ecoCode,
      name: openingsMap.get(ecoCode),
    };
  }
};

matchSchema.statics.removeDuplicates = function (matches) {};

module.exports = mongoose.model("Match", matchSchema);
