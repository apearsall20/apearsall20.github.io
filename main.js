width = 600;
height = 400;
margin = 75;
active = d3.select(null);

async function first() {
	d3.select("svg").remove();

	home_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/ASPUS.csv");
	parseDate = d3.timeParse('%Y-%m-%d');
	minTime = parseDate(home_data[0].DATE);
	maxTime = parseDate(home_data[204].DATE);
	
	var x = d3.scaleTime()
	.range([0, width])
	.domain([minTime, maxTime]);

	ymin = 0;
	ymax = 403900;

	var y = d3.scaleLinear()
	.domain([ymin, ymax*1.05])
	.range([height,0]);

	d3.select("#viz").append("svg");
	d3.select("svg").append("g")
	.attr("transform","translate("+(50+margin)+","+margin+")")
	.style("font-size",14)
	.call(d3.axisLeft(y));

	d3.select("svg").append("g")
	.attr("transform","translate("+(50+margin)+","+(height+margin)+")")
	.style("font-size",14)
	.call(d3.axisBottom(x));

	var line = d3.line()
	.x(function(d) {return x(parseDate(d.DATE));})
	.y(function(d) {return y(d.ASPUS);});

	d3.select("svg")
	.attr("width", width + 2*margin)
	.attr("height", height + 2*margin)
	.append("g")
	.attr("transform", "translate("+(50+margin)+","+margin+")")
	.selectAll("path").data(home_data).enter().append("path")
	.datum(home_data)
	.attr("d", line)
	.attr("fill", "none")
	.attr("stroke", "black")


	d3.selectAll("svg")
  	.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin/3)
      .attr("x", -height*2/3)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Median Home Price ($)");    ;

	d3.selectAll("svg")
	.append("text")
    .attr("class", "xlabel")
    .attr("transform", "translate("+(margin+width/2)+","+(height+50+margin)+")")
    .text("Date");

    d3.select('#first')
    .attr("class", "active")

    d3.select('#second')
    .attr("class", "off")

    d3.select('#third')
    .attr("class", "off")

    d3.select('#f')
    .attr("class", "show")

    d3.select('#s')
    .attr("class", "hide")

    d3.select('#t')
    .attr("class", "hide")

}



async function second() {
	d3.selectAll("svg").remove();

	home_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/ASPUS.csv");
	inf_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/Inflation.csv");
	wage_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/wages.csv");
	SP_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/SP500.csv");
	parseDate = d3.timeParse('%Y-%m-%d');
	console.log(home_data[0]);
	minTime = parseDate(home_data[0].DATE);
	maxTime = parseDate(home_data[204].DATE);
	
	var x = d3.scaleTime()
	.range([0, width])
	.domain([minTime, maxTime]);

	ymin = 0;
	ymax = 15;

	var y = d3.scaleLinear()
	.domain([ymin, ymax])
	.range([height,0]);

	console.log(ymax);
	d3.select("#viz").append("svg");
	d3.select("svg").append("g")
	.attr("transform","translate("+(50+margin)+","+margin+")")
	.style("font-size",14)
	.call(d3.axisLeft(y));

	d3.select("svg").append("g")
	.attr("transform","translate("+(50+margin)+","+(height+margin)+")")
	.style("font-size",14)
	.call(d3.axisBottom(x));

	var line = d3.line()
	.x(function(d) {return x(parseDate(d.DATE));})
	.y(function(d) {return y(d.Cumulative_Change);});




	var line2 = d3.line()
	.x(function(d) {return x(parseDate(d.date));})
	.y(function(d) {return y(d.Cumulative);});

	var line3 = d3.line()
	.x(function(d) {return x(parseDate(d.Year));})
	.y(function(d) {return y(d.Cumulative_Wage);});


	var line4 = d3.line()
	.x(function(d) {return x(parseDate(d.Year));})
	.y(function(d) {return y(d.Relative);});

	console.log(SP_data);
	d3.select("svg")
	.attr("width", width + 2*margin)
	.attr("height", height + 2*margin)
	.append("g")
	.attr("transform", "translate("+(50+margin)+","+margin+")")
	.selectAll("path").data(home_data).enter().append("path")
	.datum(home_data)
	.attr("d", line)
	.attr("fill", "none")
	.attr("stroke", "black")
	

	d3.select("svg").append("path").datum(inf_data)
	.attr("d", line2)
	.attr("fill", "none")
	.attr("stroke","green")
	.attr("transform", "translate("+(50+margin)+","+margin+")")

	d3.select("svg").append("path").datum(wage_data)
	.attr("d", line3)
	.attr("fill", "none")
	.attr("stroke","red")
	.attr("transform", "translate("+(50+margin)+","+margin+")")

	d3.select("svg").append("path").datum(SP_data)
	.attr("d", line4)
	.attr("fill", "none")
	.attr("stroke","blue")
	.attr("transform", "translate("+(50+margin)+","+margin+")")

	d3.selectAll("svg")
  	.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin/3)
      .attr("x", -height*2/3)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Relative Change");    ;

	d3.selectAll("svg")
	.append("text")
    .attr("class", "xlabel")
    .attr("transform", "translate("+(margin+width/2)+","+(height+50+margin)+")")
    .text("Date");

    legend = d3.select("svg").append("g");

   	names = ['Home Price Index', 'Inflation', 'Wages', 'S&P 500'];
   	colors = ['black','green','red','blue'];

   	legend.selectAll("rect").data(colors).enter().append("rect")
   	.attr("fill", function(d){return d;})
   	.attr("x", margin*2)
   	.attr("y", function(d,i) {return i*20 +30;})
   	.attr("width",20)
   	.attr("height",3)

   	legend.selectAll("text").data(names).enter().append("text")
   	.attr("x",margin*2+30)
   	.attr("y", function(d,i) {return i*20 +35;})
   	.attr("text-anchor","start")
   	.text(function(d){return d;})


    d3.select('#first')
    .attr("class", "off")

    d3.select('#second')
    .attr("class", "active")

    d3.select('#third')
    .attr("class", "off")

    d3.select('#f')
    .attr("class", "hide")

    d3.select('#s')
    .attr("class", "show")

    d3.select('#t')
    .attr("class", "hide")

}


async function third() {
	d3.selectAll("svg").remove();



    d3.select("#viz").append("svg")
  	.attr("width", width + 2*margin)
	.attr("height", height + 2*margin)

    d3.select("svg").append('rect')
        .attr('class', 'background')
        .attr('height', height + 2*margin)
        .attr('width', width + 2*margin)
        .on('click', clicked);
    
    Promise.resolve(d3.json('https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json'))
        .then(ready);
      

    county_max = 3173588;
    min = 20547;
    state_max = 792627;


    var projection = d3.geoAlbersUsa()
       .translate([width /2 , height / 2])
       .scale(width*1.5)  

	var path = d3.geoPath()
       .projection(projection);

    county_color = d3.scaleLinear()
    .domain([0,county_max])
    .range(['white','blue'])

    state_color = d3.scaleLinear()
    .domain([0,state_max])
    .range(['white','blue'])

	big_group = d3.select("svg").append("g")
        .attr('transform', 'translate('+margin+','+margin+')')
        .attr('width', width + margin + margin)
        .attr('height', height + margin + margin)

	county_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/by_county.csv");
	state_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/by_state.csv");


function ready(us) {

    big_group.append("g")                
        .attr("id", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "county-boundary")
        .on("click", reset);

	big_group.append("g")	
        .attr("id", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "state")
        .on("click", clicked);
           
	big_group.append("path")
    	.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    	.attr("id", "state-borders")
    	.attr("d", path);


}

function clicked(d) {
    if (d3.select('.background').node() === this) return reset();

    if (active.node() === this) return reset();

    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    big_group.transition()
        .duration(750)
        .style("stroke-width", 1.5 / scale + "px")
        .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
}


function reset() {
    active.classed("active", false);
    active = d3.select(null);

    big_group.transition()
        .delay(100)
        .duration(750)
        .style("stroke-width", "1.5px")
        .attr('transform', 'translate('+margin+','+margin+')');

}
	parseDate = d3.timeParse('%Y-%m-%d');


	




    d3.select('#first')
    .attr("class", "off")

    d3.select('#second')
    .attr("class", "off")

    d3.select('#third')
    .attr("class", "active")

    d3.select('#f')
    .attr("class", "hide")

    d3.select('#s')
    .attr("class", "hide")

    d3.select('#t')
    .attr("class", "show")

}


d3.select("#first").on("click",function() {first()});

d3.select("#second").on("click",function() {second()});

d3.select("#third").on("click",function() {third()});

document.addEventListener('DOMContentLoaded', () => {
	first();
});