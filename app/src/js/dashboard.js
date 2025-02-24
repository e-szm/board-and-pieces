"use strict";

import StackedBarChart from "./data-visuals/chart-types/stacked-bar-chart.js";
import LineChart from "./data-visuals/chart-types/line-chart.js";
import Scatterplot from "./data-visuals/chart-types/scatterplot.js";
import PieChart from "./data-visuals/chart-types/pie-chart.js";
import alert from "./utils/alert.js";
import * as api from "./utils/api.js";
import { disableForm, enableForm } from "./utils/formHelper.js";

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

    this.initializeColorAnalysis();
    this.initializeOpeningStats();
    this.initializeRatingTrends();
    this.initializeDurationStats();

    this.updateConfigDateRange(new Date());
    this.beginListening();
  }

  abort() {
    alert("error", "Oops! Please try again later.");
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

  initializeColorAnalysis() {
    const colorAnalysis = document.getElementById("color-analysis");

    const pieChart = new PieChart(
      JSON.parse(colorAnalysis.dataset.graphOptions)
    );
    pieChart.createLegend("circle", "after");
    pieChart.initializeTooltip(pieChart.canvas, "arc");

    this.availVizMap.set(colorAnalysis.id, {
      startDateStr: null,
      endDateStr: null,
      viz: pieChart,
    });
  }

  initializeDurationStats() {
    const durationStats = document.getElementById("match-duration-analysis");

    const scatterplot = new Scatterplot(
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

    const stackedBarChart = new StackedBarChart(
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

    const lineChart = new LineChart(
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
      alert("error", "You must first configure the dashboard.");
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
    disableForm(form, "Generating dashboard...");

    const startDateStr = `${document.getElementById("start-year").value}-${
      document.getElementById("start-month").value
    }`;
    const endDateStr = `${document.getElementById("end-year").value}-${
      document.getElementById("end-month").value
    }`;

    const res = await api.getRefresh(startDateStr, endDateStr);
    const data = await res.json();

    if (!res.ok || res.status !== 200) {
      alert("error", data.message);
      enableForm(form, "Generate");
      return;
    }

    this.startDateStr = startDateStr;
    this.endDateStr = endDateStr;

    this.updateHighlightsPanel(data.data);
    alert("success", "Success! You may now choose a data visualization.");
    enableForm(form, "Generate");
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

    const res = await api[action](this.startDateStr, this.endDateStr);
    const data = await res.json();

    if (!res.ok || res.status !== 200) {
      alert("error", data.message);
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
      case "pieChart":
        viz.viz.bindData(data.data.colorAnalysis);
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
