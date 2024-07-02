/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/src/js/dashboard.js":
/*!*********************************!*\
  !*** ./app/src/js/dashboard.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_visuals_chart_types_stacked_bar_chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-visuals/chart-types/stacked-bar-chart.js */ "./app/src/js/data-visuals/chart-types/stacked-bar-chart.js");
/* harmony import */ var _data_visuals_chart_types_line_chart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-visuals/chart-types/line-chart.js */ "./app/src/js/data-visuals/chart-types/line-chart.js");
/* harmony import */ var _data_visuals_chart_types_scatterplot_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-visuals/chart-types/scatterplot.js */ "./app/src/js/data-visuals/chart-types/scatterplot.js");
/* harmony import */ var _utils_alert_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/alert.js */ "./app/src/js/utils/alert.js");
/* harmony import */ var _utils_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/api.js */ "./app/src/js/utils/api.js");
/* harmony import */ var _utils_formHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/formHelper.js */ "./app/src/js/utils/formHelper.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_data_visuals_chart_types_stacked_bar_chart_js__WEBPACK_IMPORTED_MODULE_0__, _data_visuals_chart_types_line_chart_js__WEBPACK_IMPORTED_MODULE_1__, _data_visuals_chart_types_scatterplot_js__WEBPACK_IMPORTED_MODULE_2__]);
([_data_visuals_chart_types_stacked_bar_chart_js__WEBPACK_IMPORTED_MODULE_0__, _data_visuals_chart_types_line_chart_js__WEBPACK_IMPORTED_MODULE_1__, _data_visuals_chart_types_scatterplot_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









class Dashboard {
  constructor(dashboard) {
    if (!dashboard) this.abort();

    this.dashboard = dashboard;
    this.availVizMap = new Map();
    this.startDateStr = null;
    this.endDateStr = null;
    this.monthAbbr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    this.init();
  }

  // INITIALIZATION

  init() {
    this.highlights = document.getElementById("highlights");
    this.sidebar = document.getElementById("sidebar");
    this.main = document.getElementById("main");
    this.configForm = document.getElementById("config-form");

    if (!this.highlights || !this.sidebar || !this.main) this.abort();

    this.initializeOpeningStats();
    this.initializeRatingTrends();
    this.initializeDurationStats();

    this.updateConfigDateRange(new Date());
    this.beginListening();
  }

  abort() {
    (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__["default"])("error", "Oops! Please try again later.");
    throw new Error("Oops! Please try again later");
  }

  beginListening() {
    this.sidebar.addEventListener("click", this.handleClickSidebar.bind(this));
    this.configForm.addEventListener(
      "submit",
      this.handleSubmitConfigure.bind(this)
    );

    window
      .matchMedia("(max-width: 70em)")
      .addEventListener("change", this.handleChangeMQ70.bind(this));
    window
      .matchMedia("(max-width: 60em)")
      .addEventListener("change", this.handleChangeMQ70.bind(this));
    window
      .matchMedia("(max-width: 34em)")
      .addEventListener("change", this.handleChangeMQ34.bind(this));
  }

  initializeDurationStats() {
    const durationStats = document.getElementById("match-duration-analysis");

    const scatterplot = new _data_visuals_chart_types_scatterplot_js__WEBPACK_IMPORTED_MODULE_2__["default"](
      JSON.parse(durationStats.dataset.graphOptions)
    );
    scatterplot.createLegend("circle", "after");
    scatterplot.createAxisLabel({
      x: "Match length (minutes)",
      y: "# of moves",
    });

    this.availVizMap.set(durationStats.id, {
      startDateStr: null,
      endDateStr: null,
      viz: scatterplot,
    });
  }

  initializeOpeningStats() {
    const openingStats = document.getElementById("opening-statistics");

    const stackedBarChart = new _data_visuals_chart_types_stacked_bar_chart_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      JSON.parse(openingStats.dataset.graphOptions)
    );
    stackedBarChart.createLegend("rect");
    stackedBarChart.initializeTooltip(stackedBarChart.canvas, "bar");

    this.availVizMap.set(openingStats.id, {
      startDateStr: null,
      endDateStr: null,
      viz: stackedBarChart,
    });
  }

  initializeRatingTrends() {
    const ratingTrends = document.getElementById("rating-trends");

    const lineChart = new _data_visuals_chart_types_line_chart_js__WEBPACK_IMPORTED_MODULE_1__["default"](
      JSON.parse(ratingTrends.dataset.graphOptions)
    );
    lineChart.initializeTooltip(lineChart.canvas, "circle");

    this.availVizMap.set(ratingTrends.id, {
      startDateStr: null,
      endDateStr: null,
      viz: lineChart,
    });
  }

  // EVENT LISTENERS

  async handleClickSidebar(e) {
    e.preventDefault();
    this.toggleSidebar();

    const clicked = e.target;
    if (clicked.nodeName !== "BUTTON" || clicked.classList.contains("active"))
      return;
    if (!this.dashConfigured()) {
      (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__["default"])("error", "You must first configure the dashboard.");
      return;
    }

    const content = this.displayClickedContent(clicked);
    const action = content.dataset.graphAction;
    if (!action) {
      this.activateClickedBtn(clicked);
      return;
    }

    await this.updateDataViz(content, action);
    this.activateClickedBtn(clicked);
  }

  handleChangeMQ70(e) {
    if (!this.dashConfigured()) return;

    this.availVizMap.forEach((viz) => {
      if (!viz.startDateStr || !viz.endDateStr) return;
      viz.viz.updateGraphData();
    });
  }

  handleChangeMQ60(e) {
    if (!this.dashConfigured()) return;

    this.availVizMap.forEach((viz) => {
      if (!viz.startDateStr || !viz.endDateStr) return;
      viz.viz.updateGraphData();
    });
  }

  handleChangeMQ34(e) {
    if (!this.dashConfigured()) return;

    this.availVizMap.forEach((viz) => {
      if (!viz.startDateStr || !viz.endDateStr) return;
      viz.viz.updateGraphData();
    });
  }

  async handleSubmitConfigure(e) {
    e.preventDefault();

    const form = e.target;
    (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_5__.disableForm)(form, "Generating dashboard...");

    const startDateStr = `${document.getElementById("start-year").value}-${
      document.getElementById("start-month").value
    }`;
    const endDateStr = `${document.getElementById("end-year").value}-${
      document.getElementById("end-month").value
    }`;

    const res = await _utils_api_js__WEBPACK_IMPORTED_MODULE_4__.getRefresh(startDateStr, endDateStr);
    const data = await res.json();

    if (!res.ok || res.status !== 200) {
      (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__["default"])("error", data.message);
      (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_5__.enableForm)(form, "Generate");
      return;
    }

    this.startDateStr = startDateStr;
    this.endDateStr = endDateStr;

    this.updateHighlightsPanel(data.data);
    (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__["default"])("success", "Success! You may now choose a data visualization.");
    (0,_utils_formHelper_js__WEBPACK_IMPORTED_MODULE_5__.enableForm)(form, "Generate");
    this.toggleSidebar();
  }

  // UI CONTROLLERS

  activateClickedBtn(clickedBtn) {
    const btnList = this.sidebar.querySelectorAll(".sidebar-btn");

    btnList.forEach((btnEl) => btnEl.classList.remove("active"));
    clickedBtn.classList.add("active");
  }

  displayClickedContent(clickedBtn) {
    let activatedContent;
    const contentId = clickedBtn.dataset.display;
    const contentList = this.main.querySelectorAll(".main-content");

    contentList.forEach((content) => {
      if (content.id === contentId) {
        content.classList.remove("hidden");
        activatedContent = content;
      } else content.classList.add("hidden");
    });

    return activatedContent;
  }

  toggleSidebar() {
    if (window.getComputedStyle(this.sidebar).position !== "fixed") return;

    this.sidebar.classList.toggle("open");
  }

  updateConfigDateRange(startDate) {
    let month = (startDate.getMonth() + 1).toString();
    if (month.length === 1) month = "0" + month;
    const year = startDate.getFullYear();

    document.getElementById("start-month").value = month;
    document.getElementById("start-year").value = year;
    document.getElementById("end-month").value = month;
    document.getElementById("end-year").value = year;
  }

  updateHighlightsPanel(obj) {
    const { username, startDateStr, endDateStr, highlights } = obj;
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const startAbbr = this.getAbbreviatedDate(startDate);
    const endAbbr = this.getAbbreviatedDate(endDate);

    this.highlights.querySelector(".highlight-user").textContent = username;

    this.highlights.querySelector(".highlight-from").textContent = startAbbr;
    this.highlights.querySelector(".highlight-to").textContent = endAbbr;

    this.highlights.querySelector(".highlight-total").textContent =
      highlights?.total || 0;
    this.highlights.querySelector(".highlight-wins").textContent =
      highlights?.wins || 0;
    this.highlights.querySelector(".highlight-draws").textContent =
      highlights?.draws || 0;
    this.highlights.querySelector(".highlight-losses").textContent =
      highlights?.losses || 0;
  }

  // DATA VIZ GENERATION

  async updateDataViz(content, action) {
    const contentId = content.id;
    let viz = this.availVizMap.get(contentId);

    if (!this.dashConfigured()) return;
    if (
      viz.startDateStr === this.startDateStr &&
      viz.endDateStr === this.endDateStr
    )
      return;

    const res = await _utils_api_js__WEBPACK_IMPORTED_MODULE_4__[action](this.startDateStr, this.endDateStr);
    const data = await res.json();

    if (!res.ok || res.status !== 200) {
      (0,_utils_alert_js__WEBPACK_IMPORTED_MODULE_3__["default"])("error", data.message);
      return;
    }

    switch (content.dataset.graphType) {
      case "stackedBarChart":
        viz.viz.bindData(data.data.openingStats);
        break;
      case "lineChart":
        const ratingTrends = data.data.ratingTrends;
        ratingTrends.forEach((el) => (el.date = new Date(el.date)));

        viz.viz.bindData(ratingTrends);
        break;
      case "scatterplot":
        const durationStats = data.data.durationStats;
        durationStats.forEach((el) => (el.match_length = el.match_length / 60));

        viz.viz.bindData(durationStats);
        break;
    }

    viz.startDateStr = this.startDateStr;
    viz.endDateStr = this.endDateStr;
  }

  // UTILITIES

  dashConfigured() {
    if (this.startDateStr && this.endDateStr) return true;
    return false;
  }

  getAbbreviatedDate(date) {
    return (
      this.monthAbbr[date.getUTCMonth()] +
      " '" +
      date.getUTCFullYear().toString().slice(-2)
    );
  }
}

new Dashboard(document.getElementById("dashboard"));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./app/src/js/data-visuals/chart-types/line-chart.js":
/*!***********************************************************!*\
  !*** ./app/src/js/data-visuals/chart-types/line-chart.js ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LineChart)
/* harmony export */ });
/* harmony import */ var https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://cdn.jsdelivr.net/npm/d3@7/+esm */ "https://cdn.jsdelivr.net/npm/d3@7/+esm");
/* harmony import */ var _data_viz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-viz.js */ "./app/src/js/data-visuals/data-viz.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__, _data_viz_js__WEBPACK_IMPORTED_MODULE_1__]);
([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__, _data_viz_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const monthRef = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class LineChart extends _data_viz_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.x = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleUtc();
    this.y = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleLinear();
    this.line = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.line();

    this.path = this.graph.append("path").attr("class", "path");

    this.updateScaleRanges();
  }

  initializeTipListeners(container, hoverClass) {
    this.lineGroup = this.graph.append("g").attr("opacity", 0);
    this.xLine = this.lineGroup.append("line").attr("class", "dotted-line");
    this.yLine = this.lineGroup.append("line").attr("class", "dotted-line");

    // TODO: Move to Data Viz Class? Extremely similar generations, but would need to handle data difs
    function handleMouseOver(e) {
      if (!e.target.classList.contains(hoverClass)) return;

      const data = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.select(e.target).data()[0];
      const tipCont = this.tipCont._groups[0][0];

      tipCont.querySelector(".tip-header").textContent =
        data.time_class[0].toUpperCase() + data.time_class.slice(1);
      tipCont.querySelector(".tip-subheader").textContent = `${
        data.date.getMonth() + 1
      }/${data.date.getDate()}/${data.date.getFullYear()}`;
      tipCont.querySelector(
        ".tip-body"
      ).textContent = `Average Rating: ${Math.trunc(data.rating)}`;

      const leftShift =
        this.x(data.date) - 53 + this.dims.graph.marginLeft + "px";
      const topShift =
        this.y(data.rating) + this.dims.graph.marginTop - 25 + "px";

      this.tipCont.style("left", leftShift);
      this.tipCont.style("top", topShift);
      this.tipCont.style("display", "block");

      this.xLine
        .attr("x1", this.x(data.date))
        .attr("y1", this.dims.graph.height)
        .attr("x2", this.x(data.date))
        .attr("y2", this.y(data.rating));
      this.yLine
        .attr("x1", 0)
        .attr("y1", this.y(data.rating))
        .attr("x2", this.x(data.date))
        .attr("y2", this.y(data.rating));

      this.lineGroup.attr("opacity", 1);
    }

    container.addEventListener("mouseover", handleMouseOver.bind(this));
    container.addEventListener("mouseout", this.handleMouseOut.bind(this));
  }

  handleMouseOut(e) {
    this.tipCont.style("display", "none");
    this.lineGroup.attr("opacity", 0);
  }

  updateGraphData(data) {
    if (!data) data = this.data;
    if (!data) return;
    data = this.filterData(data);

    this.getDims();
    this.setDims();
    this.updateScaleRanges();
    this.updateScaleDomains(data);
    this.line.x((d) => this.x(d.date)).y((d) => this.y(d.rating));

    // Select circles and join data
    const circles = this.graph.selectAll("circle").data(data);

    // Remove unneeded circles from exit selection
    circles.exit().remove();

    // Update existing circles on DOM
    circles
      .transition()
      .duration(500)
      .attr("cx", (d) => this.x(d.date))
      .attr("cy", (d) => this.y(d.rating));

    // Add new circles in enter selection
    circles
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", (d) => this.x(d.date))
      .attr("cy", (d) => this.y(d.rating))
      .attr("r", "5")
      .attr("fill", this.colors[1]);

    // Create line path
    this.path.data([data]).attr("stroke", this.colors[0]).attr("d", this.line);

    // Add axes
    const xAxis = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.axisBottom(this.x)
      .ticks(10)
      .tickFormat((d) => `${monthRef[d.getMonth()]}. ${d.getDate() + 1}`);

    this.xAxisGroup
      .call(xAxis)
      .attr("class", "axis")
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    const yAxis = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.axisLeft(this.y)
      .ticks(6)
      .tickFormat((d) => d.toString());
    this.yAxisGroup.call(yAxis).attr("class", "axis");
  }

  updateScaleDomains(data) {
    this.x.domain(https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.extent(data, (d) => d.date));
    this.y.domain(https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.extent(data, (d) => d.rating));
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./app/src/js/data-visuals/chart-types/scatterplot.js":
/*!************************************************************!*\
  !*** ./app/src/js/data-visuals/chart-types/scatterplot.js ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScatterPlot)
/* harmony export */ });
/* harmony import */ var https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://cdn.jsdelivr.net/npm/d3@7/+esm */ "https://cdn.jsdelivr.net/npm/d3@7/+esm");
/* harmony import */ var _data_viz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-viz.js */ "./app/src/js/data-visuals/data-viz.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__, _data_viz_js__WEBPACK_IMPORTED_MODULE_1__]);
([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__, _data_viz_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





class ScatterPlot extends _data_viz_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.x = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleLinear();
    this.y = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleLinear();

    this.updateScaleRanges();

    // Create regression line groups
    this.winRegGroup = this.graph.append("g");
    this.loseRegGroup = this.graph.append("g");
  }

  updateGraphData(data) {
    if (!data) data = this.data;
    if (!data) return;
    data = this.filterData(data);

    this.getDims();
    this.setDims();
    this.updateScaleRanges();
    this.updateScaleDomains(data);

    // Select existing circles and join data
    const circles = this.graph.selectAll("circle").data(data);

    // Remove from exit selection
    circles.exit().remove();

    // Update circles already on DOM
    circles
      .attr("fill", (d) => this.color(d.result))
      .attr("cx", (d) => this.x(d.match_length))
      .attr("cy", (d) => this.y(d.num_moves));

    // Add circles from the enter selection
    circles
      .enter()
      .append("circle")
      .attr("fill", (d) => this.color(d.result))
      .attr("cx", (d) => this.x(d.match_length))
      .attr("cy", (d) => this.y(d.num_moves))
      .attr("r", 6);

    // Add axes
    const xAxis = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.axisBottom(this.x);
    this.xAxisGroup.call(xAxis).attr("class", "axis");

    const yAxis = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.axisLeft(this.y).ticks(6);
    this.yAxisGroup.call(yAxis).attr("class", "axis");

    // Create/Update regression lines
    const xExtent = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.extent(data, (d) => d.match_length);

    this.createTrendLine({
      container: this.winRegGroup,
      data: data.filter((d) => d.result === "win"),
      x: "match_length",
      y: "num_moves",
      xExtent: xExtent,
    }).attr("stroke", this.color("win"));

    this.createTrendLine({
      container: this.loseRegGroup,
      data: data.filter((d) => d.result === "lose"),
      x: "match_length",
      y: "num_moves",
      xExtent: xExtent,
    }).attr("stroke", this.color("lose"));
  }

  updateScaleDomains(data) {
    this.x.domain(https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.extent(data, (d) => d.match_length));
    this.y.domain(https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.extent(data, (d) => d.num_moves));
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./app/src/js/data-visuals/chart-types/stacked-bar-chart.js":
/*!******************************************************************!*\
  !*** ./app/src/js/data-visuals/chart-types/stacked-bar-chart.js ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StackedBarChart)
/* harmony export */ });
/* harmony import */ var https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://cdn.jsdelivr.net/npm/d3@7/+esm */ "https://cdn.jsdelivr.net/npm/d3@7/+esm");
/* harmony import */ var _data_viz_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-viz.js */ "./app/src/js/data-visuals/data-viz.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__, _data_viz_js__WEBPACK_IMPORTED_MODULE_1__]);
([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__, _data_viz_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





class StackedBarChart extends _data_viz_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.x = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleLinear();
    this.y = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleBand();

    // Each key represents a stack in each bar (e.g., Wins, Draws, Losses) and has its own group to which the bars (rects) will be appended.
    this.keys.forEach(() => this.graph.append("g").attr("class", "bar-group"));

    this.updateScaleRanges();
  }

  createStack(data, keys) {
    const stack = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.stack().keys(keys)(data);
    stack.forEach((data, i) => {
      data.forEach((d) => (d.key = keys[i]));
    });

    return stack;
  }

  initializeTipListeners(container, hoverClass) {
    // TODO: Move to Data Viz Class? Extremely similar generations, but would need to handle data difs
    function handleMouseOver(e) {
      if (!e.target.classList.contains(hoverClass)) return;

      const data = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.select(e.target).data()[0];
      const tipCont = this.tipCont._groups[0][0];

      tipCont.querySelector(".tip-header").textContent = data.data.opening;
      tipCont.querySelector(".tip-subheader").textContent = data.data.moves;
      tipCont.querySelector(".tip-body").textContent =
        data.key[0].toUpperCase() +
        data.key.slice(1) +
        `: ${data.data[data.key]}`;

      const rectMiddle = this.x(data[0] + data[1]) / 2;
      const leftShift = rectMiddle + this.dims.graph.marginLeft - 50 + "px";
      const topShift =
        this.y(data.data.code) + this.dims.graph.marginTop - 20 + "px";

      this.tipCont.style("left", leftShift);
      this.tipCont.style("top", topShift);
      this.tipCont.style("display", "block");
    }

    container.addEventListener("mouseover", handleMouseOver.bind(this));
    container.addEventListener("mouseout", this.handleMouseOut.bind(this));
  }

  updateGraphData(data) {
    if (!data) data = this.data;
    if (!data) return;
    data = this.filterData(data);
    data = this.sortData(data);

    this.getDims();
    this.setDims();
    this.updateScaleRanges();
    this.updateScaleDomains(data);

    const stack = this.createStack(data, this.keys);

    // Update data on bar groups
    const barGroups = this.graph.selectAll(".bar-group").data(stack);

    // Join data within each group for the bars
    const bars = barGroups.selectAll(".bar").data((d) => d);

    // Remove unneeded bars within the group (if required)
    bars.exit().remove();

    // Update existing bars on DOM
    bars
      .attr("fill", (d) => this.color(d.key))
      .transition()
      .duration(500)
      .attr("width", (d) => this.x(d[1] - d[0]))
      .attr("height", this.y.bandwidth)
      .attr("x", (d) => this.x(d[0]))
      .attr("y", (d) => this.y(d.data.code));

    // Add rects from enter selection
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", (d) => this.color(d.key))
      .transition()
      .duration(500)
      .attr("width", (d) => this.x(d[1] - d[0]))
      .attr("height", this.y.bandwidth)
      .attr("x", (d) => this.x(d[0]))
      .attr("y", (d) => this.y(d.data.code));

    // TODO: Helper function?
    // Create axis label reference
    const ecoReference = new Map();
    data.forEach((d) =>
      ecoReference.set(d.code, {
        name: d.opening,
        moves: d.moves,
      })
    );

    // Generate y-axis
    const yAxis = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.axisLeft(this.y)
      .tickFormat((d) => ecoReference.get(d).name);
    this.yAxisGroup.call(yAxis).attr("class", "axis");
  }

  updateScaleDomains(data) {
    this.x.domain([0, https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.max(data, (d) => d.total)]);
    this.y.domain(data.map((d) => d.code)).padding(this.dims.graph.padding);
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./app/src/js/data-visuals/data-viz.js":
/*!*********************************************!*\
  !*** ./app/src/js/data-visuals/data-viz.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataViz)
/* harmony export */ });
/* harmony import */ var https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://cdn.jsdelivr.net/npm/d3@7/+esm */ "https://cdn.jsdelivr.net/npm/d3@7/+esm");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__]);
https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




class DataViz {
  constructor(arg = {}) {
    const { canvasId, colors, filterGroups, heading, keys, sortGroups } = arg;

    this.canvas = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.select(canvasId);
    this.colors = colors || ["#c92a2a", "#efbfbf", "#791919"];
    this.keys = keys || [];
    this.data = null;

    this.createHeading(heading);
    this.graphOptions = document.createElement("div");
    this.graphOptions.classList.add("graph-options");
    this.canvas._groups[0][0].before(this.graphOptions);

    this.svg = this.canvas.append("svg").attr("class", "data-viz");
    this.graph = this.svg.append("g").attr("class", "graph");
    this.xAxisGroup = this.graph.append("g");
    this.yAxisGroup = this.graph.append("g");

    this.color = https_cdn_jsdelivr_net_npm_d3_7_esm__WEBPACK_IMPORTED_MODULE_0__.scaleOrdinal(this.colors).domain(this.keys);

    this.dims = { canvas: {}, graph: {} };
    this.getDims();
    this.setDims();

    this.createGraphOptions("filter", filterGroups);
    this.createGraphOptions("sort", sortGroups);

    this.canvas._groups[0][0].parentElement.addEventListener(
      "click",
      this.handleClicks.bind(this)
    );
  }

  bindData(data) {
    this.data = data;
    this.updateGraphData(data);
  }

  createGraphOptions(type, groups) {
    if (type !== "sort" && type !== "filter") return;
    if (groups.length < 1) return;

    const title = type === "sort" ? "Sort by" : "Filter on";

    // Filter: [["color", ["white", "black"]]]
    // Sort:   [["most", ["total", "wins", "losses"]]]
    const groupEls = groups.map((group) => {
      const groupEl = document.createElement("div");
      groupEl.classList.add("options-group");
      groupEl.dataset[type] = group[0];
      groupEl.dataset.title = title;

      const optionEls = group[1].map((option) => {
        const optionEl = document.createElement("button");
        optionEl.classList.add("btn", "btn--option", type);
        optionEl.dataset[type] = option;
        optionEl.textContent = option[0].toUpperCase() + option.slice(1);
        return optionEl;
      });
      optionEls[0].classList.add("active");
      groupEl.append(...optionEls);

      return groupEl;
    });

    this.graphOptions.append(...groupEls);
  }

  createAxisLabel(arg = {}) {
    const { x, y } = arg;

    const xAxisTitle = document.createElement("p");
    xAxisTitle.classList.add("axis-title", "axis-title--x");
    xAxisTitle.textContent = x;

    const yAxisTitle = document.createElement("p");
    yAxisTitle.classList.add("axis-title", "axis-title--y");
    yAxisTitle.textContent = y;

    this.canvas._groups[0][0].append(xAxisTitle, yAxisTitle);
  }

  createHeading(str) {
    if (!str) return;

    const heading = document.createElement("h3");
    heading.classList.add("heading-tertiary", "canvas-heading");
    heading.textContent = str;

    this.canvas._groups[0][0].parentElement.prepend(heading);
  }

  createLegend(shape, pos = "after") {
    const legendContainer = document.createElement("div");
    legendContainer.classList.add("legend-container");
    if (pos === "after") this.canvas._groups[0][0].after(legendContainer);
    else this.canvas._groups[0][0].before(legendContainer);

    this.keys.forEach((key) => {
      const keyGroup = document.createElement("div");
      keyGroup.classList.add("key-group");

      const shapeEl = document.createElement("div");
      shapeEl.classList.add(`legend-shape--${shape}`);
      shapeEl.style.backgroundColor = this.color(key);

      const text = document.createElement("p");
      text.classList.add("legend-text");
      text.textContent = `- ${key[0].toUpperCase() + key.slice(1)}`;

      keyGroup.append(shapeEl, text);
      legendContainer.append(keyGroup);
    });

    return this.legendGroup;
  }

  createTrendLine(arg) {
    // TODO: Accept line elements instead of container?
    const { container, data, x, y, xExtent } = arg;

    container.selectAll("line").remove();

    if (!data.length) return container.append("line");
    // Variables required for slope intercept equation
    let n = 0;
    let sumXY = 0;
    let sumX = 0;
    let sumY = 0;
    let sumXSq = 0;

    for (let el of data) {
      n++;
      sumX += el[x];
      sumY += el[y];
      sumXY += el[x] * el[y];
      sumXSq += Math.pow(el[x], 2);
    }

    const m = parseFloat(
      ((n * sumXY - sumX * sumY) / (n * sumXSq - Math.pow(sumX, 2))).toFixed(4)
    );
    const b = Math.round((sumY - m * sumX) / n);
    const slopeInter = (x) => m * x + b;

    return container
      .append("line")
      .attr("x1", this.x(xExtent[0]))
      .attr("x2", this.x(xExtent[1]))
      .attr("y1", this.y(slopeInter(xExtent[0])))
      .attr("y2", this.y(slopeInter(xExtent[1])));
  }

  initializeTooltip(container, hoverClass) {
    if (this.tipCont) return;

    this.tipCont = container.append("div").attr("class", "tooltip-container");

    const tipContent = this.tipCont
      .append("div")
      .attr("class", "tooltip")
      .append("div")
      .attr("class", "tooltip-content");
    tipContent.append("p").attr("class", "tip-header");
    tipContent.append("p").attr("class", "tip-subheader");
    tipContent.append("p").attr("class", "tip-body");

    // TODO: Only exists on children class
    this.initializeTipListeners(container._groups[0][0], hoverClass);
  }

  filterData(data) {
    const filters = [];
    const filteredData = [];

    this.graphOptions
      .querySelectorAll(".options-group[data-filter]")
      .forEach((group) => {
        const property = group.dataset.filter;
        const value = group.querySelector(".active").dataset.filter;
        filters.push([property, value]);
      });

    data.forEach((el) => {
      let match = true;
      filters.forEach((filter) => {
        if (el[filter[0]] !== filter[1]) match = false;
      });
      if (match) filteredData.push(el);
    });

    return filteredData;
  }

  getDims() {
    this.dims.canvas.height = parseInt(this.canvas.style("height"));
    this.dims.canvas.width = parseInt(this.canvas.style("width"));
    this.dims.graph.marginTop = parseInt(this.graph.style("margin-top"));
    this.dims.graph.marginRight = parseInt(this.graph.style("margin-right"));
    this.dims.graph.marginBottom = parseInt(this.graph.style("margin-bottom"));
    this.dims.graph.marginLeft = parseInt(this.graph.style("margin-left"));
    this.dims.graph.padding = parseFloat(this.graph.style("padding"));

    this.dims.graph.width =
      this.dims.canvas.width -
      this.dims.graph.marginLeft -
      this.dims.graph.marginRight;
    this.dims.graph.height =
      this.dims.canvas.height -
      this.dims.graph.marginTop -
      this.dims.graph.marginBottom;
  }

  handleClicks(e) {
    const clicked = e.target;
    if (clicked.nodeName !== "BUTTON") return;
    if (clicked.classList.contains("active")) return;

    const siblings = clicked.parentElement.childNodes;
    siblings.forEach((sib) => sib.classList.remove("active"));
    clicked.classList.add("active");

    // TODO: Function only exists on child class
    this.updateGraphData(this.data);
  }

  handleMouseOut(e) {
    this.tipCont.style("display", "none");
  }

  setDims() {
    this.svg
      .attr("width", this.dims.canvas.width)
      .attr("height", this.dims.canvas.height);
    this.graph
      .attr("width", this.dims.graph.width)
      .attr("height", this.dims.graph.height)
      .attr(
        "transform",
        `translate(${this.dims.graph.marginLeft}, ${this.dims.graph.marginTop})`
      );

    this.xAxisGroup.attr(
      "transform",
      `translate(0, ${this.dims.graph.height})`
    );
  }

  sortData(data) {
    const sortBy =
      this.graphOptions.querySelector(".btn.sort.active").dataset.sort;
    data.sort((a, b) => a[sortBy] - b[sortBy]);

    return data;
  }

  updateGraphData(data) {
    // Handled by child
  }

  updateScaleRanges() {
    this.x.range([0, this.dims.graph.width]);
    this.y.range([this.dims.graph.height, 0]);
  }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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


/***/ }),

/***/ "https://cdn.jsdelivr.net/npm/d3@7/+esm":
/*!*********************************************************!*\
  !*** external "https://cdn.jsdelivr.net/npm/d3@7/+esm" ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = import("https://cdn.jsdelivr.net/npm/d3@7/+esm");;

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./app/src/js/dashboard.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle_dashboard.js.map