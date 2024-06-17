"use strict";

import { clearInput, disableForm, enableForm } from "./utils/formHelper.js";
import { changePassword } from "./utils/api.js";
import alert from "./utils/alert.js";

async function handlePasswordChange(e) {
  e.preventDefault();

  disableForm(this, "Changing...");

  const oldPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const newPasswordConfirm = document.getElementById("confirm-password").value;

  if (newPassword !== newPasswordConfirm) {
    alert("error", "Passwords must match.");
    enableForm(this, "Change Password");
    return;
  }

  const res = await changePassword({
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });
  const data = await res.json();

  if (!res.ok || res.status !== 200) {
    alert("error", data.message);
    enableForm(this, "Change Password");
    return;
  }

  alert("success", "Password changed successfully!");
  clearInput(this);
  enableForm(this, "Change Password");
  location.reload(true);
}

function init() {
  const passwordForm = document.querySelector(".form--password");
  if (!passwordForm) {
    alert("error", "Oops! Please try again later.");
    return;
  }

  passwordForm.addEventListener("submit", handlePasswordChange);
}

init();
