"use strict";

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
