const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  player_id: {
    type: String,
    required: [true, "All players must have a player ID"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "All players must have a Username"],
    unique: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
