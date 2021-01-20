//TODO try to display room temperature (y axis) with timestamps (x axys)

const svg = d3.select("#fitiot-chart-area")
    .append("svg")
    .attr("width", 600)
    .attr("height", 400)

const g = svg.append("g")
    .attr("transform", `translate(100, 30)`)

d3.json("http://localhost:3000/sensors-data-fitiot").then(data => {

    console.log("Here is all the data", data);
    console.log("Here is one entry", data[0])
    console.log("Here is a timestamp", data[0].timestamp)

    // Scaling the y axis
    const y = d3.scaleLinear()
       .domain([0, d3.max(data, d => d.temperature)])    // input
       .range([340, 0])  // output

    // Scaling x axis : timestamps
    const x = d3.scaleBand()
        .domain(data.map(d => d.timestamp)) // input
        .range([0, 480])
        .paddingInner(0.5)
        .paddingOuter(0.2) // ouput

    const xAxisCall = d3.axisBottom(x)
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, 340)`)
            .call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
    
    const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d)
        g.append("g")
          .attr("class", "y axis")
          .call(yAxisCall)
    

    // Draw rects
    const rects = g.selectAll("rect")
        .data(data)
    
    rects.enter().append("rect")
        .attr("y", d => y(d.temperature))
        .attr("x", d => x(d.timestamp))
        .attr("width", x.bandwidth)
        .attr("height", d => 340 - y(d.temperature))
        .attr("fill", "#6a976a")
}).catch( err => console.error(err));
