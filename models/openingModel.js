const mongoose = require("mongoose");

const openingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  moves: String,
  name: {
    type: String,
    required: true,
  },
});

openingSchema.statics.getOpenings = async function () {
  const openings = await this.find().lean();
  const openingsMap = new Map();

  openings.forEach((opening) => {
    openingsMap.set(opening.code, { name: opening.name, moves: opening.moves });
  });

  return openingsMap;
};

module.exports = mongoose.model("Opening", openingSchema);
