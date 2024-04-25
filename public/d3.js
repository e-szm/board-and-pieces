import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/////////////////////////////////////////////////
// Setup
/////////////////////////////////////////////////

// Get data
const res = [
  {
    _id: "black",
    openings: [
      {
        code: "A02",
        name: "Bird's Opening",
        moves: "1 f4",
        total: 9,
        wins: 7,
        losses: 2,
        draws: 0,
      },
      {
        code: "B06",
        name: "Robatsch",
        moves: "1 e4 g6",
        total: 16,
        wins: 5,
        losses: 10,
        draws: 1,
      },
      {
        code: "E80",
        name: "King's Indian, Samisch Variation",
        moves: "1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 f3",
        total: 17,
        wins: 8,
        losses: 9,
        draws: 0,
      },
      {
        code: "B08",
        name: "Pirc, Classical",
        moves: "1 e4 d6 2 d4 Nf6 3 Nc3 g6 4 Nf3",
        total: 25,
        wins: 17,
        losses: 7,
        draws: 1,
      },
      {
        code: "E61",
        name: "King's Indian",
        moves: "1 d4 Nf6 2 c4 g6 3 Nc3",
        total: 27,
        wins: 19,
        losses: 8,
        draws: 0,
      },
      {
        code: "B07",
        name: "Pirc",
        moves: "1 e4 d6 2 d4 Nf6",
        total: 33,
        wins: 18,
        losses: 13,
        draws: 2,
      },
    ],
  },
  {
    _id: "white",
    openings: [
      {
        code: "A05",
        name: "Reti Opening",
        moves: "1 Nf3 Nf6",
        total: 1,
        wins: 0,
        losses: 0,
        draws: 1,
      },
      {
        code: "C46",
        name: "Three Knights",
        moves: "1 e4 e5 2 Nf3 Nc6 3 Nc3",
        total: 1,
        wins: 1,
        losses: 0,
        draws: 0,
      },
      {
        code: "A08",
        name: "King's Indian Attack",
        moves: "1 Nf3 d5 2 g3 c5 3 Bg2",
        total: 5,
        wins: 3,
        losses: 2,
        draws: 0,
      },
      {
        code: "A04",
        name: "Reti Opening",
        moves: "1 Nf3",
        total: 15,
        wins: 9,
        losses: 5,
        draws: 1,
      },
      {
        code: "A07",
        name: "King's Indian Attack",
        moves: "1 Nf3 d5 2 g3",
        total: 22,
        wins: 9,
        losses: 12,
        draws: 1,
      },
    ],
  },
];

const openingStats = new Map();
res.forEach((color) => openingStats.set(color._id, color.openings));

const whiteData = openingStats.get("white");
const blackData = openingStats.get("black");

let sortOn = "total";
let curData = whiteData;

// Create stacks from data
const keys = ["wins", "draws", "losses"];

// Build scales
const x = d3.scaleLinear();
const y = d3.scaleBand();
const color = d3.scaleOrdinal(["#c92a2a", "#efbfbf", "#791919"]);

// Append elements to the DOM
const canvas = d3.select(".canvas");
const svg = canvas.append("svg").attr("class", "data-viz");
const graph = svg.append("g").attr("class", "graph");
const legendGroup = svg.append("g");
const yAxisGroup = graph.append("g");
keys.forEach((key) => graph.append("g").attr("class", "bar-group"));

// Create legend
const legendNodes = legendGroup.selectAll("g").data(keys).enter().append("g");

// TODO: Translations should not be hardcoded
legendNodes
  .append("rect")
  .attr("class", "legend-rect")
  .attr("transform", (d, i) => `translate(${i * 100}, 0)`)
  .attr("fill", (d) => color(d));
legendNodes
  .append("text")
  .attr("class", "legend-text")
  .attr("transform", (d, i) => `translate(${i * 100 + 25}, 13)`)
  .text((d) => `- ${d.toUpperCase()}`);

/////////////////////////////////////////////////
// Build
/////////////////////////////////////////////////

// TODO: Function should be split for data and visual updates. For example, x range does not update if no width chagne
// Create data visualization
function generateVisual(data) {
  // Sort data
  data.sort((a, b) => a[sortOn] - b[sortOn]);

  // Create stack from data
  const stack = d3.stack().keys(keys)(data);
  stack.forEach((data, i) => {
    data.forEach((d) => (d.key = keys[i]));
  });

  // Create axis label reference
  const ecoReference = new Map();
  data.forEach((d) =>
    ecoReference.set(d.code, {
      name: d.name,
      moves: d.moves,
    })
  );

  // Get properties from DOM and calculate graph dims
  const canvasHeight = parseInt(canvas.style("height"));
  const canvasWidth = parseInt(canvas.style("width"));

  const marginTop = parseInt(graph.style("margin-top"));
  const marginRight = parseInt(graph.style("margin-right"));
  const marginBottom = parseInt(graph.style("margin-bottom"));
  const marginLeft = parseInt(graph.style("margin-left"));

  const padding = parseFloat(graph.style("padding"));

  const graphWidth = canvasWidth - marginLeft - marginRight;
  const graphHeight = canvasHeight - marginTop - marginBottom;

  // Set DOM elements' properties
  svg.attr("width", canvasWidth).attr("height", canvasHeight);

  graph
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${marginLeft}, ${marginTop})`);

  // Update Scales
  x.range([0, graphWidth]).domain([0, d3.max(data, (d) => d.total)]);
  y.range([graphHeight, 0])
    .domain(data.map((d) => d.code))
    .padding(padding);

  // Update data on bar groups
  const barGroups = graph.selectAll(".bar-group").data(stack);

  // Join data within each group for the bars
  const bars = barGroups.selectAll(".bar").data((d) => d);

  // Remove unneeded bars within the group (if required)
  bars.exit().remove();

  // Update existing bars on DOM
  bars
    .attr("fill", (d) => color(d.key))
    .transition()
    .duration(500)
    .attr("width", (d) => x(d[1] - d[0]))
    .attr("height", y.bandwidth)
    .attr("x", (d) => x(d[0]))
    .attr("y", (d) => y(d.data.code));

  // Add rects from enter selection
  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("fill", (d) => color(d.key))
    .transition()
    .duration(500)
    .attr("width", (d) => x(d[1] - d[0]))
    .attr("height", y.bandwidth)
    .attr("x", (d) => x(d[0]))
    .attr("y", (d) => y(d.data.code));

  // Generate y-axis (note: x-axis not needed)
  const yAxis = d3.axisLeft(y).tickFormat((d) => ecoReference.get(d).name);
  yAxisGroup.call(yAxis).attr("class", "axis");

  // Update legend position
  legendGroup.attr(
    "transform",
    `translate(${graphWidth - 125}, ${marginTop / 3})`
  );
}

/////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////

const canvasContainerEl = document.getElementById(
  "canvas-container-open-stats"
);

function handleColorUpdate(e) {
  const filters = canvasContainerEl
    .querySelector(".graph-options")
    .querySelectorAll(".filter");

  filters.forEach((filter) => filter.classList.remove("active"));

  e.target.classList.add("active");

  if (e.target.dataset.color === "black") curData = blackData;
  else if (e.target.dataset.color === "white") curData = whiteData;
  generateVisual(curData);
}

function handleSort(e) {
  const sorts = canvasContainerEl
    .querySelector(".graph-options")
    .querySelectorAll(".sort");

  sorts.forEach((sort) => sort.classList.remove("active"));

  e.target.classList.add("active");

  sortOn = e.target.dataset.sort;

  generateVisual(curData);
}

function handleCanvasClick(e) {
  if (!e.target.classList.contains("btn--option")) return;
  if (e.target.classList.contains("active")) return;

  if (e.target.classList.contains("filter")) handleColorUpdate(e);
  else if (e.target.classList.contains("sort")) handleSort(e);
}

function handleMouseOver(e) {
  if (!e.target.classList.contains("bar")) return;

  const data = d3.select(e.target).data()[0];
  const key = data.key;
  const tooltip = d3.select(".tooltip-container");

  document.querySelector(".opening").textContent = data.data.name;
  document.querySelector(".moves").textContent = data.data.moves;
  document.querySelector(".metric").textContent = `${key}: ${data.data[key]}`;

  const marginLeft = parseInt(graph.style("margin-left"));
  const marginTop = parseInt(graph.style("margin-top"));

  const rectMiddle = x(data[0] + data[1]) / 2;
  const leftShift = rectMiddle + marginLeft - 50 + "px";
  const topShift = y(data.data.code) + marginTop - 20 + "px";

  tooltip.style("left", leftShift);
  tooltip.style("top", topShift);
  tooltip.style("opacity", 1);
}

function handleMouseOut(e) {
  const tooltip = d3.select(".tooltip-container");
  tooltip.style("opacity", 0);
}

canvasContainerEl.addEventListener("click", handleCanvasClick);
canvasContainerEl.addEventListener("mouseover", handleMouseOver);
canvasContainerEl.addEventListener("mouseout", handleMouseOut);

// TODO: Should generate on load. Default to white?
generateVisual(curData);
