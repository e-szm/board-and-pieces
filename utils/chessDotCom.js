const fs = require("fs");

class ChessDotCom {
  constructor() {}

  async getPlayerProfile(username) {
    // const res = await fetch(`https://api.chess.com/pub/player/${username}`);
    // const data = await res.json();

    const data = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../dev-data/players.json`,
        (err, data) => data,
        { encoding: "utf8" }
      )
    );

    return data;
  }

  async getMonthlyArchives(username, year, month) {
    // const res = await fetch(
    //   `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
    // );
    // const data = await res.json();

    const data = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../dev-data/games.json`,
        (err, data) => data,
        { encoding: "utf8" }
      )
    );
    return data;
  }
}

module.exports = new ChessDotCom();
