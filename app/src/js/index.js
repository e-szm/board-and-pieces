"use strict";

import logout from "./logout.js";

function handleClickNav(e) {
  const clicked = e.target;

  if (clicked.id === "logout") logout();
  else if (clicked.classList.contains("mobile-nav-btn")) {
    const action = clicked.dataset.action;
    this.classList.remove("open", "closed");
    this.classList.add(action);
  }
}

function init() {
  const navListContainer = document.querySelector(".nav-list-container");
  if (navListContainer)
    navListContainer.addEventListener("click", handleClickNav);
}

init();
