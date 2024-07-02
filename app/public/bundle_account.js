/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/src/js/utils/alert.js":
/*!***********************************!*\
  !*** ./app/src/js/utils/alert.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(type, message) {
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


/***/ }),

/***/ "./app/src/js/utils/api.js":
/*!*********************************!*\
  !*** ./app/src/js/utils/api.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changePassword: () => (/* binding */ changePassword),
/* harmony export */   getDurationStats: () => (/* binding */ getDurationStats),
/* harmony export */   getOpeningStats: () => (/* binding */ getOpeningStats),
/* harmony export */   getRatingTrends: () => (/* binding */ getRatingTrends),
/* harmony export */   getRefresh: () => (/* binding */ getRefresh),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   signup: () => (/* binding */ signup)
/* harmony export */ });


async function changePassword(obj) {
  const url = "/api/v1/users/change-my-password";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(obj);

  return await fetch(url, {
    method: "PATCH",
    headers,
    body,
  });
}

async function getDurationStats(start, end) {
  const url = `/api/v1/matches/duration-stats/start/${start}/end/${end}`;

  return await fetch(url);
}

async function getOpeningStats(start, end) {
  const url = `/api/v1/matches/opening-stats/start/${start}/end/${end}`;

  return await fetch(url);
}

async function getRatingTrends(start, end) {
  const url = `/api/v1/matches/rating-trends/start/${start}/end/${end}`;

  return await fetch(url);
}

async function getRefresh(start, end) {
  const url = `/api/v1/matches/refresh/start/${start}/end/${end}`;

  return await fetch(url);
}

async function login(obj) {
  const url = "/api/v1/users/login";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(obj);

  return await fetch(url, {
    method: "POST",
    headers,
    body,
  });
}

async function logout() {
  const url = "/api/v1/users/logout";

  return await fetch(url);
}

async function signup(obj) {
  const url = "/api/v1/users/signup";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const body = JSON.stringify(obj);

  return await fetch(url, {
    method: "POST",
    headers,
    body,
  });
}


/***/ }),

/***/ "./app/src/js/utils/formHelper.js":
/*!****************************************!*\
  !*** ./app/src/js/utils/formHelper.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearInput: () => (/* binding */ clearInput),
/* harmony export */   disableForm: () => (/* binding */ disableForm),
/* harmony export */   enableForm: () => (/* binding */ enableForm)
/* harmony export */ });


function clearInput(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
}

function disableForm(form, message) {
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector(".btn-submit");

  fieldset.setAttribute("disabled", "true");
  submitButton.setAttribute("disabled", "true");
  submitButton.textContent = message;
}

function enableForm(form, message) {
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector(".btn-submit");

  fieldset.removeAttribute("disabled");
  submitButton.removeAttribute("disabled");
  submitButton.textContent = message;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./app/src/js/account.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_formHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/formHelper.js */ "./app/src/js/utils/formHelper.js");
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/api.js */ "./app/src/js/utils/api.js");
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/alert.js */ "./app/src/js/utils/alert.js");






async function handlePasswordChange(e) {
  e.preventDefault();

  (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_0__.disableForm)(this, "Changing...");

  const oldPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const newPasswordConfirm = document.getElementById("confirm-password").value;

  if (newPassword !== newPasswordConfirm) {
    (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_2__["default"])("error", "Passwords must match.");
    (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_0__.enableForm)(this, "Change Password");
    return;
  }

  const res = await (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_1__.changePassword)({
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });
  const data = await res.json();

  if (!res.ok || res.status !== 200) {
    (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_2__["default"])("error", data.message);
    (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_0__.enableForm)(this, "Change Password");
    return;
  }

  (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_2__["default"])("success", "Password changed successfully!");
  (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_0__.clearInput)(this);
  (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_0__.enableForm)(this, "Change Password");
  location.reload(true);
}

function init() {
  const passwordForm = document.querySelector(".form--password");
  if (!passwordForm) {
    (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_2__["default"])("error", "Oops! Please try again later.");
    return;
  }

  passwordForm.addEventListener("submit", handlePasswordChange);
}

init();

/******/ })()
;
//# sourceMappingURL=bundle_account.js.map