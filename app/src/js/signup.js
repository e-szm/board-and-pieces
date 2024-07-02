"use strict";

import { clearInput, disableForm, enableForm } from "./utils/formHelper.js";
import alert from "./utils/alert.js";
import { signup } from "./utils/api.js";

async function handleSignupSubmit(e) {
  e.preventDefault();

  disableForm(this, "Creating...");

  const email = document.getElementById("email").value.toLowerCase();
  const username = document.getElementById("username").value.toLowerCase();
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm-password").value;

  if (password !== confirm_password) {
    alert("error", "Passwords must match.");
    enableForm(this, "Create Account");
    return;
  }

  const res = await signup({
    email,
    username,
    password,
    confirm_password,
  });
  const data = await res.json();

  if (!res.ok || res.status !== 201) {
    alert("error", data.message);
    enableForm(this, "Create Account");
    return;
  }

  clearInput(this);
  alert("success", "Account created successfully! You are being redirected...");

  location.assign("/dashboard");
  enableForm(this, "Create Account");
}

function init() {
  const signupForm = document.querySelector(".form--signup");
  if (!signupForm) {
    alert("error", "Oops! Please try again later.");
    return;
  }

  signupForm.addEventListener("submit", handleSignupSubmit);
}

init();
