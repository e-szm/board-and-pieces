const mongoose = require("mongoose");
const { UUID } = require("bson");

const matchSchema = new mongoose.Schema({
  uuid: {
    type: UUID,
    required: true,
    unique: true,
  },
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
});

module.exports = mongoose.model("Match", matchSchema);
