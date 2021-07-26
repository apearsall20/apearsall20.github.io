width = 600;
height = 400;
margin = 75;

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

}

function first_button() {
	first = document.getElementById('#first').className;
    /*document.getElementById('#second').className = "off";
    document.getElementById('#third').className = "off";
*/}


async function second() {
	d3.selectAll("svg").remove();

	home_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/ASPUS.csv");
	inf_data = await d3.csv("https://raw.githubusercontent.com/apearsall20/apearsall20.github.io/master/Inflation.csv");
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
      .text("Relative Change");    ;

	d3.selectAll("svg")
	.append("text")
    .attr("class", "xlabel")
    .attr("transform", "translate("+(margin+width/2)+","+(height+50+margin)+")")
    .text("Date");
}









d3.select("#second").on("click",function(){second()});



document.addEventListener('DOMContentLoaded', () => {
	first();
});