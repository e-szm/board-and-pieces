"use strict";

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import DataViz from "./../data-viz.js";

export default class StackedBarChart extends DataViz {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.x = d3.scaleLinear();
    this.y = d3.scaleBand();

    // Each key represents a stack in each bar (e.g., Wins, Draws, Losses) and has its own group to which the bars (rects) will be appended.
    this.keys.forEach(() => this.graph.append("g").attr("class", "bar-group"));

    this.updateScaleRanges();
  }

  createStack(data, keys) {
    const stack = d3.stack().keys(keys)(data);
    stack.forEach((data, i) => {
      data.forEach((d) => (d.key = keys[i]));
    });

    return stack;
  }

  initializeTipListeners(container, hoverClass) {
    // TODO: Move to Data Viz Class? Extremely similar generations, but would need to handle data difs
    function handleMouseOver(e) {
      if (!e.target.classList.contains(hoverClass)) return;

      const data = d3.select(e.target).data()[0];
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
    const yAxis = d3
      .axisLeft(this.y)
      .tickFormat((d) => ecoReference.get(d).name);
    this.yAxisGroup.call(yAxis).attr("class", "axis");
  }

  updateScaleDomains(data) {
    this.x.domain([0, d3.max(data, (d) => d.total)]);
    this.y.domain(data.map((d) => d.code)).padding(this.dims.graph.padding);
  }
}
