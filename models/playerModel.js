const mongoose = require("mongoose");

const ChessDotCom = require("../utils/chessDotCom");
const dateHelper = require("../utils/dateHelper");
const AppError = require("../utils/appError");

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
      archStatusFor(archPeriod) {
        const archive = this.avail_archives.get(archPeriod);
        if (!archive) return null;
        if (archive.complete) return "complete";
        return "partial";
      },

      async refreshArchivesFor(archPeriod) {
        const archDate = new Date(archPeriod);
        const [year, month] = archPeriod.split("-");
        const status = this.archStatusFor(archPeriod);

        if (status === "complete") return [];

        const res = await ChessDotCom.getMonthlyArchives(
          this.username,
          year,
          month
        );
        let matches = res.games;

        if (status === "partial")
          matches = matches.filter(
            (match) =>
              new Date(match.end_time * 1000) >
              this.avail_archives.get(archPeriod).last_updated
          );

        const now = new Date();
        const nextPeriodDate = dateHelper.addMonths(archDate, 1);
        const isComplete = now >= nextPeriodDate ? true : false;

        this.avail_archives.set(archPeriod, {
          last_updated: now,
          complete: isComplete,
        });

        return matches;
      },
    },
  }
);

playerSchema.statics.getDatesList = function (start, end) {
  dateHelper.isValidDateString([start, end]);

  const dateList = [];
  const startDate = new Date(start);
  const endDate = new Date(end);

  dateHelper.isValidDateRange(startDate, endDate);

  let curDate = startDate;
  while (curDate <= endDate) {
    dateList.push(dateHelper.getYearMonth(curDate));
    curDate = dateHelper.addMonths(curDate, 1);
  }

  return dateList;
};

playerSchema.statics.validateOrCreatePlayer = async function (username) {
  let existingPlayer = await this.findOne({ username });
  if (existingPlayer) return existingPlayer;

  const profile = await ChessDotCom.getPlayerProfile(username);
  const newPlayer = await this.create({
    player_id: profile.player_id,
    username: profile.username,
  });

  return newPlayer;
};

module.exports = mongoose.model("Player", playerSchema);
