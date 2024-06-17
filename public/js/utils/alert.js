"use strict";

export default function (type, message) {
  if (!type || !message) throw new Error("Alert requires a type and message");

  const body = document.querySelector("body");

  const alert = document.createElement("div");
  alert.classList.add("alert", `alert--${type}`);

  const content = document.createElement("p");
  content.classList.add("content");
  content.textContent = message;

  alert.append(content);
  body.append(alert);

  setTimeout(() => alert.remove(), 5000);
}
