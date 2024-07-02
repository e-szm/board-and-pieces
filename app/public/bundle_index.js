/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/src/js/logout.js":
/*!******************************!*\
  !*** ./app/src/js/logout.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/api.js */ "./app/src/js/utils/api.js");
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/alert.js */ "./app/src/js/utils/alert.js");



/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__() {
  const res = await (0,_utils_api_js__WEBPACK_IMPORTED_MODULE_0__.logout)();
  if (!res.ok || res.status !== 200) {
    (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_1__["default"])("error", "Oops! There was an issue. Please try again later.");
    return;
  }

  (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_1__["default"])("success", "Successfully logged out!");
  location.reload(true);
}


/***/ }),

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

/***/ "./node_modules/css-loader/dist/cjs.js!./app/src/css/general.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/src/css/general.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../fonts/Outfit-VariableFont_wght.ttf */ "./app/src/fonts/Outfit-VariableFont_wght.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../img/general/chessboard.jpg */ "./app/src/img/general/chessboard.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
/////////////////////////
// TYPOGRAPHY SYSTEM
/////////////////////////

- Font sizes (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

- Font weights
Default: 400
Medium: 500
Semi-bold: 600
Bold: 700

- Line heights
Default: 1
Small: 1.05
Medium: 1.2
Paragraph default: 1.6
Large: 1.8

- Letter spacing
0.5px
0.75px

/////////////////////////
// BORDER-RADIUS
/////////////////////////

Default: 9px
Medium: 11px

/////////////////////////
// WHITESPACE
/////////////////////////

- Spacing system (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/

:root {
  --primary-white: #ddd;
  --primary-white--light: #eee;
  --primary-white--darker: #bbb;
  --primary-white--highlight: #d9d9d9;

  --primary-black: #333;
  --primary-black--light: #686868;

  --primary-red: #c92a2a;
  --primary-red--light: #efbfbf;
  --primary-red--dark: #a12222;
  --primary-red--darker: #791919;

  --border-radius: 9px;
}

@font-face {
  font-family: "Outfit";
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  font-family: "Outfit", sans-serif;
  color: var(--primary-white);
  line-height: 1;
  font-weight: 400;
  background-color: var(--primary-black);
}

a:link,
a:visited {
  color: var(--primary-white);
  text-decoration: none;
  transition: color 300ms;
}

a:hover,
a:active {
  color: var(--primary-white);
}

a.inline-link {
  text-decoration: underline;
}

/* //////////////////////////////////// */
/* REUSABLE */
/* //////////////////////////////////// */

.container {
  max-width: 130rem;
  margin: 0 auto;
  padding: 3.2rem;
}

.grid {
  display: grid;
}

.grid--1-cols {
  grid-template-columns: repeat(1, 1fr);
}

.grid--2-cols {
  grid-template-columns: repeat(2, 1fr);
}

.center-text {
  text-align: center;
}

.relative {
  position: relative;
}

.chessboard {
  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(51, 51, 51, 0.85)),
    url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  background-size: cover;
  background-position: center;
}

.icon-container {
  position: absolute;
  display: flex;
  align-items: center;

  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.icon {
  /* fill: var(--primary-red);
  stroke: var(--primary-black); */
  height: 2.4rem;
  width: 2.4rem;
}

.alert {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  max-width: 40rem;
  text-align: center;
  padding: 1.2rem 2.4rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.alert--success {
  background-color: #37b24d;
}

.alert--error {
  background-color: var(--primary-red);
}

.alert-heading {
  font-size: 2.4rem;
}

.form-fieldset {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  margin-bottom: 2.4rem;
  border: none;
}

.card {
  padding: 3.2rem 4.8rem;
  background-color: var(--primary-white--light);
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.heading {
  font-weight: 600;
  letter-spacing: 1.2px;
  margin-bottom: 2.4rem;
}

.heading--primary {
  font-size: 6.2rem;
}

.heading--secondary {
  font-size: 4.8rem;
}

.heading--tertiary {
  font-size: 3.2rem;
}

.section-header {
  color: var(--primary-white--darker);
  font-size: 2.4rem;
  margin-bottom: 9.6rem;
}

.content {
  font-size: 2rem;
  letter-spacing: 0.5px;
}

button {
  color: var(--primary-white);
  font-family: "Outfit", sans-serif;
}

.btn {
  font-size: 2.4rem;
  letter-spacing: 0.5px;
  background-color: var(--primary-white);

  border: none;
  border-radius: 10px;
  padding: 1.4rem 3.2rem;

  cursor: pointer;
  transition: background-color 300ms;
}

.btn:link,
.btn:visited {
  color: var(--primary-black);

  transition: background-color 300ms;
}

.btn:hover,
.btn:active {
  background-color: var(--primary-white--light);
}

.btn--cta {
  background-color: var(--primary-red);
  font-weight: 500;
}

.btn--cta:link,
.btn--cta:visited {
  color: var(--primary-white);

  transition: background-color 300ms;
}

.btn--cta:hover,
.btn--cta:active {
  color: var(--primary-white);
  background-color: var(--primary-red--dark);
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-label,
.field-label {
  color: var(--primary-black--light);
  font-size: 1.2rem;
  letter-spacing: 1px;

  margin: 0 0 3px 3px;
}

.input-field {
  font-size: 2rem;
  font-family: "Outfit", sans-serif;
  letter-spacing: 0.8px;

  width: 100%;
  border: 1px solid var(--primary-white--darker);
  border-radius: 10px;
  padding: 0.8rem 1.6rem;
}

.hidden {
  display: none !important;
}

/* //////////////////////////////////// */
/* GENERAL */
/* //////////////////////////////////// */

.logo {
  width: 4rem;
}

/* //////////////////////////////////// */
/* Data Visualizations (D3) */
/* //////////////////////////////////// */

.section-dashboard {
  background-color: var(--primary-white);
}

.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3.2rem 0;
}

.canvas-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  max-width: 100rem;
  padding: 3.2rem 0;
  background-color: var(--primary-white--light);
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.canvas {
  position: relative;
}

.canvas-heading {
  margin-bottom: 3.2rem;
}

.graph-options {
  display: flex;
  justify-content: space-around;

  width: 100%;
}

.options-group {
  position: relative;

  display: flex;
}

.options-group::after {
  content: attr(data-title);
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);

  font-size: 1.2rem;
  font-style: italic;
  letter-spacing: 1px;
}

.options-group button:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.options-group button:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.btn--option {
  color: #333;
  font-size: 1.6rem;
  border: 1px solid var(--primary-white);
  border-radius: 0;

  transition: none;
}

.btn--option.active {
  color: var(--primary-white);
  background-color: var(--primary-black);
}

.axis text {
  font-family: "Outfit", sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 0.02rem;
  stroke: var(--primary-black);
  fill: var(--primary-black);
}

.legend-rect {
  width: 2rem;
  height: 2rem;
}

.legend-text {
  font-family: "Outfit", sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  stroke: var(--primary-black);
  fill: var(--primary-black);
}

.tooltip-container {
  position: absolute;
  display: none;

  color: var(--primary-white);
  padding: 12px 24px;
  width: max-content;
  transform: translateY(-100%);
  border: 2px solid var(--primary-white);
  border-radius: var(--border-radius);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  background-color: var(--primary-black);
}

.tooltip {
  position: relative;

  height: 100%;
}

.tooltip::before {
  position: absolute;
  left: 20px;
  bottom: -20px;
  transform: rotate(45deg);

  content: "";
  width: 18px;
  height: 18px;

  background-color: var(--primary-black);
}

.tooltip-content .tip-header {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}

.tooltip-content .tip-subheader {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.tooltip-content .tip-body {
  font-size: 2.4rem;
}

.legend-container {
  display: flex;
  gap: 40px;
}

.key-group {
  display: flex;
  align-items: center;
  column-gap: 6px;
}

.legend-shape--rect {
  height: 20px;
  width: 20px;
}

.legend-shape--circle {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.legend-text {
  color: var(--primary-black);
  font-size: 1.6rem;
}

.axis-title {
  position: absolute;

  font-size: 1.2rem;
  color: #888;
  letter-spacing: 1px;
}

.axis-title--x {
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
}

.axis-title--y {
  top: 50%;
  left: 0;
  transform: translateY(-50%) rotate(-90deg);
}
`, "",{"version":3,"sources":["webpack://./app/src/css/general.css"],"names":[],"mappings":"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","sourcesContent":["/*\n/////////////////////////\n// TYPOGRAPHY SYSTEM\n/////////////////////////\n\n- Font sizes (px)\n10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98\n\n- Font weights\nDefault: 400\nMedium: 500\nSemi-bold: 600\nBold: 700\n\n- Line heights\nDefault: 1\nSmall: 1.05\nMedium: 1.2\nParagraph default: 1.6\nLarge: 1.8\n\n- Letter spacing\n0.5px\n0.75px\n\n/////////////////////////\n// BORDER-RADIUS\n/////////////////////////\n\nDefault: 9px\nMedium: 11px\n\n/////////////////////////\n// WHITESPACE\n/////////////////////////\n\n- Spacing system (px)\n2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128\n*/\n\n:root {\n  --primary-white: #ddd;\n  --primary-white--light: #eee;\n  --primary-white--darker: #bbb;\n  --primary-white--highlight: #d9d9d9;\n\n  --primary-black: #333;\n  --primary-black--light: #686868;\n\n  --primary-red: #c92a2a;\n  --primary-red--light: #efbfbf;\n  --primary-red--dark: #a12222;\n  --primary-red--darker: #791919;\n\n  --border-radius: 9px;\n}\n\n@font-face {\n  font-family: \"Outfit\";\n  src: url(\"../fonts/Outfit-VariableFont_wght.ttf\");\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 62.5%;\n  overflow-x: hidden;\n  scroll-behavior: smooth;\n}\n\nbody {\n  font-family: \"Outfit\", sans-serif;\n  color: var(--primary-white);\n  line-height: 1;\n  font-weight: 400;\n  background-color: var(--primary-black);\n}\n\na:link,\na:visited {\n  color: var(--primary-white);\n  text-decoration: none;\n  transition: color 300ms;\n}\n\na:hover,\na:active {\n  color: var(--primary-white);\n}\n\na.inline-link {\n  text-decoration: underline;\n}\n\n/* //////////////////////////////////// */\n/* REUSABLE */\n/* //////////////////////////////////// */\n\n.container {\n  max-width: 130rem;\n  margin: 0 auto;\n  padding: 3.2rem;\n}\n\n.grid {\n  display: grid;\n}\n\n.grid--1-cols {\n  grid-template-columns: repeat(1, 1fr);\n}\n\n.grid--2-cols {\n  grid-template-columns: repeat(2, 1fr);\n}\n\n.center-text {\n  text-align: center;\n}\n\n.relative {\n  position: relative;\n}\n\n.chessboard {\n  background-image: linear-gradient(rgba(0, 0, 0, 0.85), rgba(51, 51, 51, 0.85)),\n    url(\"../img/general/chessboard.jpg\");\n  background-size: cover;\n  background-position: center;\n}\n\n.icon-container {\n  position: absolute;\n  display: flex;\n  align-items: center;\n\n  top: 50%;\n  right: 20px;\n  transform: translateY(-50%);\n}\n\n.icon {\n  /* fill: var(--primary-red);\n  stroke: var(--primary-black); */\n  height: 2.4rem;\n  width: 2.4rem;\n}\n\n.alert {\n  position: fixed;\n  top: 2rem;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 999;\n\n  max-width: 40rem;\n  text-align: center;\n  padding: 1.2rem 2.4rem;\n  border-radius: 10px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);\n}\n\n.alert--success {\n  background-color: #37b24d;\n}\n\n.alert--error {\n  background-color: var(--primary-red);\n}\n\n.alert-heading {\n  font-size: 2.4rem;\n}\n\n.form-fieldset {\n  display: flex;\n  flex-direction: column;\n  gap: 2.5rem;\n\n  margin-bottom: 2.4rem;\n  border: none;\n}\n\n.card {\n  padding: 3.2rem 4.8rem;\n  background-color: var(--primary-white--light);\n  border: none;\n  border-radius: 10px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);\n}\n\n.heading {\n  font-weight: 600;\n  letter-spacing: 1.2px;\n  margin-bottom: 2.4rem;\n}\n\n.heading--primary {\n  font-size: 6.2rem;\n}\n\n.heading--secondary {\n  font-size: 4.8rem;\n}\n\n.heading--tertiary {\n  font-size: 3.2rem;\n}\n\n.section-header {\n  color: var(--primary-white--darker);\n  font-size: 2.4rem;\n  margin-bottom: 9.6rem;\n}\n\n.content {\n  font-size: 2rem;\n  letter-spacing: 0.5px;\n}\n\nbutton {\n  color: var(--primary-white);\n  font-family: \"Outfit\", sans-serif;\n}\n\n.btn {\n  font-size: 2.4rem;\n  letter-spacing: 0.5px;\n  background-color: var(--primary-white);\n\n  border: none;\n  border-radius: 10px;\n  padding: 1.4rem 3.2rem;\n\n  cursor: pointer;\n  transition: background-color 300ms;\n}\n\n.btn:link,\n.btn:visited {\n  color: var(--primary-black);\n\n  transition: background-color 300ms;\n}\n\n.btn:hover,\n.btn:active {\n  background-color: var(--primary-white--light);\n}\n\n.btn--cta {\n  background-color: var(--primary-red);\n  font-weight: 500;\n}\n\n.btn--cta:link,\n.btn--cta:visited {\n  color: var(--primary-white);\n\n  transition: background-color 300ms;\n}\n\n.btn--cta:hover,\n.btn--cta:active {\n  color: var(--primary-white);\n  background-color: var(--primary-red--dark);\n}\n\n.input-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.input-label,\n.field-label {\n  color: var(--primary-black--light);\n  font-size: 1.2rem;\n  letter-spacing: 1px;\n\n  margin: 0 0 3px 3px;\n}\n\n.input-field {\n  font-size: 2rem;\n  font-family: \"Outfit\", sans-serif;\n  letter-spacing: 0.8px;\n\n  width: 100%;\n  border: 1px solid var(--primary-white--darker);\n  border-radius: 10px;\n  padding: 0.8rem 1.6rem;\n}\n\n.hidden {\n  display: none !important;\n}\n\n/* //////////////////////////////////// */\n/* GENERAL */\n/* //////////////////////////////////// */\n\n.logo {\n  width: 4rem;\n}\n\n/* //////////////////////////////////// */\n/* Data Visualizations (D3) */\n/* //////////////////////////////////// */\n\n.section-dashboard {\n  background-color: var(--primary-white);\n}\n\n.canvas-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  padding: 3.2rem 0;\n}\n\n.canvas-card {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n\n  max-width: 100rem;\n  padding: 3.2rem 0;\n  background-color: var(--primary-white--light);\n  border: none;\n  border-radius: 10px;\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);\n}\n\n.canvas {\n  position: relative;\n}\n\n.canvas-heading {\n  margin-bottom: 3.2rem;\n}\n\n.graph-options {\n  display: flex;\n  justify-content: space-around;\n\n  width: 100%;\n}\n\n.options-group {\n  position: relative;\n\n  display: flex;\n}\n\n.options-group::after {\n  content: attr(data-title);\n  position: absolute;\n  top: -15px;\n  left: 50%;\n  transform: translateX(-50%);\n\n  font-size: 1.2rem;\n  font-style: italic;\n  letter-spacing: 1px;\n}\n\n.options-group button:first-child {\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n}\n\n.options-group button:last-child {\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n}\n\n.btn--option {\n  color: #333;\n  font-size: 1.6rem;\n  border: 1px solid var(--primary-white);\n  border-radius: 0;\n\n  transition: none;\n}\n\n.btn--option.active {\n  color: var(--primary-white);\n  background-color: var(--primary-black);\n}\n\n.axis text {\n  font-family: \"Outfit\", sans-serif;\n  font-size: 1.6rem;\n  font-weight: 300;\n  letter-spacing: 0.02rem;\n  stroke: var(--primary-black);\n  fill: var(--primary-black);\n}\n\n.legend-rect {\n  width: 2rem;\n  height: 2rem;\n}\n\n.legend-text {\n  font-family: \"Outfit\", sans-serif;\n  font-size: 1.1rem;\n  letter-spacing: 0.2rem;\n  stroke: var(--primary-black);\n  fill: var(--primary-black);\n}\n\n.tooltip-container {\n  position: absolute;\n  display: none;\n\n  color: var(--primary-white);\n  padding: 12px 24px;\n  width: max-content;\n  transform: translateY(-100%);\n  border: 2px solid var(--primary-white);\n  border-radius: var(--border-radius);\n  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);\n  background-color: var(--primary-black);\n}\n\n.tooltip {\n  position: relative;\n\n  height: 100%;\n}\n\n.tooltip::before {\n  position: absolute;\n  left: 20px;\n  bottom: -20px;\n  transform: rotate(45deg);\n\n  content: \"\";\n  width: 18px;\n  height: 18px;\n\n  background-color: var(--primary-black);\n}\n\n.tooltip-content .tip-header {\n  font-size: 2rem;\n  margin-bottom: 0.4rem;\n}\n\n.tooltip-content .tip-subheader {\n  font-size: 1.2rem;\n  margin-bottom: 1rem;\n}\n\n.tooltip-content .tip-body {\n  font-size: 2.4rem;\n}\n\n.legend-container {\n  display: flex;\n  gap: 40px;\n}\n\n.key-group {\n  display: flex;\n  align-items: center;\n  column-gap: 6px;\n}\n\n.legend-shape--rect {\n  height: 20px;\n  width: 20px;\n}\n\n.legend-shape--circle {\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n}\n\n.legend-text {\n  color: var(--primary-black);\n  font-size: 1.6rem;\n}\n\n.axis-title {\n  position: absolute;\n\n  font-size: 1.2rem;\n  color: #888;\n  letter-spacing: 1px;\n}\n\n.axis-title--x {\n  bottom: 2%;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.axis-title--y {\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%) rotate(-90deg);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/src/css/style.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/src/css/style.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* //////////////////////////////////// */
/* HEADER & NAVIGATION */
/* //////////////////////////////////// */

.header {
  background-color: #000;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.5rem 3.2rem;
}

.main-nav-list {
  display: flex;
  gap: 6.4rem;

  list-style: none;
}

.main-nav-link:link,
.main-nav-link:visited {
  font-size: 1.6rem;

  transition: color 300ms;
}

.main-nav-link:hover,
.main-nav-link:active {
  color: var(--primary-red);
}

.main-nav-list .btn--cta {
  padding: 0.8rem 1.6rem;
}

.main-nav-list .btn--cta:link,
.main-nav-list .btn--cta:visited {
  background-color: var(--primary-red--dark);

  transition: background-color 300ms;
}

.main-nav-list .btn--cta:hover,
.main-nav-list .btn--cta:active {
  color: var(--primary-white);
  background-color: var(--primary-red--darker);
}

.mobile-nav-btn {
  display: none;

  background: none;
  border: none;
  cursor: pointer;
  z-index: 999;
}

#btn--nav-open {
  position: relative;
}

#btn--nav-close {
  position: fixed;
  top: 1.5rem;
  right: 3.5rem;
}

.nav-icon {
  stroke: var(--primary-white);
  height: 5rem;
  width: 5rem;

  pointer-events: none;
}

/* //////////////////////////////////// */
/* HOME PAGE */
/* //////////////////////////////////// */

/* Hero */
.section-hero {
  height: 75rem;
  padding-top: 6.4rem;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  max-width: 70rem;
  text-align: center;
}

.hero .content {
  color: var(--primary-white--darker);
  line-height: 1.3;
}

.hero-cta-container {
  display: flex;
  justify-content: center;
  gap: 20px;

  width: 100%;
}

.hero-cta-container .btn {
  width: 80%;
}

/* About */

.section-about {
  background-color: var(--primary-black);
  padding: 9.6rem 0;
}

.about-container {
  padding: 3.2rem 6.4rem;
}

.about-grid {
  align-items: center;
  column-gap: 6.4rem;
  row-gap: 20rem;
}

.about-step {
  color: var(--primary-red--light);
}

.about-heading {
  color: var(--primary-white--light);
}

.about-image {
  max-width: 100%;
  border: 5px solid #222;
  border-radius: var(--border-radius);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);
}

.about-content .content {
  line-height: 1.5;
}

/* //////////////////////////////////// */
/* SIGNUP & LOGIN FORMS */
/* //////////////////////////////////// */

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  padding-top: 6.4rem;
}

.form-container .heading {
  margin-bottom: 0;
  text-align: center;
}

.form-container .content {
  margin-bottom: 3.2rem;
  text-align: center;
}

.form--signup,
.form--login {
  flex: 1 1 auto;
  width: 50rem;
}

.btn-submit {
  width: 100%;
}

/* //////////////////////////////////// */
/* MY ACCOUNT */
/* //////////////////////////////////// */

.account-container .heading--secondary {
  text-align: center;
}

.account-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;

  max-width: 110rem;
  margin: 0 auto;
}

.account-info-container {
  flex: 1 1 auto;

  max-width: 50rem;
  min-width: 30rem;
}

.account-card .heading--tertiary {
  color: var(--primary-black);
}

/* //////////////////////////////////// */
/* DASHBOARD */
/* //////////////////////////////////// */

.section-dashboard {
  justify-items: center;

  height: 100vh;
  padding-top: 1.8rem;
}

.dashboard {
  grid-template-columns: 30rem 1fr;
  grid-template-rows: 9rem 60rem;
  gap: 3rem;

  color: var(--primary-black);
  font-size: 2rem;
}

.dashboard-highlights {
  grid-column: 1 / -1;
  grid-row: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--primary-white--light);
  border-radius: var(--border-radius);

  padding: 3.2rem;
}

.dashboard-highlights-section {
  flex: 1 1 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  border-right: 2px solid var(--primary-white--darker);
}

.dashboard-highlights-section:last-child {
  border-right: none;
}

.highlight-text {
  color: var(--primary-black);
  font-size: 3.2rem;
  font-weight: 600;
}

.highlight-select {
  background: none;
  border: none;
}

.dashboard-sidebar {
  grid-column: 1;
  grid-row: 2;

  background-color: var(--primary-white--light);
  border-radius: var(--border-radius);
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.sidebar-label {
  margin: 2.4rem 0 1.2rem 2.4rem;
}

.sidebar-btn {
  border: none;
  text-align: left;

  color: var(--primary-black--light);
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.8px;

  padding: 0.5rem 2.4rem;
  cursor: pointer;

  transition: background-color 300ms;
}

.sidebar-btn:hover {
  background-color: var(--primary-white);
}

.sidebar-btn.active {
  color: var(--primary-black);
  background-color: var(--primary-white--highlight);
}

.dashboard-main {
  grid-column: 2;
  grid-row: 2;

  display: flex;
  justify-content: center;

  background-color: var(--primary-white--light);
  border-radius: var(--border-radius);
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;

  margin-top: 2.6rem;
  margin-left: 2.6rem;

  letter-spacing: 0.5px;
}

#configuration,
#summary {
  padding: 3.2rem 4.8rem;
}

#configuration .heading,
#summary .heading {
  margin-bottom: 3.2rem;
}

.form--generate-dashboard {
  max-width: 50rem;
}

.form--generate-dashboard #username {
  margin-bottom: 3.2rem;
}

.month-year-container {
  display: flex;
  gap: 3rem;
}

.btn-submit--generate-dashboard {
  margin-top: 3.2rem;
}

.wins {
  color: var(--primary-red);
}

.draws {
  color: var(--primary-red--light);
}

.losses {
  color: var(--primary-red--darker);
}

/* //////////////////////////////////// */
/* Opening Statistics */
/* //////////////////////////////////// */

#canvas--opening-stats {
  width: 70rem;
  height: 43rem;
}

#canvas--opening-stats .graph {
  margin: 5rem 3.2rem 2rem 20rem;
  padding: 0.02rem; /* 0.00 through 0.10 */
}

#canvas--opening-stats .bar:hover {
  stroke: var(--primary-black);
  stroke-width: 2px;
}

/* //////////////////////////////////// */
/* Rating Trends */
/* //////////////////////////////////// */

#canvas--rating-trends {
  width: 70rem;
  height: 45rem;
}

#canvas--rating-trends .graph {
  margin: 5rem 3.2rem 5.6rem 4.8rem;
  padding: 0.02rem; /* 0.00 through 0.10 */
}

#canvas--rating-trends .path {
  fill: none;
  stroke-width: 2;
}

#canvas--rating-trends .dotted-line {
  stroke: var(--primary-white--darker);
  stroke-width: 1;
  stroke-dasharray: 5;
}

/* //////////////////////////////////// */
/* Match Duration Analysis */
/* //////////////////////////////////// */

#canvas--match-duration-analysis {
  width: 70rem;
  height: 45rem;
}

#canvas--match-duration-analysis .graph {
  margin: 4rem 4rem 5.6rem 8rem;
  padding: 0.02rem; /* 0.00 through 0.10 */
}

.footer {
  height: 200px;
  width: 100%;
  background-color: #222;

  margin-top: 10rem;
}

/* //////////////////////////////////// */
/* MEDIA QUERIES */
/* //////////////////////////////////// */

@media (max-width: 70em) {
  html {
    font-size: 56.25%;
  }

  .highlight-text {
    font-size: 2.6rem;
  }

  #canvas--opening-stats {
    width: 65rem;
    height: 43rem;
  }

  #canvas--rating-trends {
    width: 65rem;
    height: 43rem;
  }

  #canvas--match-duration-analysis {
    width: 65rem;
    height: 45rem;
  }
}

@media (max-width: 60em) {
  html {
    font-size: 50%;
  }

  .about-heading {
    font-size: 2.8rem;
  }

  #canvas--opening-stats {
    width: 59rem;
    height: 43rem;
  }

  #canvas--rating-trends {
    width: 59rem;
    height: 45rem;
  }

  #canvas--match-duration-analysis {
    width: 59rem;
    height: 45rem;
  }
}

@media (max-width: 51em) {
  .grid--2-cols {
    grid-template-columns: 1fr;
    row-gap: 4.8rem;
  }

  /* Mobile Navigation */

  .nav-list-container.open #btn--nav-close {
    display: inline-block;
  }

  .nav-list-container.open #btn--nav-open {
    display: none;
  }

  .nav-list-container.open .main-nav-list {
    display: flex;
  }

  .nav-list-container.closed #btn--nav-close {
    display: none;
  }

  .nav-list-container.closed #btn--nav-open {
    display: inline-block;
  }

  .nav-list-container.closed .main-nav-list {
    display: none;
  }

  .main-nav-list {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: rgba(51, 51, 51, 0.99);
  }

  .main-nav-link:link,
  .main-nav-link:visited {
    font-size: 3.2rem;
  }

  /* Hero section */

  .hero-cta-container {
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
  }

  /* About section */

  .about-grid {
    justify-items: center;

    text-align: center;
  }

  .about-image {
    max-width: 75%;
    margin-bottom: 6.4rem;
  }

  #about-content-1 {
    grid-row: 1;
  }

  #about-content-2 {
    grid-row: 3;
  }

  #about-content-3 {
    grid-row: 5;
  }

  #about-content-4 {
    grid-row: 7;
  }

  #about-img-1 {
    grid-row: 2;
  }

  #about-img-2 {
    grid-row: 4;
  }

  #about-img-3 {
    grid-row: 6;
  }

  #about-img-4 {
    grid-row: 8;
  }

  /* Login & Signup */

  .card {
    padding: 3.2rem 3rem;
  }

  .form--signup,
  .form--login {
    width: 85%;
  }

  .input-field {
    font-size: 2rem;
    padding: 1.2rem 1.6rem;
  }

  /* Dashboard */

  .dashboard-container {
    padding: 1.2rem;
  }

  .dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr;

    font-size: 1.8rem;
  }

  .dashboard-highlights {
    grid-column: 1;
    grid-row: 1;

    flex-wrap: wrap;
    column-gap: 4.8rem;
    row-gap: 1.2rem;

    padding: 2rem;
  }

  .dashboard-highlights-section {
    border: none;

    justify-content: space-between;
    gap: 1.2rem;
  }

  .dashboard-sidebar {
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translateY(98%);
    z-index: 997;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
    text-align: center;

    background-color: rgba(51, 51, 51, 0.99);

    transition: transform 300ms;
  }

  .dashboard-sidebar.open {
    transform: translateY(40%);
  }

  .dashboard-sidebar::after {
    content: "Change view";
    position: absolute;
    top: 0;
    right: 10px;
    transform: translateY(-97%);

    color: var(--primary-white);
    background-color: inherit;
    padding: 1.4rem 2rem;
    border: solid 1px var(--primary-white);
    border-bottom: none;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .sidebar-mobile-header {
    color: var(--primary-white);
  }

  .sidebar-container {
    align-items: stretch;
  }

  .sidebar-label {
    margin: 3.2rem 0 1rem 0;
  }

  .sidebar-btn {
    background: none;
    color: var(--primary-white);
    text-align: center;
  }

  .sidebar-btn.active {
    color: var(--primary-red--light);
    background: none;
  }

  .dashboard-main {
    grid-column: 1;
    grid-row: 2;
  }

  #configuration,
  #summary {
    padding: 2rem;
  }

  .main-content .heading {
    font-size: 2.4rem;
  }

  .main-content .content {
    font-size: 1.8rem;
  }
}

@media (max-width: 34em) {
  .dashboard {
    gap: 1.6rem;
  }

  .field-label {
    font-size: 1.2rem;
  }

  .highlight-text {
    font-size: 2.6rem;
  }

  .graph-options {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }

  .btn--option {
    padding: 1.4rem 2.4rem;
  }

  #canvas--opening-stats {
    width: 37rem;
    height: 43rem;
  }

  #canvas--opening-stats .graph {
    margin: 5rem 2.6rem 2rem 12rem;
  }

  #canvas--rating-trends {
    width: 37rem;
    height: 45rem;
  }

  #canvas--rating-trends .graph {
    margin: 5rem 2rem 5.6rem 4rem;
  }

  #canvas--match-duration-analysis {
    width: 37rem;
    height: 45rem;
  }

  #canvas--match-duration-analysis .graph {
    margin: 4rem 3rem 5.6rem 5rem;
  }

  #canvas--match-duration-analysis .axis-title--y {
    left: -23px;
  }

  .axis text {
    font-size: 1.2rem;
  }

  .legend-container {
    align-self: stretch;
    justify-content: space-between;
    gap: 0;

    padding: 1rem;
  }
}
`, "",{"version":3,"sources":["webpack://./app/src/css/style.css"],"names":[],"mappings":"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","sourcesContent":["/* //////////////////////////////////// */\n/* HEADER & NAVIGATION */\n/* //////////////////////////////////// */\n\n.header {\n  background-color: #000;\n}\n\n.main-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  padding: 1.5rem 3.2rem;\n}\n\n.main-nav-list {\n  display: flex;\n  gap: 6.4rem;\n\n  list-style: none;\n}\n\n.main-nav-link:link,\n.main-nav-link:visited {\n  font-size: 1.6rem;\n\n  transition: color 300ms;\n}\n\n.main-nav-link:hover,\n.main-nav-link:active {\n  color: var(--primary-red);\n}\n\n.main-nav-list .btn--cta {\n  padding: 0.8rem 1.6rem;\n}\n\n.main-nav-list .btn--cta:link,\n.main-nav-list .btn--cta:visited {\n  background-color: var(--primary-red--dark);\n\n  transition: background-color 300ms;\n}\n\n.main-nav-list .btn--cta:hover,\n.main-nav-list .btn--cta:active {\n  color: var(--primary-white);\n  background-color: var(--primary-red--darker);\n}\n\n.mobile-nav-btn {\n  display: none;\n\n  background: none;\n  border: none;\n  cursor: pointer;\n  z-index: 999;\n}\n\n#btn--nav-open {\n  position: relative;\n}\n\n#btn--nav-close {\n  position: fixed;\n  top: 1.5rem;\n  right: 3.5rem;\n}\n\n.nav-icon {\n  stroke: var(--primary-white);\n  height: 5rem;\n  width: 5rem;\n\n  pointer-events: none;\n}\n\n/* //////////////////////////////////// */\n/* HOME PAGE */\n/* //////////////////////////////////// */\n\n/* Hero */\n.section-hero {\n  height: 75rem;\n  padding-top: 6.4rem;\n}\n\n.hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 3.2rem;\n\n  max-width: 70rem;\n  text-align: center;\n}\n\n.hero .content {\n  color: var(--primary-white--darker);\n  line-height: 1.3;\n}\n\n.hero-cta-container {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n\n  width: 100%;\n}\n\n.hero-cta-container .btn {\n  width: 80%;\n}\n\n/* About */\n\n.section-about {\n  background-color: var(--primary-black);\n  padding: 9.6rem 0;\n}\n\n.about-container {\n  padding: 3.2rem 6.4rem;\n}\n\n.about-grid {\n  align-items: center;\n  column-gap: 6.4rem;\n  row-gap: 20rem;\n}\n\n.about-step {\n  color: var(--primary-red--light);\n}\n\n.about-heading {\n  color: var(--primary-white--light);\n}\n\n.about-image {\n  max-width: 100%;\n  border: 5px solid #222;\n  border-radius: var(--border-radius);\n  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);\n}\n\n.about-content .content {\n  line-height: 1.5;\n}\n\n/* //////////////////////////////////// */\n/* SIGNUP & LOGIN FORMS */\n/* //////////////////////////////////// */\n\n.form-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2rem;\n\n  padding-top: 6.4rem;\n}\n\n.form-container .heading {\n  margin-bottom: 0;\n  text-align: center;\n}\n\n.form-container .content {\n  margin-bottom: 3.2rem;\n  text-align: center;\n}\n\n.form--signup,\n.form--login {\n  flex: 1 1 auto;\n  width: 50rem;\n}\n\n.btn-submit {\n  width: 100%;\n}\n\n/* //////////////////////////////////// */\n/* MY ACCOUNT */\n/* //////////////////////////////////// */\n\n.account-container .heading--secondary {\n  text-align: center;\n}\n\n.account-card {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 50px;\n\n  max-width: 110rem;\n  margin: 0 auto;\n}\n\n.account-info-container {\n  flex: 1 1 auto;\n\n  max-width: 50rem;\n  min-width: 30rem;\n}\n\n.account-card .heading--tertiary {\n  color: var(--primary-black);\n}\n\n/* //////////////////////////////////// */\n/* DASHBOARD */\n/* //////////////////////////////////// */\n\n.section-dashboard {\n  justify-items: center;\n\n  height: 100vh;\n  padding-top: 1.8rem;\n}\n\n.dashboard {\n  grid-template-columns: 30rem 1fr;\n  grid-template-rows: 9rem 60rem;\n  gap: 3rem;\n\n  color: var(--primary-black);\n  font-size: 2rem;\n}\n\n.dashboard-highlights {\n  grid-column: 1 / -1;\n  grid-row: 1;\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  background-color: var(--primary-white--light);\n  border-radius: var(--border-radius);\n\n  padding: 3.2rem;\n}\n\n.dashboard-highlights-section {\n  flex: 1 1 auto;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4rem;\n\n  border-right: 2px solid var(--primary-white--darker);\n}\n\n.dashboard-highlights-section:last-child {\n  border-right: none;\n}\n\n.highlight-text {\n  color: var(--primary-black);\n  font-size: 3.2rem;\n  font-weight: 600;\n}\n\n.highlight-select {\n  background: none;\n  border: none;\n}\n\n.dashboard-sidebar {\n  grid-column: 1;\n  grid-row: 2;\n\n  background-color: var(--primary-white--light);\n  border-radius: var(--border-radius);\n}\n\n.sidebar-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n}\n\n.sidebar-label {\n  margin: 2.4rem 0 1.2rem 2.4rem;\n}\n\n.sidebar-btn {\n  border: none;\n  text-align: left;\n\n  color: var(--primary-black--light);\n  font-size: 2rem;\n  font-weight: 400;\n  letter-spacing: 0.8px;\n\n  padding: 0.5rem 2.4rem;\n  cursor: pointer;\n\n  transition: background-color 300ms;\n}\n\n.sidebar-btn:hover {\n  background-color: var(--primary-white);\n}\n\n.sidebar-btn.active {\n  color: var(--primary-black);\n  background-color: var(--primary-white--highlight);\n}\n\n.dashboard-main {\n  grid-column: 2;\n  grid-row: 2;\n\n  display: flex;\n  justify-content: center;\n\n  background-color: var(--primary-white--light);\n  border-radius: var(--border-radius);\n}\n\n.summary-list {\n  display: flex;\n  flex-direction: column;\n  gap: 4rem;\n\n  margin-top: 2.6rem;\n  margin-left: 2.6rem;\n\n  letter-spacing: 0.5px;\n}\n\n#configuration,\n#summary {\n  padding: 3.2rem 4.8rem;\n}\n\n#configuration .heading,\n#summary .heading {\n  margin-bottom: 3.2rem;\n}\n\n.form--generate-dashboard {\n  max-width: 50rem;\n}\n\n.form--generate-dashboard #username {\n  margin-bottom: 3.2rem;\n}\n\n.month-year-container {\n  display: flex;\n  gap: 3rem;\n}\n\n.btn-submit--generate-dashboard {\n  margin-top: 3.2rem;\n}\n\n.wins {\n  color: var(--primary-red);\n}\n\n.draws {\n  color: var(--primary-red--light);\n}\n\n.losses {\n  color: var(--primary-red--darker);\n}\n\n/* //////////////////////////////////// */\n/* Opening Statistics */\n/* //////////////////////////////////// */\n\n#canvas--opening-stats {\n  width: 70rem;\n  height: 43rem;\n}\n\n#canvas--opening-stats .graph {\n  margin: 5rem 3.2rem 2rem 20rem;\n  padding: 0.02rem; /* 0.00 through 0.10 */\n}\n\n#canvas--opening-stats .bar:hover {\n  stroke: var(--primary-black);\n  stroke-width: 2px;\n}\n\n/* //////////////////////////////////// */\n/* Rating Trends */\n/* //////////////////////////////////// */\n\n#canvas--rating-trends {\n  width: 70rem;\n  height: 45rem;\n}\n\n#canvas--rating-trends .graph {\n  margin: 5rem 3.2rem 5.6rem 4.8rem;\n  padding: 0.02rem; /* 0.00 through 0.10 */\n}\n\n#canvas--rating-trends .path {\n  fill: none;\n  stroke-width: 2;\n}\n\n#canvas--rating-trends .dotted-line {\n  stroke: var(--primary-white--darker);\n  stroke-width: 1;\n  stroke-dasharray: 5;\n}\n\n/* //////////////////////////////////// */\n/* Match Duration Analysis */\n/* //////////////////////////////////// */\n\n#canvas--match-duration-analysis {\n  width: 70rem;\n  height: 45rem;\n}\n\n#canvas--match-duration-analysis .graph {\n  margin: 4rem 4rem 5.6rem 8rem;\n  padding: 0.02rem; /* 0.00 through 0.10 */\n}\n\n.footer {\n  height: 200px;\n  width: 100%;\n  background-color: #222;\n\n  margin-top: 10rem;\n}\n\n/* //////////////////////////////////// */\n/* MEDIA QUERIES */\n/* //////////////////////////////////// */\n\n@media (max-width: 70em) {\n  html {\n    font-size: 56.25%;\n  }\n\n  .highlight-text {\n    font-size: 2.6rem;\n  }\n\n  #canvas--opening-stats {\n    width: 65rem;\n    height: 43rem;\n  }\n\n  #canvas--rating-trends {\n    width: 65rem;\n    height: 43rem;\n  }\n\n  #canvas--match-duration-analysis {\n    width: 65rem;\n    height: 45rem;\n  }\n}\n\n@media (max-width: 60em) {\n  html {\n    font-size: 50%;\n  }\n\n  .about-heading {\n    font-size: 2.8rem;\n  }\n\n  #canvas--opening-stats {\n    width: 59rem;\n    height: 43rem;\n  }\n\n  #canvas--rating-trends {\n    width: 59rem;\n    height: 45rem;\n  }\n\n  #canvas--match-duration-analysis {\n    width: 59rem;\n    height: 45rem;\n  }\n}\n\n@media (max-width: 51em) {\n  .grid--2-cols {\n    grid-template-columns: 1fr;\n    row-gap: 4.8rem;\n  }\n\n  /* Mobile Navigation */\n\n  .nav-list-container.open #btn--nav-close {\n    display: inline-block;\n  }\n\n  .nav-list-container.open #btn--nav-open {\n    display: none;\n  }\n\n  .nav-list-container.open .main-nav-list {\n    display: flex;\n  }\n\n  .nav-list-container.closed #btn--nav-close {\n    display: none;\n  }\n\n  .nav-list-container.closed #btn--nav-open {\n    display: inline-block;\n  }\n\n  .nav-list-container.closed .main-nav-list {\n    display: none;\n  }\n\n  .main-nav-list {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 998;\n\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n\n    width: 100%;\n    height: 100%;\n\n    background-color: rgba(51, 51, 51, 0.99);\n  }\n\n  .main-nav-link:link,\n  .main-nav-link:visited {\n    font-size: 3.2rem;\n  }\n\n  /* Hero section */\n\n  .hero-cta-container {\n    flex-direction: column;\n    align-items: center;\n\n    margin: 0 auto;\n  }\n\n  /* About section */\n\n  .about-grid {\n    justify-items: center;\n\n    text-align: center;\n  }\n\n  .about-image {\n    max-width: 75%;\n    margin-bottom: 6.4rem;\n  }\n\n  #about-content-1 {\n    grid-row: 1;\n  }\n\n  #about-content-2 {\n    grid-row: 3;\n  }\n\n  #about-content-3 {\n    grid-row: 5;\n  }\n\n  #about-content-4 {\n    grid-row: 7;\n  }\n\n  #about-img-1 {\n    grid-row: 2;\n  }\n\n  #about-img-2 {\n    grid-row: 4;\n  }\n\n  #about-img-3 {\n    grid-row: 6;\n  }\n\n  #about-img-4 {\n    grid-row: 8;\n  }\n\n  /* Login & Signup */\n\n  .card {\n    padding: 3.2rem 3rem;\n  }\n\n  .form--signup,\n  .form--login {\n    width: 85%;\n  }\n\n  .input-field {\n    font-size: 2rem;\n    padding: 1.2rem 1.6rem;\n  }\n\n  /* Dashboard */\n\n  .dashboard-container {\n    padding: 1.2rem;\n  }\n\n  .dashboard {\n    grid-template-columns: 1fr;\n    grid-template-rows: 3fr;\n\n    font-size: 1.8rem;\n  }\n\n  .dashboard-highlights {\n    grid-column: 1;\n    grid-row: 1;\n\n    flex-wrap: wrap;\n    column-gap: 4.8rem;\n    row-gap: 1.2rem;\n\n    padding: 2rem;\n  }\n\n  .dashboard-highlights-section {\n    border: none;\n\n    justify-content: space-between;\n    gap: 1.2rem;\n  }\n\n  .dashboard-sidebar {\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    transform: translateY(98%);\n    z-index: 997;\n\n    display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start;\n\n    width: 100%;\n    height: 100%;\n    text-align: center;\n\n    background-color: rgba(51, 51, 51, 0.99);\n\n    transition: transform 300ms;\n  }\n\n  .dashboard-sidebar.open {\n    transform: translateY(40%);\n  }\n\n  .dashboard-sidebar::after {\n    content: \"Change view\";\n    position: absolute;\n    top: 0;\n    right: 10px;\n    transform: translateY(-97%);\n\n    color: var(--primary-white);\n    background-color: inherit;\n    padding: 1.4rem 2rem;\n    border: solid 1px var(--primary-white);\n    border-bottom: none;\n    border-top-left-radius: var(--border-radius);\n    border-top-right-radius: var(--border-radius);\n  }\n\n  .sidebar-mobile-header {\n    color: var(--primary-white);\n  }\n\n  .sidebar-container {\n    align-items: stretch;\n  }\n\n  .sidebar-label {\n    margin: 3.2rem 0 1rem 0;\n  }\n\n  .sidebar-btn {\n    background: none;\n    color: var(--primary-white);\n    text-align: center;\n  }\n\n  .sidebar-btn.active {\n    color: var(--primary-red--light);\n    background: none;\n  }\n\n  .dashboard-main {\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  #configuration,\n  #summary {\n    padding: 2rem;\n  }\n\n  .main-content .heading {\n    font-size: 2.4rem;\n  }\n\n  .main-content .content {\n    font-size: 1.8rem;\n  }\n}\n\n@media (max-width: 34em) {\n  .dashboard {\n    gap: 1.6rem;\n  }\n\n  .field-label {\n    font-size: 1.2rem;\n  }\n\n  .highlight-text {\n    font-size: 2.6rem;\n  }\n\n  .graph-options {\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 3rem;\n  }\n\n  .btn--option {\n    padding: 1.4rem 2.4rem;\n  }\n\n  #canvas--opening-stats {\n    width: 37rem;\n    height: 43rem;\n  }\n\n  #canvas--opening-stats .graph {\n    margin: 5rem 2.6rem 2rem 12rem;\n  }\n\n  #canvas--rating-trends {\n    width: 37rem;\n    height: 45rem;\n  }\n\n  #canvas--rating-trends .graph {\n    margin: 5rem 2rem 5.6rem 4rem;\n  }\n\n  #canvas--match-duration-analysis {\n    width: 37rem;\n    height: 45rem;\n  }\n\n  #canvas--match-duration-analysis .graph {\n    margin: 4rem 3rem 5.6rem 5rem;\n  }\n\n  #canvas--match-duration-analysis .axis-title--y {\n    left: -23px;\n  }\n\n  .axis text {\n    font-size: 1.2rem;\n  }\n\n  .legend-container {\n    align-self: stretch;\n    justify-content: space-between;\n    gap: 0;\n\n    padding: 1rem;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./app/src/css/general.css":
/*!*********************************!*\
  !*** ./app/src/css/general.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_general_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./general.css */ "./node_modules/css-loader/dist/cjs.js!./app/src/css/general.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_general_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_general_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_general_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_general_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./app/src/css/style.css":
/*!*******************************!*\
  !*** ./app/src/css/style.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./app/src/css/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./app/src/fonts/Outfit-VariableFont_wght.ttf":
/*!****************************************************!*\
  !*** ./app/src/fonts/Outfit-VariableFont_wght.ttf ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "Outfit-VariableFont_wght.ttf";

/***/ }),

/***/ "./app/src/img/about/configuration.png":
/*!*********************************************!*\
  !*** ./app/src/img/about/configuration.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "configuration.png";

/***/ }),

/***/ "./app/src/img/about/duration-analysis.png":
/*!*************************************************!*\
  !*** ./app/src/img/about/duration-analysis.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "duration-analysis.png";

/***/ }),

/***/ "./app/src/img/about/opening-stats.png":
/*!*********************************************!*\
  !*** ./app/src/img/about/opening-stats.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "opening-stats.png";

/***/ }),

/***/ "./app/src/img/about/rating-trends.png":
/*!*********************************************!*\
  !*** ./app/src/img/about/rating-trends.png ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "rating-trends.png";

/***/ }),

/***/ "./app/src/img/general/chessboard.jpg":
/*!********************************************!*\
  !*** ./app/src/img/general/chessboard.jpg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "chessboard.jpg";

/***/ }),

/***/ "./app/src/img/general/logo-64x64.png":
/*!********************************************!*\
  !*** ./app/src/img/general/logo-64x64.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "logo-64x64.png";

/***/ }),

/***/ "./app/src/img/general/logo-full.png":
/*!*******************************************!*\
  !*** ./app/src/img/general/logo-full.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "logo-full.png";

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
/******/ 			id: moduleId,
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle_index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./app/src/js/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_general_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/general.css */ "./app/src/css/general.css");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/style.css */ "./app/src/css/style.css");
/* harmony import */ var _img_general_chessboard_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/general/chessboard.jpg */ "./app/src/img/general/chessboard.jpg");
/* harmony import */ var _img_general_logo_full_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../img/general/logo-full.png */ "./app/src/img/general/logo-full.png");
/* harmony import */ var _img_general_logo_64x64_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../img/general/logo-64x64.png */ "./app/src/img/general/logo-64x64.png");
/* harmony import */ var _img_about_configuration_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../img/about/configuration.png */ "./app/src/img/about/configuration.png");
/* harmony import */ var _img_about_duration_analysis_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img/about/duration-analysis.png */ "./app/src/img/about/duration-analysis.png");
/* harmony import */ var _img_about_opening_stats_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../img/about/opening-stats.png */ "./app/src/img/about/opening-stats.png");
/* harmony import */ var _img_about_rating_trends_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../img/about/rating-trends.png */ "./app/src/img/about/rating-trends.png");
/* harmony import */ var _logout_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./logout.js */ "./app/src/js/logout.js");















function handleClickNav(e) {
  const clicked = e.target;

  if (clicked.id === "logout") (0,_logout_js__WEBPACK_IMPORTED_MODULE_9__["default"])();
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

/******/ })()
;
//# sourceMappingURL=bundle_index.js.map