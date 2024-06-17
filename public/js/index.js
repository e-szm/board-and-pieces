"use strict";

import logout from "./logout.js";

function init() {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
}

init();
