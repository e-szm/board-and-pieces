"use strict";

import StackedBarChart from "./data-visuals/chart-types/stacked-bar-chart.js";
import LineChart from "./data-visuals/chart-types/line-chart.js";
import ScatterPlot from "./data-visuals/chart-types/scatterplot.js";
import * as api from "./utils/api.js";

class Application {
  constructor() {
    this.init();
  }

  init() {
    this.dashboardSidebar = document.querySelector(".dashboard-sidebar");
    this.dashboardMain = document.querySelector(".dashboard-main");

    if (this.dashboardSidebar) {
      this.dashboardSidebar.addEventListener(
        "click",
        this.handleDashboardClicks.bind(this)
      );
    }
  }

  async createLineChart(el, canvasName) {
    const canvasContainer = document.createElement("div");
    canvasContainer.classList.add(
      "canvas-container",
      `canvas-container--${canvasName}`
    );

    this.dashboardMain.append(canvasContainer);

    const data = await api.getRatingTrends("2024-03", "2024-05");
    data.forEach((el) => (el.date = new Date(el.date)));

    const lineChart = new LineChart({
      heading: "Rating Trend",
      canvasContainer,
      canvasName,
      filterGroups: [["time_class", ["rapid", "daily", "blitz", "bullet"]]],
      sortGroups: [],
    });

    lineChart.initializeTooltip(lineChart.canvas, "circle");
    lineChart.bindData(data);
  }

  async createScatterplot(el, canvasName) {
    const canvasContainer = document.createElement("div");
    canvasContainer.classList.add(
      "canvas-container",
      `canvas-container--${canvasName}`
    );

    this.dashboardMain.append(canvasContainer);

    const data = await api.getDurationStats("2024-03", "2024-05");
    data.forEach((el) => (el.match_length = el.match_length / 60));

    const scatterPlot = new ScatterPlot({
      heading: "Number of Moves by Match Length",
      canvasContainer,
      canvasName,
      keys: ["win", "draw", "lose"],
      filterGroups: [["time_class", ["rapid", "daily", "blitz", "bullet"]]],
      sortGroups: [],
    });

    scatterPlot.createLegend("rect", "after");
    scatterPlot.createAxisLabel({
      x: "Match length (minutes)",
      y: "# of moves",
    });
    scatterPlot.bindData(data);
  }

  async createStackedBarChart(el, canvasName) {
    const canvasContainer = document.createElement("div");
    canvasContainer.classList.add(
      "canvas-container",
      `canvas-container--${canvasName}`
    );
    this.dashboardMain.append(canvasContainer);

    const barChart = new StackedBarChart({
      heading: "Opening Statistics",
      canvasContainer,
      canvasName,
      keys: ["wins", "draws", "losses"],
      filterGroups: [["color", ["white", "black"]]],
      sortGroups: [["most", ["total", "wins", "losses"]]],
    });

    const data = await api.getOpeningStats("2024-03", "2024-05");

    barChart.createLegend("rect");
    barChart.initializeTooltip(barChart.canvas, "bar");
    barChart.bindData(data);
  }

  handleDashboardClicks(e) {
    e.preventDefault();

    const clickedEl = e.target;
    if (
      !clickedEl.classList.contains("sidebar-btn") ||
      clickedEl.classList.contains("active")
    )
      return;

    this.updateCanvas(
      clickedEl,
      this.dashboardMain.querySelectorAll(".canvas-container")
    );

    this.updateActiveElement(
      clickedEl,
      clickedEl.parentElement.querySelectorAll(".sidebar-btn")
    );
  }

  updateActiveElement(el, siblings) {
    siblings.forEach((sibling) => sibling.classList.remove("active"));
    el.classList.add("active");
  }

  updateCanvas(el, siblings) {
    const vizName = el.dataset.viz;
    const canvasName = el.dataset.canvas;

    if (siblings)
      siblings.forEach((sibling) => (sibling.style.display = "none"));

    const canvasContainer = this.dashboardMain.querySelector(
      `.canvas-container--${canvasName}`
    );
    if (canvasContainer) {
      canvasContainer.style.display = "";
      return;
    }

    switch (vizName) {
      case "StackedBarChart":
        this.createStackedBarChart(el, canvasName);
        break;
      case "LineChart":
        this.createLineChart(el, canvasName);
        break;
      case "Scatterplot":
        this.createScatterplot(el, canvasName);
        break;
    }
  }
}

const app = new Application();
