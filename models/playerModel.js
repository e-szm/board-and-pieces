const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    avail_archives: {
      type: Map,
      default: new Map(),
    },
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
  },
  {
    methods: {
      archAvailFor(archPeriod) {
        const archive = this.avail_archives.get(archPeriod);
        if (archive?.complete) return true;
        return false;
      },
      async updateArchive(archPeriod) {
        this.avail_archives.set(archPeriod, {
          last_updated: new Date(),
          complete: true,
        });
        await this.save();
        return this;
      },
    },
  }
);

module.exports = mongoose.model("Player", playerSchema);
