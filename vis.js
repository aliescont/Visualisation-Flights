 
function draw(geo_data) {
  "use strict";
        // Map size 
        var margin = { top: 30, right: 40, bottom: 100, left: 40};
        var width_map = 800;
        var height_map = 650 - margin.top - margin.bottom;

        // Bar chart size
        var width_bar = 450 - margin.right - margin.left;
        var height_bar = 400 - margin.bottom - margin.top;        
        
        // Enabling zoom in map SVG to identify better airports closer together
        var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

        function zoomed() {
          svg_map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        } 

        // SVG for map        
        var svg_map = d3.select("#map")
        .append("svg")
        .attr("width", width_map)
        .attr("height", height_map)
        .append('g')
        .attr('class', 'map')              
        .call(zoom);

        // SVG for chart   
        var svg_bar = d3.select("#chart")
        .append("svg")
        .attr("width", width_bar + margin.right + margin.left)
        .attr("height", height_bar + margin.top + margin.bottom)
        .append("g") 
        .attr('class', 'chart'); 

        // Track zoom events
        var rect = svg_map.append("rect")
        .attr("width", width_map)
        .attr("height", height_map)
        .style("fill", "none")
        .style("pointer-events", "all");

        // Draw map
        var projection = d3.geo.albersUsa()
        .translate([width_map / 2, height_map /2]);

        var path = d3.geo.path().projection(projection);

        var map = svg_map.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', 'lightGray')
        .style('stroke', 'black')
        .style('stroke-width', 0.5);

        // Variable for tooltip for circles to be drawn on map             
        var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0.8);

        function plot_points(data) {
            //draw circles logic based on sum of delayed flights by each airport
            
            function agg_airport(leaves) {
              // function to aggregated data based on sum of delayed, cause of delay and coordinates
              var total = d3.sum(leaves, function(d) {
                return d.delayed;                
              });
              var total_weather = d3.sum(leaves, function(d) {
                return d.weather_del;                
              });
              var total_nas = d3.sum(leaves, function(d) {
                return d.nas_del;                
              });
              var total_sec = d3.sum(leaves, function(d) {
                return d.security_del;                
              });
              var total_late = d3.sum(leaves, function(d) {
                return d.late_aircraft_del;                
              });
              var total_carrier = d3.sum(leaves, function(d) {
                return d.carrier_del;                
              });
              var coords = leaves.map(function(d) {
                return projection([+d.long, +d.lat]);
              });
              var center_x = d3.mean(coords, function(d) {
                return d[0];
              });
              var center_y = d3.mean(coords, function(d) {
                return d[1];
              });  
              return {
                'carrier' : total_carrier,
                'weather' : total_weather,
                'nas' : total_nas,
                'security' : total_sec,
                'late_aircraf' : total_late,
                'delayed' : total,
                'x' : center_x,
                'y' : center_y
              };
            }

            // nested data base on airport and year
            var nested = d3.nest()
            .key(function(d) {
              return d.airport_name+ d.date.getFullYear();
            })
            .rollup(agg_airport)
            .entries(data);

           // Calculate delayed flights max to be the radius of each circle to be drawn on map, proportional to the number of flights delayed 
           var delayed_max = d3.max(nested, function(d) {
            return d.values.delayed;
          });

           var radius = d3.scale.sqrt()
           .domain([0, delayed_max])
           .range([0, 22]);

           function key_func(d) {
            return d.key;
          }
            //Bar chart
            var chart = d3.select(".chart")
            .attr("width", width_bar)
            .attr("height", height_bar)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");   

            // Barc chart Title
            chart.append("text")
            .attr("x", (width_bar / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("fill", "#535456")
            .text("Total delayed flights by month");

           // Scales 
           var x = d3.time.scale()
           .domain([new Date(2016,0, 1), new Date(2016,11, 31)])
           .range([0, width_bar]);

           var y = d3.scale.linear()
           .domain([0, d3.max(data, function(d) { return d.delayed; })])
           .range([height_bar , 0]);
          
          // Axis
          var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")               
          .tickFormat(d3.time.format("%b"));

          chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height_bar + ")")
          .call(xAxis);

          var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5);

          chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "start")
          .style("font-size", "10px") 
          .style("fill", "#535456")
          .text("Total delay (min)");

            function update(year) {
          // Logic to plot points based on button selected
          var filtered = data.filter(function(d) {
            return d.date.getFullYear() === year;
          });

          // nested data based on filter by year selected
          var nested = d3.nest()
          .key(function(d) {
            return d.airport_name;
          })
          .rollup(agg_airport)
          .entries(filtered);

          //Update points in map
          d3.select('.bubble').remove();


          svg_map.append('g')
          .attr("class", "bubble")
          .selectAll("circle")
          .data(nested.sort(function(a, b) { 
            return b.values.delayed - a.values.delayed;
          }), key_func)
          .enter()
          .append("circle")
          .attr('cx', function (d) {return d.values.x;})
          .attr('cy', function (d) {return d.values.y;})
          .attr('r', function(d) {
            return radius(d.values.delayed);
          })
          .attr('fill', 'Blue')
          .attr('stroke', 'black')
          .attr('opacity', 0.8)
          .on("mouseover", function(d){
            div.html( "Airport : " + d.key  +  " </br> " + "Total delayed on flights : " + Math.round(d.values.delayed) 
              +  " </br> " + "Total weather delay : " + Math.round(d.values.weather)
              +  " </br> " + "Total nas delay : " + Math.round(d.values.nas)
              +  " </br> " + "Total security delay : " + Math.round(d.values.security)
              +  " </br> " + "Total carrier delay : " + Math.round(d.values.carrier)
              +  " </br> " + "Total late aircraf delay : " + Math.round(d.values.carrier));
            div.style("visibility", "visible");
          })
          .on("mousemove", function(){return div.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
          .on("mouseout", function(){return div.style("visibility", "hidden");});

          x.domain(d3.extent(filtered,function(d) { return d.date; }));
          y.domain([0, d3.max(filtered, function(d) { return d.delayed; })]);

              // Update Bars in chart
              var bar = chart.selectAll(".bar")
              .data(filtered)

              bar.enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.date); })
              .attr("y", height_bar)
              .attr("width", width_bar/15)
              .attr("height", 0);

              bar.transition()
              .duration(500)
              .attr("y", function(d) { return y(d.delayed); })
              .attr("height", function(d) { return height_bar - y(d.delayed); })   
              bar.exit().remove();  

              var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")               
              .tickFormat(d3.time.format("%b"));
              chart.selectAll(".x.axis")
              .call(xAxis);   

            }

        var legend = svg_map.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (width_map - 150) +", " + (50) + ")")
          .selectAll("g")
            .data([10000, 50000, 100000])
          .enter().append("g");

        legend.append("circle")
            .attr("cy", function (d) { return -1*radius(d); })
            .attr ("r", radius);
        legend.append("text")
            .attr("y", function(d) {return -2*radius(d); })
            .attr("dy", "0.1em")
            .text(d3.format(".1s"));


        // buttons logic to select and update based on year selected
        var years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];

        var buttons = d3.select("#year")
        .append("div")
        .attr("class", "years_buttons")
        .selectAll("div")
        .data(years)
        .enter()
        .append("div")
        .text(function(d) {
          return d;
        });

        buttons.on("click", function(d) {
          d3.select(".years_buttons")
          .selectAll("div")
          .transition()
          .duration(500)
          .style("color", "black")
          .style("background", "#6e92a3");
          d3.select(this)
          .transition()
          .duration(500)
          .style("background", "#b8ced8")
          .style("color", "white");
          update(d);
        });
      }
      var format = d3.time.format("%Y-%m-%d");
      d3.tsv("data_v2.tsv", function(d) {
        d.delayed = +d.delayed;
        d.date = format.parse(d.date);
        d.weather_del = +d.weather_del;
        return d;
      }, plot_points);
    };

    // load geojson
    d3.json("us_new.json", draw);
