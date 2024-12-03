function updateChart(selectedGroup, selectedCountry){
	
	// Data Source: Google Mobility, report on Github
	// https://github.com/ActiveConclusion/COVID19_mobility/blob/master/summary_reports/summary_report_countries.csv
	//d3.csv("https://raw.githubusercontent.com/ActiveConclusion/COVID19_mobility/master/summary_reports/summary_report_countries.csv", 
	
	d3.csv("/mobility-data.csv",
		function(error, data) {
			
			if (error) throw error;
			d3.timeFormatDefaultLocale({
				"decimal": ".",
				"thousands": ",",
				"grouping": [3],
				"currency": ["$", ""],
				"dateTime": "%a %b %e %X %Y",
				"date": "%m/%d/%Y",
				"time": "%H:%M:%S",
				"periods": ["AM", "PM"],
				"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				"shortDays": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				"months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
				"shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			  });
			  
			var newdata = data.filter(function(d){ return d.country == selectedCountry});
  
			var chart = new Calendar(d3.select('#calendar'), newdata,{
				'datefield': 'date',
				'key' : selectedGroup,
				'year': 2020,
				'dateformat': '%d-%B-%Y',
				'mondaystart': true,
			  });
		  
		// Legend
		// Using library from: https://d3-legend.susielu.com/
		  
		// Get the min and max of the domain
		var domainmin = d3.min(newdata, function(d){ return +d[selectedGroup]});
		var domainmax = d3.max(newdata, function(d){ return +d[selectedGroup]});
		  
		  
		// Sequential Scale for Legend
		var sequentialScale = d3.scaleSequential(d3.interpolateRdBu).domain([domainmax, domainmin]);
		  
		// Linear scale for legend
		// great source for this: https://www.d3indepth.com/scales/
		  
		let linearScale = d3.scaleLinear()
		.domain([domainmin, 0, domainmax])
		.range(['blue', '#ddd', 'red']);
		  
		var svg = d3.select("svg");
		svg.append("g")
		.style("font-size", "10px")
		.attr("class", "legendSequential")
		.attr("transform", "translate(20,20)");
		   
		var legendSequential = 
		d3.legendColor().
		shapeWidth(30).cells(10)
		.orient("horizontal")
		.scale(linearScale) // replace with "sequentialScale" for sequential scale
  
		svg.select(".legendSequential")
		.call(legendSequential);
	});
};
		  

// call to update LineCalendar on change

d3.select("#calendarCountry").on("change", function(d){

	selectedCountry = String(this.value);
	d3.select('#exports').selectAll("*").remove();
	d3.select('#calendar .chart').remove();
	updateLineCalendar(selectedCountry)
	updateChart(selectedGroup, selectedCountry)
})

  
			  
// call to update Calendar Heatmap on change
d3.select("#ddlViewBy").on("change", function(d){
	selectedGroup = String(this.value);
	d3.select("#calendar").selectAll("*").remove();
	updateChart(selectedGroup, selectedCountry)
});
  

// Initiate selectedGroup, selectedCountry, calendar heatmap

var selectedCountry = "Germany";
var selectedGroup = "driving";
updateChart(selectedGroup, selectedCountry);                       

