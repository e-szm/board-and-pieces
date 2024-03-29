const mongoose = require("mongoose");
const { UUID } = require("bson");

const matchSchema = new mongoose.Schema({
  uuid: {
    type: UUID,
    required: true,
    unique: true,
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
    uuid: UUID,
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
    uuid: UUID,
  },
});

matchSchema.statics.appendECO = function (matches) {
  for (let match of matches) {
    const re = /ECO \"[A-E][0-9][0-9]\"/;
    const ecoStart = match.pgn.search(re) + 5;
    match.eco = match.pgn.slice(ecoStart, ecoStart + 3);
  }
};

module.exports = mongoose.model("Match", matchSchema);
