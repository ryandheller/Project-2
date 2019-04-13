// Chart Params
// var svgWidth = 960;
// var svgHeight = 960;

// var margin = { top: 20, right: 40, bottom: 60, left: 50 };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
function render_lines(author){
d3.json('nyt/authorsort',function(data){
  filtered = data.filter(function(d){
    return d.author.toLowerCase() == author.toLowerCase()
  })
  // console.log(filtered)
  titles = []
  filtered.forEach(function(d){
    if (d.title in titles){'nothing'}
    else {titles.push(d.title)}
  })
  var titles_set = new Set(titles)
  // console.log(titles_set)
  title_data = []
  titles_list = []
  titles_set.forEach(function(d){
    titles_list.push(d)
    filtered.forEach(function(g){
      if (d === g.title){
        title_data.push({'date':g.date,'rank':g.rank, 'title':g.title})
      } else {'nothing'}
    })
  })


data_to_plot = [] 
titles_list.forEach(function(d){
  data = []
   title_data.forEach(function(g){
     if (g.title === d){
       data.push({'date':g.date,'rank':g.rank,'title':g.title})
       
     }
   })
   data_to_plot.push(data)
 })
 ranks = []
tracers = []
 data_to_plot.forEach(function(d){
   sum = 0
   dates = []
   ranks = []
   d.forEach(function(g){
     sum +=1
     dates.push(sum)
     ranks.push(g.rank)
     title = g.title
   })
   trace = {
    x: dates,
    y: ranks,
    type: 'scatter',
    name: title
  };
  tracers.push(trace)
 })
//  console.log(tracers)


      
      var data = tracers;
      var layout = {
        autosize: false,
        width: 960,
        height: 500,
        title: author.toUpperCase(),
        xaxis: {
          title: 'Weeks on List'
        },
        yaxis: {
          title: 'Rank'
        }
      }
      
      Plotly.newPlot('pie', data, layout);
    
    })}

    let author = d3.select('#filter-btn').on('click', function(e) {
      d3.event.preventDefault();
      let author = d3.select('#author').node().value
      // console.log(author)
      render_lines(author)
    })
// render_lines('A S A Harrison')
//   var xTimeScale = d3.scaleTime()
//     .domain(new Date (2013,8,11), new Date (2013,9,15))
//     .range([0, width]);

//   var yLinearScale1 = d3.scaleLinear()
//     .domain([0, d3.max(filtered, d => d.rank)])
//     .range([height, 0]);

//   // var yLinearScale2 = d3.scaleLinear()
//   //   .domain([0, d3.max(smurfData, d => d.smurf_sightings)])
//   //   .range([height, 0]);

//   // Create axis functions
//   var bottomAxis = d3.axisBottom(xTimeScale)
//     .tickFormat(d3.timeFormat("%d-%b-%Y"));
//   var leftAxis = d3.axisLeft(yLinearScale1);
//   // var rightAxis = d3.axisRight(yLinearScale2);

//   // Add x-axis
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // Add y1-axis to the left side of the display
//   chartGroup.append("g")
//     // Define the color of the axis text
//     .classed("green", true)
//     .call(leftAxis);

//   // Add y2-axis to the right side of the display
//   // chartGroup.append("g")
//   //   // Define the color of the axis text
//   //   .classed("blue", true)
//   //   .attr("transform", `translate(${width}, 0)`)
//   //   .call(rightAxis);

//   // Line generators for each line
//   var line1 = d3.line()
//     .x(d => xTimeScale(d.Kindle))
//     .y(d => yLinearScale1(d.rank));

//   // var line2 = d3.line()
//   //   .x(d => xTimeScale(d.date))
//   //   .y(d => yLinearScale2(d.smurf_sightings));

//   // Append a path for line1
//   chartGroup.append("path")
//     .data(filtered)
//     .attr("d", line1)
//     .classed("line green", true);

//   // Append a path for line2
//   // chartGroup.append("path")
//   //   .data(filtered)
//   //   .attr("d", line2)
//   //   .classed("line blue", true);

//   // Append axes titles
//   chartGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
//     .classed("dow-text text", true)
//     .text("Dow Index");

//   chartGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
//     .classed("smurf-text text", true)
//     .text("Smurf Sightings");
  
 
// })

// // Import data from an external CcdSV file
// d3.csv("static/resources/authorfake.csv", function(error, smurfData) {
//   if (error) throw error;

//   console.log(smurfData);
//   console.log([smurfData]);

//   // Create a function to parse date and time
//   var parseTime = d3.timeParse("%d-%b-%Y");

//   // Format the data
//   smurfData.forEach(function(data) {
//     data.date = parseTime(data.date);
//     console.log(data.date)
//     data.dow_index = +data.dow_index;
//     data.smurf_sightings = +data.smurf_sightings;
//   });})

//   // Create scaling functions
//   var xTimeScale = d3.scaleTime()
//     .domain(d3.extent(smurfData, d => d.date))
//     .range([0, width]);

//   var yLinearScale1 = d3.scaleLinear()
//     .domain([0, d3.max(smurfData, d => d.dow_index)])
//     .range([height, 0]);

//   var yLinearScale2 = d3.scaleLinear()
//     .domain([0, d3.max(smurfData, d => d.smurf_sightings)])
//     .range([height, 0]);

//   // Create axis functions
//   var bottomAxis = d3.axisBottom(xTimeScale)
//     .tickFormat(d3.timeFormat("%d-%b-%Y"));
//   var leftAxis = d3.axisLeft(yLinearScale1);
//   var rightAxis = d3.axisRight(yLinearScale2);

//   // Add x-axis
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // Add y1-axis to the left side of the display
//   chartGroup.append("g")
//     // Define the color of the axis text
//     .classed("green", true)
//     .call(leftAxis);

//   // Add y2-axis to the right side of the display
//   chartGroup.append("g")
//     // Define the color of the axis text
//     .classed("blue", true)
//     .attr("transform", `translate(${width}, 0)`)
//     .call(rightAxis);

  // Line generators for each line
//   var line1 = d3.line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale1(d.dow_index));
// console.log(line1)
//   var line2 = d3.line()
//     .x(d => xTimeScale(d.date))
//     .y(d => yLinearScale2(d.smurf_sightings));

//   // Append a path for line1
//   chartGroup.append("path")
//     .data([smurfData])
//     .attr("d", line1)
//     .classed("line green", true);

//   // Append a path for line2
//   chartGroup.append("path")
//     .data([smurfData])
//     .attr("d", line2)
//     .classed("line blue", true);

//   // Append axes titles
//   chartGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
//     .classed("dow-text text", true)
//     .text("Dow Index");

//   chartGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
//     .classed("smurf-text text", true)
//     .text("Smurf Sightings");
// });
