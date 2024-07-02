"use strict";

import "../css/general.css";
import "../css/style.css";

import "../img/general/chessboard.jpg";
import "../img/general/logo-full.png";
import "../img/general/logo-64x64.png";
import "../img/about/configuration.png";
import "../img/about/duration-analysis.png";
import "../img/about/opening-stats.png";
import "../img/about/rating-trends.png";

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
