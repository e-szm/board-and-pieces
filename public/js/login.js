"use strict";

import { clearInput, disableForm, enableForm } from "./utils/formHelper.js";
import alert from "./utils/alert.js";
import { login } from "./utils/api.js";

async function handleLoginSubmit(e) {
  e.preventDefault();

  disableForm(this, "Logging in...");

  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value;

  const res = await login({
    email,
    password,
  });
  const data = await res.json();

  if (!res.ok || res.status !== 200) {
    alert("error", data.message);
    enableForm(this, "Log In");
    return;
  }

  clearInput(this);
  alert("success", "Login successful! You are being redirected...");

  location.assign("/dashboard");
  enableForm(this, "Log In");
}

function init() {
  const loginForm = document.querySelector(".form--login");
  if (!loginForm) {
    alert("error", "Oops! Please try again later.");
    return;
  }

  loginForm.addEventListener("submit", handleLoginSubmit);
}

init();
