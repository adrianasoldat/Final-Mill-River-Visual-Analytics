// ── State ─────────────────────────────────────────────
let correlationsData = {};
let mergedData = [];
let anomaliesOnly = false;

const ENV_KEYS = ['cond', 'flow', 'DO', 'waterTemp', 'precip', 'discharge'];
const ENV_LABELS = ['Conductivity', 'Flow', 'Dissolved O₂', 'Water Temp', 'Precip', 'Discharge'];

const isValid = v => Number.isFinite(v);

// ── Load data & Setup  ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [corrArray, merged] = await Promise.all([
      fetch('correlations.json').then(r => r.json()),
      fetch('merged_data.json').then(r => r.json())
    ]);

    correlationsData = Object.fromEntries(
      corrArray.map(row => [row.organism, row])
    );
    mergedData = merged;

    renderHeatmap();
    setupEventListeners();
    renderHLI2Scatterplots();

  } catch (err) {
    document.getElementById('heatmap').innerHTML =
      `<p style="color:red">Could not load data<br>Run: python3 -m http.server 8000</p>`;
  }
});


// ── Navigation Bar for Visualization ────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('.hli-section')
    .forEach(s => s.classList.add('hidden-section'));

  document.getElementById(id)
    .classList.remove('hidden-section');
}


// ── Event Listeners ───────────────────────────────────────────

function setupEventListeners() {

  // HLI-3 checkbox
  const anomaliesCheckbox = document.getElementById('anomaliesOnly');
  if (anomaliesCheckbox) {
    anomaliesCheckbox.addEventListener('change', e => {
      anomaliesOnly = e.target.checked;
      applyAnomalyFilter();
    });
  }

  // HLI-2 dropdowns
  const envDropdown = document.getElementById("EnvDropdown");
  const functDropdown = document.getElementById("FunctDropdown");

  if (envDropdown) {
    envDropdown.addEventListener("change", renderHLI2Scatterplots);
  }

  if (functDropdown) {
    functDropdown.addEventListener("change", renderHLI2Scatterplots);
  }
}


// ── Visualizations ───────────────────────────────────────────


// ──HLI_1 Visualization ───────────────────────────────────────────
// CREATED WITH EXAMPLE FROM CLASS - bias lab
const margin = 100;
const frameWidth = 1000;
const frameHeight = 700;
const visWidth = (frameWidth - 3*margin) / 2;
const visHeight = (frameHeight - 2*margin);

let frame = d3.select("#scatterplot_env")
                .append("svg")
                    .attr("width", frameWidth*4)
                    .attr("height", frameHeight*4.5);

let frame1 = frame.append('g')
  .attr("transform", `translate(${margin}, ${margin})`);
let frame2 = frame.append('g')
  .attr("transform", `translate(${margin*2 + visWidth}, ${margin})`);
let frame3 = frame.append('g')
  .attr("transform", `translate(${margin}, ${margin*2 + visHeight})`);
let frame4 = frame.append('g')
  .attr("transform", `translate(${margin*2 + visWidth}, ${margin*2 + visHeight})`);
let frame5 = frame.append('g')
  .attr("transform", `translate(${margin}, ${margin*3 + visHeight*2})`);
let frame6 = frame.append('g')
  .attr("transform", `translate(${margin*2 + visWidth}, ${margin*3 + visHeight*2})`);
let frame7 = frame.append('g')
  .attr("transform", `translate(${margin}, ${margin*4 + visHeight*3})`);
let frame8 = frame.append('g')
  .attr("transform", `translate(${margin*2 + visWidth}, ${margin*4 + visHeight*3})`);
let frame9 = frame.append('g')
  .attr("transform", `translate(${margin}, ${margin*5 + visHeight*4})`);
let frame10 = frame.append('g')
  .attr("transform", `translate(${margin*2 + visWidth}, ${margin*5 + visHeight*4})`);

// to plot
let x1 = 'Water Temperature'
let y1 = 'Log scale of Density of macroinvertebrates'
let x2 = 'Water Temperature'
let y2 = 'Log scale of Density of macroinvertebrates'
let x3 = 'Water Temperature'
let y3 = 'Log scale of Density of macroinvertebrates'
let x4 = 'Water Temperature'
let y4 = 'Log scale of Density of macroinvertebrates'
let x5 = 'Water Temperature'
let y5 = 'Log scale of Density of macroinvertebrates'
let x6 = 'Water Temperature'
let y6 = 'Log scale of Density of macroinvertebrates'
let x7 = 'Water Temperature'
let y7 = 'Log scale of Density of macroinvertebrates'
let x8 = 'Water Temperature'
let y8 = 'Log scale of Density of macroinvertebrates'
let x9 = 'Water Temperature'
let y9 = 'Log scale of Density of macroinvertebrates'
let x10 = 'Water Temperature'
let y10 = 'Log scale of Density of macroinvertebrates'

d3.json("merged_data.json")
  .then(function(data) {

    data = data.filter(d => d.density > 0);

    // set up axes
    let xScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let xScale2 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let yScale1 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);
    let yScale2 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);

    let xScale3 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let xScale4 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let yScale3 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);
    let yScale4 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);

    let xScale5 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let xScale6 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let yScale5 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);
    let yScale6 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);

    let xScale7 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let xScale8 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let yScale7 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);
    let yScale8 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);

    let xScale9 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let xScale10 = d3.scaleLinear().domain(d3.extent(data, d => d.waterTemp)).nice().range([0, visWidth]);
    let yScale9 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);
    let yScale10 = d3.scaleLog().domain(d3.extent(data, d => d.density)).nice().range([visHeight, 0]);

    let xAxis1 = d3.axisBottom(xScale1);
    let xAxis2 = d3.axisBottom(xScale2);
    let yAxis1 = d3.axisLeft(yScale1);
    let yAxis2 = d3.axisLeft(yScale2);

    let xAxis3 = d3.axisBottom(xScale3);
    let xAxis4 = d3.axisBottom(xScale4);
    let yAxis3 = d3.axisLeft(yScale3);
    let yAxis4 = d3.axisLeft(yScale4);

    let xAxis5 = d3.axisBottom(xScale5);
    let xAxis6 = d3.axisBottom(xScale6);
    let yAxis5 = d3.axisLeft(yScale5);
    let yAxis6 = d3.axisLeft(yScale6);

    let xAxis7 = d3.axisBottom(xScale7);
    let xAxis8 = d3.axisBottom(xScale8);
    let yAxis7 = d3.axisLeft(yScale7);
    let yAxis8 = d3.axisLeft(yScale8);

    let xAxis9 = d3.axisBottom(xScale9);
    let xAxis10 = d3.axisBottom(xScale10);
    let yAxis9 = d3.axisLeft(yScale9);
    let yAxis10 = d3.axisLeft(yScale10);

    // Add axes - frame1 (2019 Summer)
    frame1.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis1);
    frame1.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x1);
    frame1.append('g').call(yAxis1);
    frame1.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y1);
    frame1.append("text").attr("x", visWidth/2).attr("y", 15).attr("text-anchor", "middle").style("font-size", "16px").text("Summer");
    frame1.append("text").attr("x", -30).attr("y", visHeight/2).attr("text-anchor", "middle").attr("transform", `rotate(-90, -30, ${visHeight/2})`).style("font-size", "18px").style("font-weight", "bold").text("2019");

    // frame2 (2019 Fall)
    frame2.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis2);
    frame2.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x2);
    frame2.append('g').call(yAxis2);
    frame2.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y2);
    frame2.append("text").attr("x", visWidth/2).attr("y", 15).attr("text-anchor", "middle").style("font-size", "16px").text("Fall");

    
    // frame3 (2020 Summer)
    frame3.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis3);
    frame3.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x3);
    frame3.append('g').call(yAxis3);
    frame3.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y3);
    frame3.append("text").attr("x", -30).attr("y", visHeight/2).attr("text-anchor", "middle").attr("transform", `rotate(-90, -30, ${visHeight/2})`).style("font-size", "18px").style("font-weight", "bold").text("2020");

    // frame4 (2020 Fall)
    frame4.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis4);
    frame4.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x4);
    frame4.append('g').call(yAxis4);
    frame4.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y4);

    // frame5 (2021 Summer)
    frame5.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis5);
    frame5.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x5);
    frame5.append('g').call(yAxis5);
    frame5.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y5);
    frame5.append("text").attr("x", -30).attr("y", visHeight/2).attr("text-anchor", "middle").attr("transform", `rotate(-90, -30, ${visHeight/2})`).style("font-size", "18px").style("font-weight", "bold").text("2021");

    // frame6 (2021 Fall)
    frame6.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis6);
    frame6.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x6);
    frame6.append('g').call(yAxis6);
    frame6.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y6);
    
    // frame7 (2022 Summer)
    frame7.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis7);
    frame7.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x7);
    frame7.append('g').call(yAxis7);
    frame7.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y7);
    frame7.append("text").attr("x", -30).attr("y", visHeight/2).attr("text-anchor", "middle").attr("transform", `rotate(-90, -30, ${visHeight/2})`).style("font-size", "18px").style("font-weight", "bold").text("2022");

    // frame8 (2022 Fall)
    frame8.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis8);
    frame8.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x8);
    frame8.append('g').call(yAxis8);
    frame8.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y8);

    // set up color scale for feeding groups
    let feeding_colors = d3.scaleOrdinal()
                            .domain(data.map(d => d['feedingGroup']))
                            .range(['yellow','brown','blue','purple', 'orange','green']);

    // frame9 (2023 Summer)
    frame9.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis9);
    frame9.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x9);
    frame9.append('g').call(yAxis9);
    frame9.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y9);
    frame9.append("text").attr("x", -30).attr("y", visHeight/2).attr("text-anchor", "middle").attr("transform", `rotate(-90, -30, ${visHeight/2})`).style("font-size", "18px").style("font-weight", "bold").text("2023");
    // frame10 (2023 Fall)
    frame10.append('g').attr('transform', 'translate(0,' + visHeight + ')').call(xAxis10);
    frame10.append("text").attr('transform', 'translate(' + (visWidth/2) + ',' + (visHeight + margin/2) + ')').style("text-anchor", "middle").text(x10);
    frame10.append('g').call(yAxis10);
    frame10.append("text").attr("transform", "rotate(-90)").attr('x', -visHeight/2).attr('y', -margin/2).style("text-anchor", "middle").text(y10);

    // brush
    brush = d3.brush()
                .extent([
                    [d3.min(xScale1.range()), d3.min(yScale1.range())],
                    [d3.max(xScale1.range()), d3.max(yScale1.range())]
                ])
                .on("brush end", (e) => {
                    if (e.selection === null) {
                        circles = d3.selectAll('circle');
                        circles = circles["_groups"][0];
                        circles.forEach(c => { c.classList.remove('highlight'); })
                    } else {
                        const [[xMin, yMin], [xMax, yMax]] = e.selection;
                        data.map((d, i) => {
                            selector = "._" + i;
                            sel = d3.selectAll(selector);
                            circles = sel["_groups"][0];

                            if (xMin <= xScale1(d.waterTemp) && xMax >= xScale1(d.waterTemp) &&
                                yMin <= yScale1(d.density) && yMax >= yScale1(d.density)) {
                                circles.forEach(c => { c.classList.add('highlight'); })
                            } else if (xMin <= xScale3(d.waterTemp) && xMax >= xScale3(d.waterTemp) &&
                                yMin <= yScale3(d.density) && yMax >= yScale3(d.density)) {
                                circles.forEach(c => { c.classList.add('highlight'); })
                            } else if (xMin <= xScale5(d.waterTemp) && xMax >= xScale5(d.waterTemp) &&
                                yMin <= yScale5(d.density) && yMax >= yScale5(d.density)) {
                                circles.forEach(c => { c.classList.add('highlight'); })
                            } else if (xMin <= xScale7(d.waterTemp) && xMax >= xScale7(d.waterTemp) &&
                                yMin <= yScale7(d.density) && yMax >= yScale7(d.density)) {
                                circles.forEach(c => { c.classList.add('highlight'); })
                            } else if (xMin <= xScale9(d.waterTemp) && xMax >= xScale9(d.waterTemp) &&
                                yMin <= yScale9(d.density) && yMax >= yScale9(d.density)) {
                                circles.forEach(c => { c.classList.add('highlight'); })
                            } else {
                                circles.forEach(c => { c.classList.remove('highlight'); })
                            }
                        })
                    }
                });

    frame1.append("g").call(brush);

    // dots
    let dot1 = frame1.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2019" && d.season == "Summer"))
            .enter().append("circle")
            .attr("cx", d => xScale1(d.waterTemp))
            .attr("cy", d => yScale1(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot2 = frame2.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2019" && d.season == "Fall"))
            .enter().append("circle")
            .attr("cx", d => xScale2(d.waterTemp))
            .attr("cy", d => yScale2(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot3 = frame3.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2020" && d.season == "Summer"))
            .enter().append("circle")
            .attr("cx", d => xScale3(d.waterTemp))
            .attr("cy", d => yScale3(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot4 = frame4.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2020" && d.season == "Fall"))
            .enter().append("circle")
            .attr("cx", d => xScale4(d.waterTemp))
            .attr("cy", d => yScale4(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot5 = frame5.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2021" && d.season == "Summer"))
            .enter().append("circle")
            .attr("cx", d => xScale5(d.waterTemp))
            .attr("cy", d => yScale5(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot6 = frame6.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2021" && d.season == "Fall"))
            .enter().append("circle")
            .attr("cx", d => xScale6(d.waterTemp))
            .attr("cy", d => yScale6(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot7 = frame7.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2022" && d.season == "Summer"))
            .enter().append("circle")
            .attr("cx", d => xScale7(d.waterTemp))
            .attr("cy", d => yScale7(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot8 = frame8.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2022" && d.season == "Fall"))
            .enter().append("circle")
            .attr("cx", d => xScale8(d.waterTemp))
            .attr("cy", d => yScale8(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot9 = frame9.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2023" && d.season == "Summer"))
            .enter().append("circle")
            .attr("cx", d => xScale9(d.waterTemp))
            .attr("cy", d => yScale9(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    let dot10 = frame10.append('g').selectAll("dot")
            .data(data.filter(d => d.year == "2023" && d.season == "Fall"))
            .enter().append("circle")
            .attr("cx", d => xScale10(d.waterTemp))
            .attr("cy", d => yScale10(d.density))
            .attr("r", 5).attr('stroke', 'black')
            .style("fill", d => feeding_colors(d['feedingGroup']))
            .attr("class", (d, i) => "_" + i);

    const legend = d3.select("#legend");
    legend.selectAll("div")
      .data(feeding_colors.domain())
      .enter()
      .append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .html(d => `<div style="width:12px;height:12px;background:${feeding_colors(d)};margin-right:6px;"></div> ${d}`);

  });

//coloring by upstream downstream

// ──HLI_2 Visualization ───────────────────────────────────────────

function renderHLI2Scatterplots() {
  const envDropdown = document.getElementById("EnvDropdown");
  const functDropdown = document.getElementById("FunctDropdown");

  if (!envDropdown || !functDropdown) return;

  const envKey = envDropdown.value;
  const selectedGroup = functDropdown.value;

  const envDisplayLabels = {
    cond: "Conductivity",
    flow: "Water Flow",
    DO: "Dissolved Oxygen",
    waterTemp: "Water Temperature",
    precip: "Precipitation",
    discharge: "Stream Discharge"
  };

  const envLabel = envDisplayLabels[envKey];

  const svg1 = d3.select("#hli2ScatterPlot1");
  const svg2 = d3.select("#hli2ScatterPlot2");

  svg1.selectAll("*").remove();
  svg2.selectAll("*").remove();

  if (!ENV_KEYS.includes(envKey) || selectedGroup === "Select") {
    return;
  }

  let filtered = mergedData.filter(d =>
    Number.isFinite(d[envKey]) &&
    Number.isFinite(d.density) &&
    d.density > 0
  );

  if (selectedGroup !== "All") {
    filtered = filtered.filter(d => d.feedingGroup === selectedGroup);
  }

  const upstreamData = filtered.filter(d => d.location === "Upstream");
  const downstreamData = filtered.filter(d => d.location === "Downstream");

  drawHLI2Scatter(svg1, upstreamData, filtered, envKey, envLabel);
  drawHLI2Scatter(svg2, downstreamData, filtered, envKey, envLabel);
}

function drawHLI2Scatter(svg, data, allData, envKey, envLabel) {
  const width = 420;
  const height = 300;

  const margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 65
  };

  svg.attr("viewBox", `0 0 ${width} ${height}`);

  if (!allData.length) {
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#777")
      .text("No positive density data available");
    return;
  }

  const xScale = d3.scaleLinear()
    .domain(d3.extent(allData, d => d[envKey]))
    .nice()
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLog()
    .domain(d3.extent(allData, d => d.density))
    .nice()
    .range([height - margin.bottom, margin.top]);

  const colorScale = d3.scaleOrdinal()
    .domain([
      "Collector-gatherer",
      "Filterer",
      "Predator",
      "Scraper",
      "Shredder"
    ])
    .range([
      "#b10026",
      "#f46d43",
      "#fee08b",
      "#74add1",
      "#4575b4"
    ]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale).ticks(6, "~g"));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text(envLabel);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 16)
    .attr("text-anchor", "middle")
    .text("Density (log scale)");

  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[envKey]))
    .attr("cy", d => yScale(d.density))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.feedingGroup))
    .attr("opacity", 0.75);
}


// ──HLI_3 Visualization ───────────────────────────────────────────

// HLI_3 Heatmap
function renderHeatmap() {
  const container = document.getElementById('heatmap');
  const families = Object.keys(correlationsData).sort();

  const table = document.createElement('table');
  table.className = 'heatmap-table';


  // HLI_3 Header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.appendChild(document.createElement('th'));

  ENV_LABELS.forEach(label => {
    const th = document.createElement('th');
    th.className = 'col-label';
    th.textContent = label;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  
  const filteredFamilies = families.filter(family => 
    ENV_KEYS.some(k => isValid(correlationsData[family]?.[k]))
  );

  filteredFamilies.forEach(family => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-family-row', family);

    const values = ENV_KEYS.map(k => correlationsData[family]?.[k]);
    const hasStrong = values.some(v => isValid(v) && Math.abs(v) >= 0.3);
    tr.hasStrong = hasStrong;

    // Row label
    const labelTd = document.createElement('td');
    labelTd.className = 'row-label';
    labelTd.textContent = family;
    tr.appendChild(labelTd);

    // Cells
    ENV_KEYS.forEach((key, i) => {
      const value = correlationsData[family]?.[key];
      tr.appendChild(createCell(value, family, key, ENV_LABELS[i]));
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
}
// HLI_3 Cell creation 
function createCell(value, family, key, label) {
  const td = document.createElement('td');
  td.className = 'heatmap-cell';

  if (!isValid(value)) {
    td.classList.add('na-cell');
    td.textContent = '—';
    return td;
  }

  td.textContent = value.toFixed(2);
  td.style.background = getColor(value);

  if (Math.abs(value) >= 0.3) {
    td.classList.add('clickable');
    td.onclick = () => showDetail(family, key, label, value);
  }

  return td;
}
// HLI_3 Color 
function getColor(v) {
  const intensity = Math.min(Math.abs(v), 1);
  return v < 0
    ? `rgba(220, 90, 90, ${intensity})`
    : `rgba(90, 120, 220, ${intensity})`;
}
// HLI_3 Filter 
function applyAnomalyFilter() {
  document.querySelectorAll('tr[data-family-row]').forEach(tr => {
    tr.style.display = (anomaliesOnly && !tr.hasStrong) ? 'none' : '';
  });
}
// HLI_3 Detail panel 
function showDetail(family, key, label, r) {
  const points = mergedData
    .filter(row => row.family?.toLowerCase() === family.toLowerCase())
    .map(row => ({ x: row[key], y: row.density }))
    .filter(p => isValid(p.x) && isValid(p.y));

  if (!points.length) return;

  document.getElementById('detailTitle').textContent = `${family} × ${label}`;
  document.getElementById('detailR').textContent = `r = ${r.toFixed(3)}`;
  document.getElementById('detailStrength').textContent = getStrengthLabel(r);

  document.getElementById('detailEmpty').classList.add('hidden');
  document.getElementById('detailContent').classList.remove('hidden');

  drawScatter(points, label);
}
// HLI_3 Strength Label
function getStrengthLabel(r) {
  const a = Math.abs(r);
  const dir = r > 0 ? 'positive' : 'negative';

  if (a >= 0.7) return `Strong ${dir} correlation`;
  if (a >= 0.5) return `Moderate ${dir} correlation`;
  return `Weak ${dir} correlation`;
}
// HLI_3 Scatter 
function drawScatter(points, label) {
  const canvas = document.getElementById('scatterPlot');
  const ctx = canvas.getContext('2d');

  const W = canvas.width, H = canvas.height, PAD = 45;
  ctx.clearRect(0, 0, W, H);

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);

  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const yMin = Math.min(...ys), yMax = Math.max(...ys);

  const xRange = xMax - xMin;
  const yRange = yMax - yMin;

  const toX = v => PAD + (xRange === 0 ? 0.5 : (v - xMin) / xRange) * (W - PAD * 2);
  const toY = v => H - PAD - (yRange === 0 ? 0.5 : (v - yMin) / yRange) * (H - PAD * 2);

  // Axes
  ctx.strokeStyle = '#999';
  ctx.beginPath();
  ctx.moveTo(PAD, PAD);
  ctx.lineTo(PAD, H - PAD);
  ctx.lineTo(W - PAD, H - PAD);
  ctx.stroke();

  // Points
  ctx.fillStyle = 'rgba(42, 100, 150, 0.65)';
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(toX(p.x), toY(p.y), 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Label
  ctx.fillStyle = '#666';
  ctx.font = '11px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText(label, W / 2, H - 6);
}



