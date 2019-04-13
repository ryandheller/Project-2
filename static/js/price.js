var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#pricePosition")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "Kindle";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
    d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "hair_length") {
    var label = "Hair Length:";
  }
  else {
    var label = "# of Albums:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.json('/nyt/jsondata', function (error, data) {
  if (error) throw error;
  data.forEach(function (book) {
    book.Kindle = +book.Kindle;
    book.Audio = +book.Audio;
    book.Hardcover = +book.Hardcover;
    book.Paperback = +book.Paperback;
    book.rank = +book.rank
  });

  var xLinearScale = xScale(data, chosenXAxis);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.rank)])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.rank))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");

  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var kindleLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "Kindle") // value to grab for event listener
    .classed("active", true)
    .text("Kindle Price");

  var audioLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "Audio") // value to grab for event listener
    .classed("inactive", true)
    .text("Audiobook Price");

  var hardcoverLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "Hardcover") // value to grab for event listener
    .classed("inactive", true)
    .text("Hardcover Price");

  var paperbackLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "Paperback") // value to grab for event listener
    .classed("inactive", true)
    .text("Paperback Price");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Top Chart Position");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "Kindle") {
          kindleLabel
            .classed("active", true)
            .classed("inactive", false);
          audioLabel
            .classed("active", false)
            .classed("inactive", true);
          hardcoverLabel
            .classed("active", false)
            .classed("inactive", true);
          paperbackLabel
            .classed("active", false)
            .classed("inactive", true);
        } if (chosenXAxis === "Audio") {
          audioLabel
            .classed("active", true)
            .classed("inactive", false);
          kindleLabel
            .classed("active", false)
            .classed("inactive", true);
          hardcoverLabel
            .classed("active", false)
            .classed("inactive", true);
          paperbackLabel
            .classed("active", false)
            .classed("inactive", true);
        }if (chosenXAxis === "Hardcover") {
          hardcoverLabel
            .classed("active", true)
            .classed("inactive", false);
          audioLabel
            .classed("active", false)
            .classed("inactive", true);
          kindleLabel
            .classed("active", false)
            .classed("inactive", true);
          paperbackLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          paperbackLabel
            .classed("active", true)
            .classed("inactive", false);
          audioLabel
            .classed("active", false)
            .classed("inactive", true);
          hardcoverLabel
            .classed("active", false)
            .classed("inactive", true);
          kindleLabel
            .classed("active", false)
            .classed("inactive", true);
        }
      }
    });
});
