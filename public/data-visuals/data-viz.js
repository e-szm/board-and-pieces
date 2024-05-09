"use strict";

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default class DataViz {
  constructor(arg = {}) {
    const { canvas, colors, filterGroups, heading, keys, sortGroups } = arg;

    this.canvas = canvas || d3.select(".canvas");
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

    this.color = d3.scaleOrdinal(this.colors).domain(this.keys);

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

    // Filter: [["color", ["white", "black"]]]
    // Sort:   [["most", ["total", "wins", "losses"]]]
    const groupEls = groups.map((group) => {
      const groupEl = document.createElement("div");
      groupEl.classList.add("options-group");
      groupEl.dataset[type] = group[0];

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
    this.tipCont.style("opacity", 0);
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
