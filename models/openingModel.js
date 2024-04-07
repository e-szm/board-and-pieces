const mongoose = require("mongoose");

const openingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

openingSchema.statics.getOpenings = async function () {
  const openings = await this.find().lean();
  const openingsMap = new Map();

  openings.forEach((opening) => {
    openingsMap.set(opening.code, opening.name);
  });

  return openingsMap;
};

module.exports = mongoose.model("Opening", openingSchema);
