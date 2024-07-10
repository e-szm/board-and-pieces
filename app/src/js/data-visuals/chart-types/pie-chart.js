"use strict";

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import DataViz from "../data-viz.js";

export default class LineChart extends DataViz {
  constructor(arg = {}) {
    super(arg);
    this.init();
  }

  init() {
    this.pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);
    this.arcPath = d3.arc().innerRadius(75);
  }

  arcTweenEnter = (data) => {
    let i = d3.interpolate(data.endAngle, data.startAngle);

    return (t) => {
      data.startAngle = i(t);
      return this.arcPath(data);
    };
  };

  arcTweenExit = (data) => {
    let i = d3.interpolate(data.startAngle, data.endAngle);

    return (t) => {
      data.startAngle = i(t);
      return this.arcPath(data);
    };
  };

  // Leverage closure to access this.arcPath in returned function
  arcTweenUpdate = () => {
    const arcPath = this.arcPath;

    return function (data) {
      let i = d3.interpolate(this._current, data);
      this._current = data;

      return (t) => {
        return arcPath(i(t));
      };
    };
  };

  initializeTipListeners(container, hoverClass) {
    // TODO: Move to Data Viz Class? Extremely similar generations, but would need to handle data difs
    function handleMouseOver(e) {
      if (!e.target.classList.contains(hoverClass)) return;

      const data = d3.select(e.target).data()[0];
      const tipCont = this.tipCont._groups[0][0];

      tipCont.querySelector(
        ".tip-header"
      ).textContent = `Total ${data.data.name}`;
      tipCont.querySelector(
        ".tip-subheader"
      ).textContent = `as ${data.data.color}`;
      tipCont.querySelector(".tip-body").textContent = data.data.value;

      const arcCenter = this.arcPath.centroid(data);
      const centerX = this.dims.canvas.width / 2;
      const centerY = this.dims.canvas.height / 2;

      this.tipCont.style("left", centerX + arcCenter[0] - 51 + "px");
      this.tipCont.style("top", centerY + arcCenter[1] + "px");
      this.tipCont.style("display", "block");
    }

    container.addEventListener("mouseover", handleMouseOver.bind(this));
    container.addEventListener("mouseout", this.handleMouseOut.bind(this));
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
        `translate(${this.dims.canvas.width / 2}, ${
          this.dims.canvas.height / 2
        })`
      );
  }

  updateGraphData(data) {
    if (!data) data = this.data;
    if (!data) return;
    data = this.filterData(data);

    this.getDims();
    this.setDims();
    this.arcPath.outerRadius(this.dims.graph.width / 2);

    const paths = this.graph.selectAll("path").data(this.pie(data));

    paths
      .exit()
      .transition()
      .duration(300)
      .attrTween("d", this.arcTweenExit)
      .remove();

    paths
      .attr("d", this.arcPath)
      .attr("fill", (d) => this.color(d.data.name))
      .transition()
      .duration(300)
      .attrTween("d", this.arcTweenUpdate());

    paths
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", this.arcPath)
      .attr("stroke", "#333")
      .attr("fill", (d) => this.color(d.data.name))
      .each(function (d) {
        this._current = d;
      }) // Use _current data in update tween
      .transition()
      .duration(300)
      .attrTween("d", this.arcTweenEnter);
  }
}
