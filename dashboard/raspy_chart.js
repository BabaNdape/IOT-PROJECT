//TODO try to display temperatureIn (y axis) with timestamps (x axys)

const svg = d3.select("#raspy-chart-area")
    .append("svg")
    .attr("width", 600)
    .attr("height", 400)

const g = svg.append("g")
    .attr("transform", `translate(100, 30)`)

d3.json("http://localhost:3000/sensors-data-raspy").then(data => {

    console.log("Here is all the data", data);
    console.log("Here is one entry", data[0])

    // Scaling the y axis
    const y = d3.scaleLinear()
       .domain([0, d3.max(data, d => d.temperatureIn)])    // input
       .range([340, 0])  // output

    // Scaling x axis : timestamps
    const x = d3.scaleBand()
        .domain(data.map(d => d.timestamp))    // input
        .range([0, 480])
        .paddingInner(0.5)
        .paddingOuter(0.2)// ouput

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
        .attr("y", d => y(d.temperatureIn))
        .attr("x", d => x(d.timestamp))
        .attr("width", x.bandwidth)
        .attr("height", d => 340 - y(d.temperatureIn))
        .attr("fill", "#6a976a")
}).catch( err => console.error(err));