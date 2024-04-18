// Load data from the CSV file
d3.csv("all_seasons.csv").then(function(data) {
    // Convert player_height and player_weight to numeric values
    data.forEach(function(d) {
        d.player_height = +d.player_height;
        d.player_weight = +d.player_weight;
    });

    // Set up SVG dimensions and margins for height histogram
    var margin = { top: 40, right: 30, bottom: 70, left: 70 };
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    // Append SVG for height histogram to the body
    var svgHeight = d3.select("#height-chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up X scale for height histogram
    var xHeight = d3.scaleLinear()
        .domain([d3.min(data, d => d.player_height), d3.max(data, d => d.player_height)])
        .range([0, width]);

    // Set up histogram generator for height
    var histogramHeight = d3.histogram()
        .value(d => d.player_height)
        .domain(xHeight.domain())
        .thresholds(xHeight.ticks(20));

    // Compute bins for height
    var binsHeight = histogramHeight(data);

    // Set up Y scale for height
    var yHeight = d3.scaleLinear()
        .domain([0, d3.max(binsHeight, d => d.length)])
        .range([height, 0]);

    // Append bars to the SVG for height histogram
    svgHeight.selectAll("rect")
        .data(binsHeight)
        .enter()
        .append("rect")
        .attr("x", d => xHeight(d.x0))
        .attr("y", d => yHeight(d.length))
        .attr("width", d => xHeight(d.x1) - xHeight(d.x0) - 1)
        .attr("height", d => height - yHeight(d.length))
        .attr("fill", "steelblue");

    // Append count labels to each bar
    svgHeight.selectAll("text")
        .data(binsHeight)
        .enter()
        .append("text")
        .text(d => d.length) 
        .attr("x", d => xHeight(d.x0) + (xHeight(d.x1) - xHeight(d.x0)) / 2)
        .attr("y", d => yHeight(d.length) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black");

    // Calculate mean player height
    var meanHeight = d3.mean(data, d => d.player_height);

    // Append a line for mean player height
    svgHeight.append("line")
        .attr("x1", xHeight(meanHeight))
        .attr("y1", 0)
        .attr("x2", xHeight(meanHeight))
        .attr("y2", height)
        .attr("stroke", "#FF9933")
        .attr("stroke-width", 2);

    var roundedMeanHeight = Math.round(meanHeight, 2);

    // Append US male mean height line
    var usMaleMeanHeight = 175.26; // US male mean height in cm
    svgHeight.append("line")
        .attr("x1", xHeight(usMaleMeanHeight))
        .attr("y1", 0)
        .attr("x2", xHeight(usMaleMeanHeight))
        .attr("y2", height)
        .attr("stroke", "#935F89")
        .attr("stroke-width", 2);

    // Append X axis for height histogram
    svgHeight.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xHeight));

    // Set up Y axis for height histogram
    svgHeight.append("g")
        .call(d3.axisLeft(yHeight));

    // Append Title for height histogram
    svgHeight.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Distribution of NBA Player Heights");

    // Append X label for height histogram
    svgHeight.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top / 1)
        .style("text-anchor", "middle")
        .text("Height (cm)");

    // Append Y label for height histogram
    svgHeight.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - height / 2)
        .attr("y", 0 - margin.left / 1.5)
        .style("text-anchor", "middle")
        .text("Frequency");

    var legendHeight = svgHeight.append("g")
        .attr("transform", "translate(" + (width - 145) + "," + 10 + ")");
    
    legendHeight.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#FF9933");
    
    legendHeight.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", "11px")
        .text("NBA Mean: " + roundedMeanHeight + "cm");
    
    legendHeight.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#935F89")
        .attr("transform", "translate(0,20)");
    
    legendHeight.append("text")
        .attr("x", 15)
        .attr("y", 30)
        .attr("font-size", "11px")
        .text("Average US Male Adult: " + Math.round(usMaleMeanHeight) + "cm");
    
    // Set up SVG dimensions and margins for weight histogram
    var svgWeight = d3.select("#weight-chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Set up X scale for weight histogram
    var xWeight = d3.scaleLinear()
        .domain([d3.min(data, d => d.player_weight), d3.max(data, d => d.player_weight)])
        .range([0, width]);

    // Set up histogram generator for weight
    var histogramWeight = d3.histogram()
        .value(d => d.player_weight)
        .domain(xWeight.domain())
        .thresholds(xWeight.ticks(20));

    // Compute bins for weight
    var binsWeight = histogramWeight(data);

    // Set up Y scale for weight
    var yWeight = d3.scaleLinear()
        .domain([0, d3.max(binsWeight, d => d.length)])
        .range([height, 0]);

    // Append bars to the SVG for weight histogram
    svgWeight.selectAll("rect")
        .data(binsWeight)
        .enter()
        .append("rect")
        .attr("x", d => xWeight(d.x0))
        .attr("y", d => yWeight(d.length))
        .attr("width", d => xWeight(d.x1) - xWeight(d.x0) - 1)
        .attr("height", d => height - yWeight(d.length))
        .attr("fill", "steelblue");

    // Append count labels to each bar
    svgWeight.selectAll("text")
        .data(binsWeight)
        .enter()
        .append("text")
        .text(d => d.length)
        .attr("x", d => xWeight(d.x0) + (xWeight(d.x1) - xWeight(d.x0)) / 2)
        .attr("y", d => yWeight(d.length) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black");

    // Calculate mean player weight
    var meanWeight = d3.mean(data, d => d.player_weight);

    // Append a line for mean player weight
    svgWeight.append("line")
        .attr("x1", xWeight(meanWeight))
        .attr("y1", 0)
        .attr("x2", xWeight(meanWeight))
        .attr("y2", height)
        .attr("stroke", "#FF9933")
        .attr("stroke-width", 2);

    // Append US male mean weight line
    var usMaleMeanWeight = 90.63; // US male mean weight in kg
    svgWeight.append("line")
        .attr("x1", xWeight(usMaleMeanWeight))
        .attr("y1", 0)
        .attr("x2", xWeight(usMaleMeanWeight))
        .attr("y2", height)
        .attr("stroke", "#935F89")
        .attr("stroke-width", 2);

    // Append X axis for weight histogram
    svgWeight.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xWeight));

    // Set up Y axis for weight histogram
    svgWeight.append("g")
        .call(d3.axisLeft(yWeight));

    // Append Title for weight histogram
    svgWeight.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Distribution of NBA Player Weights");

    // Append X label for weight histogram
    svgWeight.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top / 1)
        .style("text-anchor", "middle")
        .text("Weight (kg)");

    // Append Y label for weight histogram
    svgWeight.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - height / 2)
        .attr("y", 0 - margin.left / 1.5)
        .style("text-anchor", "middle")
        .text("Frequency");

    var legendWeight = svgWeight.append("g")
        .attr("transform", "translate(" + (width - 150) + "," + 10 + ")");
    
    legendWeight.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#FF9933");
    
    legendWeight.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .attr("font-size", "11px")
        .text("NBA Mean: " + Math.round(meanWeight) + "kg");
    
    legendWeight.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", "#935F89")
        .attr("transform", "translate(0,20)");
    
    legendWeight.append("text")
        .attr("x", 15)
        .attr("y", 30)
        .attr("font-size", "11px")
        .text("Average US Male Adult: " + Math.round(usMaleMeanWeight) + "kg");
});