class Application {
  constructor() {}

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
  // USER INTERFACE
  //////////////////////////////////////////////////////

  nextStep() {
    const stepListEl = [...document.querySelectorAll("[data-step]")];
    const curStepNum = stepListEl.findIndex((step) =>
      step.classList.contains("step--active")
    );

    if (curStepNum >= 0)
      stepListEl[curStepNum].classList.remove("step--active");
    stepListEl[curStepNum + 1]?.classList.add("step--active");
  }

  //////////////////////////////////////////////////////
  // EVENT HANDLERS
  //////////////////////////////////////////////////////

  handleCTAClicks(e) {
    if (e.target.nodeName !== "BUTTON") return;
    if (e.target.hasAttribute("data-next")) this.handleNextClick();
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

  handleNextClick() {
    this.wait(3).then(() => console.log("API Simulated"));
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

const app = new Application();
app.init();
