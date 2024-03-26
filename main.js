//////////////////////////////////////////////////////
// STUB DATA
//////////////////////////////////////////////////////
const stubStats1 = JSON.parse(
  `{"chess_daily":{"last":{"rating":946,"date":1711471133,"rd":290},"best":{"rating":1000,"date":1554921965,"game":"https://www.chess.com/game/daily/529182733"},"record":{"win":1,"loss":0,"draw":0,"time_per_move":6842,"timeout_percent":0}},"chess_rapid":{"last":{"rating":1784,"date":1711472222,"rd":35},"best":{"rating":1806,"date":1710007768,"game":"https://www.chess.com/game/live/105210104051"},"record":{"win":2788,"loss":2642,"draw":186}},"chess_bullet":{"last":{"rating":1014,"date":1670952586,"rd":180},"best":{"rating":1149,"date":1610749351,"game":"https://www.chess.com/game/live/6247243459"},"record":{"win":2,"loss":2,"draw":0}},"chess_blitz":{"last":{"rating":914,"date":1682701238,"rd":102},"best":{"rating":999,"date":1610736813,"game":"https://www.chess.com/game/live/58209609023"},"record":{"win":32,"loss":26,"draw":2}},"fide":0,"tactics":{"highest":{"rating":1015,"date":1703691755},"lowest":{"rating":410,"date":1606229252}},"puzzle_rush":{"best":{"total_attempts":16,"score":13}}}`
);

class Application {
  constructor() {
    this.currentStep = -1;
    this.players = new Map();
  }

  //////////////////////////////////////////////////////
  // INITIALIZE APPLICATION
  //////////////////////////////////////////////////////

  beginListening() {
    document
      .querySelector("[data-steps]")
      .addEventListener("click", this.handleCTAClicks.bind(this));
  }

  init() {
    this.nextStep();
    this.beginListening();
  }

  //////////////////////////////////////////////////////
  // APIs
  //////////////////////////////////////////////////////

  async getPlayerStats(username) {
    // const res = await fetch(
    //   `https://api.chess.com/pub/player/${username}/stats`
    // );

    // return await res.json();

    return stubStats1;
  }

  //////////////////////////////////////////////////////
  // USER INTERFACE
  //////////////////////////////////////////////////////

  disableEls(arr) {
    arr.forEach((el) => el.setAttribute("disabled", ""));
  }

  nextStep() {
    const stepListEl = [...document.querySelectorAll("[data-step]")];
    const newStep = this.currentStep + 1;

    if (newStep < 0 || newStep >= stepListEl.length) return;

    // -1 --> Not yet initialized
    if (this.currentStep === -1) {
      stepListEl.forEach((step) => step.classList.add("step--pending"));
    } else {
      stepListEl[this.currentStep].classList.remove("step--active");
      stepListEl[this.currentStep].classList.add("step--completed");
    }

    stepListEl[newStep].classList.remove("step--pending");
    stepListEl[newStep].classList.add("step--active");

    this.currentStep++;
  }

  //////////////////////////////////////////////////////
  // EVENT HANDLERS
  //////////////////////////////////////////////////////

  handleCTAClicks(e) {
    if (e.target.nodeName !== "BUTTON") return;
    if (e.target.hasAttribute("data-next")) this.handleNextClick(e);
    if (e.target.hasAttribute("data-begin")) this.handleBeginClick(e);
  }

  handleBeginClick(e) {
    const beginBtnEl = e.target;
    const usernameInputEl = document.querySelector(".input--user-1");
    const usernameLabelEl = document.querySelector(".label--user-1");

    beginBtnEl.classList.add("btn--inline");
    beginBtnEl.innerHTML = "&rarr;";
    beginBtnEl.removeAttribute("data-begin");
    beginBtnEl.setAttribute("data-next", "");
    usernameInputEl.classList.remove("hidden");
    usernameLabelEl.classList.remove("hidden");
  }

  async handleNextClick(e) {
    const clickedBtn = e.target;
    const clickedInput = clickedBtn.parentNode.querySelector("input");
    const username = clickedInput.value;

    // this.disableEls([clickedBtn, clickedInput]);

    const playerStats = await this.getPlayerStats(username);
    const newPlayer = new Player(username);
    newPlayer.stats = playerStats;
    this.players.set(username, newPlayer);
    console.log(this.players);

    // await this.wait(3);
    console.log("API worked again!");
    this.nextStep();
  }

  //////////////////////////////////////////////////////
  // UTILITIES
  //////////////////////////////////////////////////////

  wait(sec) {
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }
}

class Player {
  constructor(username) {
    this.username = username;
    this.stats = null;
    this.games = null;
  }
}

const app = new Application();
app.init();
