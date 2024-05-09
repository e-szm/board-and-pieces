"use strict";

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import DataViz from "../data-viz.js";

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

export default class LineChart extends DataViz {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.x = d3.scaleUtc();
    this.y = d3.scaleLinear();
    this.line = d3.line();

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

      const data = d3.select(e.target).data()[0];
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
      this.tipCont.style("opacity", 1);

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
    this.tipCont.style("opacity", 0);
    this.lineGroup.attr("opacity", 0);
  }

  updateGraphData(data) {
    data = this.filterData(data);

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
      .attr("r", "6")
      .attr("fill", this.colors[1]);

    // Create line path
    this.path.data([data]).attr("stroke", this.colors[0]).attr("d", this.line);

    // Add axes
    const xAxis = d3
      .axisBottom(this.x)
      .tickFormat((d) => `${monthRef[d.getMonth()]}. ${d.getDate() + 1}`);

    this.xAxisGroup
      .call(xAxis)
      .attr("class", "axis")
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    const yAxis = d3
      .axisLeft(this.y)
      .ticks(6)
      .tickFormat((d) => d.toString());
    this.yAxisGroup.call(yAxis).attr("class", "axis");
  }

  updateScaleDomains(data) {
    this.x.domain(d3.extent(data, (d) => d.date));
    this.y.domain(d3.extent(data, (d) => d.rating));
  }
}
