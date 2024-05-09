"use strict";

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import DataViz from "../data-viz.js";

export default class ScatterPlot extends DataViz {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.x = d3.scaleLinear();
    this.y = d3.scaleLinear();

    this.updateScaleRanges();

    // Create regression line groups
    this.winRegGroup = this.graph.append("g");
    this.loseRegGroup = this.graph.append("g");
  }

  updateGraphData(data) {
    data = this.filterData(data);

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
    const xAxis = d3.axisBottom(this.x);
    this.xAxisGroup.call(xAxis).attr("class", "axis");

    const yAxis = d3.axisLeft(this.y).ticks(6);
    this.yAxisGroup.call(yAxis).attr("class", "axis");

    // Create/Update regression lines
    const xExtent = d3.extent(data, (d) => d.match_length);

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
    this.x.domain(d3.extent(data, (d) => d.match_length));
    this.y.domain(d3.extent(data, (d) => d.num_moves));
  }
}
