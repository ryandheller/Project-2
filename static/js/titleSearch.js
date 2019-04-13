// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#titleSearch")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
// var parseTime = d3.timeParse("B%");
var parseTime = d3.timeParse("%Y-%m-%d");

title_list = []
d3.json("/nyt/titlelist", function (error, data) {
  if (error) throw error;
  data.forEach(function (titleItem) {
    title_list.push(titleItem);
  })
});

bookToGraph = []

allBooks = []


d3.json("/nyt/titlesort", function (error, data) {
  if (error) throw error;
  data.forEach(function (item) {
    allBooks.push(item)
  })

  let titleMenu = d3.select("#titleDropdown")
  var options = titleMenu
    .append('select')
    .selectAll('option')
    .data(title_list).enter()
    .append('option')
    .text(function (d) { return d; });

  var initialGraph = function (bookPick) {

    allBooks.forEach(function (data) {
      if (data.title == bookPick) {
        bookToGraph.push(data)
      }
    });

    bookToGraph.forEach(function (point) {
      point.rank = +point.rank;
      point.date = parseTime(point.date);
    })

    var xTimeScale = d3.scaleTime()
      .range([0, chartWidth])
      .domain(d3.extent(bookToGraph, data => data.date));

    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([15, 0]);

    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var drawLine = d3
      .line()
      .x(data => xTimeScale(data.date))
      .y(data => yLinearScale(data.rank));

    var bookPath = chartGroup.append("path")
      // The drawLine function returns the instructions for creating the line for milesData
      .attr("d", drawLine(bookToGraph))
      .classed("line", true);

    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(bottomAxis);

    bookToGraph = []
  }
  initialGraph("44 CHARLES STREET")

  var updateGraph = function (bookPick) {

    allBooks.forEach(function (data) {
      if (data.title == bookPick) {
        bookToGraph.push(data)
      }
    });

    bookToGraph.forEach(function (point) {
      point.rank = +point.rank;
      point.date = parseTime(point.date);
    })

    var xTimeScale = d3.scaleTime()
      .range([0, chartWidth])
      .domain(d3.extent(bookToGraph, data => data.date));

    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([15, 0]);

    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var drawLine = d3
      .line()
      .x(data => xTimeScale(data.date))
      .y(data => yLinearScale(data.rank));

        
    
    chartGroup.selectAll("path.line")
      .transition().duration(1000).attr("d", drawLine(bookToGraph))
      // chartGroup.append("path")
      // .transition
      // // The drawLine function returns the instructions for creating the line for milesData
      // .attr("d", drawLine(bookToGraph))
      // .classed("line", true);

    chartGroup.selectAll("g.axis").remove()
    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);

    // // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // // Translate the bottom axis to the bottom of the page
    // chartGroup.append("g")
    //   .classed("axis", true)
    //   .attr("transform", "translate(0, " + chartHeight + ")")
    //   .call(bottomAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(bottomAxis);

    bookToGraph = []

  }

  titleMenu.on('change', function () {
    var selectedBook = d3.select(this)
      .select('select')
      .property('value')

    updateGraph(selectedBook)
  })
})
