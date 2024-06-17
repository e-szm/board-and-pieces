const AppError = require("./appError");
const fs = require("fs");

class ChessDotCom {
  constructor() {}

  getErrorMessage(code) {
    switch (code) {
      case 404:
        return "Invalid request";

      case 429:
        return "Too many requests. Please try again later.";

      default:
        "There was an issue contacting Chess.com servers. Please try again later.";
    }
  }

  async getPlayerProfile(username) {
    const res = await fetch(`${process.env.CHESS_PLAYER_ENDPOINT}/${username}`);

    if (!res.ok || res.status !== 200)
      throw new AppError(this.getErrorMessage(res.status), res.status);

    return await res.json();

    // const data = JSON.parse(
    //   fs.readFileSync(
    //     `${__dirname}/../dev-data/players.json`,
    //     (err, data) => data,
    //     { encoding: "utf8" }
    //   )
    // );
  }

  async getMonthlyArchives(username, year, month) {
    const res = await fetch(
      `${process.env.CHESS_PLAYER_ENDPOINT}/${username}/games/${year}/${month}`
    );

    if (!res.ok || res.status !== 200)
      throw new AppError(this.getErrorMessage(res.status), res.status);

    return await res.json();

    // const data = JSON.parse(
    //   fs.readFileSync(
    //     `${__dirname}/../dev-data/games.json`,
    //     (err, data) => data,
    //     { encoding: "utf8" }
    //   )
    // );
    // return data;
  }
}

module.exports = new ChessDotCom();
