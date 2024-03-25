class Application {
  constructor() {}

  init() {
    const ctaBtnContEl = document.querySelector(".input-btn-container--cta");

    const beginBtnEl = document.createElement("button");
    beginBtnEl.textContent = "Begin";
    beginBtnEl.classList.add("btn", "btn--cta");
    beginBtnEl.dataset.handler = "handleBeginClick";
    ctaBtnContEl.insertAdjacentElement("beforeend", beginBtnEl);

    const ctaEl = document.querySelector(".cta");
    ctaEl.addEventListener("click", this.handleCTAClicks.bind(this));
  }

  newElement() {}

  handleCTAClicks(e) {
    if (e.target.nodeName !== "BUTTON") return;
    this[e.target.dataset.handler]();
  }

  handleBeginClick() {
    const ctaBtnContEl = document.querySelector(".input-btn-container--cta");
    const beginBtnEl = document.querySelector(".btn--cta");

    const usernameInputEl = document.createElement("input");
    usernameInputEl.id = "input--user-1";
    usernameInputEl.name = "username";
    usernameInputEl.type = "text";
    usernameInputEl.placeholder = " ";
    usernameInputEl.required = true;
    usernameInputEl.classList.add("fade-out");

    const usernameLabelEl = document.createElement("label");
    usernameLabelEl.setAttribute("for", "input--user-1");
    usernameLabelEl.textContent = "Enter your Chess.com username";
    usernameLabelEl.classList.add("fade-out");

    ctaBtnContEl.insertAdjacentElement("afterbegin", usernameLabelEl);
    ctaBtnContEl.insertAdjacentElement("afterbegin", usernameInputEl);

    beginBtnEl.classList.add("btn--inline");
    beginBtnEl.innerHTML = "&rarr;";
    this.wait(0.5).then(() => {
      usernameInputEl.classList.remove("fade-out");
      usernameLabelEl.classList.remove("fade-out");
      usernameInputEl.classList.remove("fade-in");
      usernameLabelEl.classList.remove("fade-in");
    });
  }

  wait(sec) {
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }
}

const app = new Application();
app.init();
