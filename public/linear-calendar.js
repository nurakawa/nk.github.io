// function to update Linear Calendar    
        
function updateLineCalendar(selectedCountry){

d3.csv('/response-graph.csv', function(data) {
	
	var data = data.filter(function(d){ return d.Country == selectedCountry});
	
	data.forEach(function(d){
		d.inicio = d.inicio.substring(0, d.inicio.length - 5);
		d.fin = d.fin.substring(0, d.fin.length - 5);
	});

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
		"shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		"months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		"shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	
	var grafico = new LinearCalendar(d3.select('#exports'), data, {
		'year': 'anyo',
		'start': 'inicio',
		'end': 'fin',
		'domain': ['01-01', '31-12'],
		'color': 'black',
		'dateformat': '%d-%m',
		'title': 'Covid-19 Response Measures',
		'source': '<a href="https://www.ecdc.europa.eu/en/publications-data/download-data-response-measures-covid-19"></a>',
	})
				
})
}


// Initiate
updateLineCalendar("Germany");
