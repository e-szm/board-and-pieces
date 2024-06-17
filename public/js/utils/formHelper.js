"use strict";

export function clearInput(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

export function disableForm(form, message) {
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector(".btn-submit");

  fieldset.setAttribute("disabled", "true");
  submitButton.setAttribute("disabled", "true");
  submitButton.textContent = message;
}

export function enableForm(form, message) {
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector(".btn-submit");

  fieldset.removeAttribute("disabled");
  submitButton.removeAttribute("disabled");
  submitButton.textContent = message;
}
