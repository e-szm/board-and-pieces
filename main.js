class Application {
  constructor() {}

  init() {
    const ctaEl = document.querySelector(".cta");

    const beginBtnEl = document.createElement("button");
    beginBtnEl.textContent = "Begin";
    beginBtnEl.classList.add("btn", "btn--cta");
    ctaEl.insertAdjacentElement("beforeend", beginBtnEl);
  }
}

const app = new Application();
// app.init();
