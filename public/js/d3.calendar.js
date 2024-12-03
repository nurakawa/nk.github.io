class Calendar{
  constructor(selection, data, config = {}) {
    let self = this;
    this.selection = selection;
    this.data = data;
    
    // Graph configuration
    this.cfg = {
      'margin': {'top': 100, 'right': 30, 'bottom': 10, 'left': 50},
      //'key': 'key',
      'key': 'key',
      'datefield': 'date',
      'dateformat': '%d-%m-%Y', // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
      'title': false,
      'source': false,
      'rectsize': 12,
      //'colorScale': d3.interpolateRdYlBu,
      //'colorScale' : d3.interpolateRdBu,
      'emptycolor': '#EEE',
      'year': false,
      'mondaystart': true,
      'weekdayformat': '%a',
      'monthformat': '%b',
    };
    Object.keys(config).forEach(function(key) {
      if(config[key] instanceof Object && config[key] instanceof Array === false){
        Object.keys(config[key]).forEach(function(sk) {
          self.cfg[key][sk] = config[key][sk];
        });
      } else self.cfg[key] = config[key];
    });
    
    this.cfg.width = parseInt(this.selection.node().offsetWidth) - this.cfg.margin.left - this.cfg.margin.right,
    this.cfg.height = parseInt(this.selection.node().offsetHeight)- this.cfg.margin.top - this.cfg.margin.bottom;
    
    this.extentdates = d3.extent(this.data, function(d){ return d[self.cfg.datefield]});
    this.year = self.cfg.year ? self.cfg.year : + self.extentdates[0].substr(0,4);
    this.cfg.rectsize = this.cfg.width/53 < this.cfg.height/7 ? this.cfg.width/53 : this.cfg.height/7;
    this.dayCalc = this.cfg.mondaystart ? function(d) { return (d.getDay() + 6) % 7; } : function(d) { return d.getDay(); }
    this.weekCalc = this.cfg.mondaystart ? d3.timeFormat("%W") : d3.timeFormat("%U");
    //this.cScale = d3.scaleSequential(this.cfg.colorScale).domain([d3.min(this.data, function(d){ return +d[self.cfg.key]}), 0,
 //   d3.max(this.data, function(d){ return +d[self.cfg.key]})]);
   
    let linearScale = d3.scaleLinear()
.domain([d3.min(this.data, function(d){ return +d[self.cfg.key]}), 0,
   d3.max(this.data, function(d){ return +d[self.cfg.key]})])
   .range(['blue', '#ddd', 'red']);
    this.weekDay = d3.timeFormat(self.cfg.weekdayformat);
    this.monthName = d3.timeFormat(self.cfg.monthformat);
    
    this.cScale = linearScale;
    
    this.initGraph();
  }
  initGraph() {
    var self = this;
    
    //this.cScale.domain(d3.extent(this.data, function(d){ return +d[self.cfg.key]}).reverse())
    
    this.svg = this.selection.append('svg')
    .attr("class", "chart calendar")
    .attr("viewBox", "0 0 "+(this.cfg.width + this.cfg.margin.left + this.cfg.margin.right)+" "+(this.cfg.height + this.cfg.margin.top + this.cfg.margin.bottom))
    .attr("width", this.cfg.width + this.cfg.margin.left + this.cfg.margin.right)
    .attr("height", this.cfg.height + this.cfg.margin.top + this.cfg.margin.bottom);
    
    this.g = this.svg.append("g")
    .attr("transform", "translate(" + (self.cfg.margin.left) + "," + (self.cfg.margin.top) + ")");
    
    // TITLE
    if(self.cfg.title){
      this.svg.append('text')
      .attr('class', 'title label')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate('+ (self.cfg.width/2) +',20)')
      .text(self.cfg.title)
    }
    
    // SOURCE
    if(self.cfg.source){
      this.svg.append('text')
      .attr('class', 'source label')
      .attr('transform', 'translate('+ (self.cfg.margin.left) +','+(self.cfg.height + self.cfg.margin.top + self.cfg.margin.bottom - 5)+')')
      .html(self.cfg.source)
      
    }
    
    this.rects = this.g.selectAll("rect")
    .data(function(d) { return d3.timeDays(new Date(self.year, 0, 1), new Date(self.year + 1, 0, 1)); })
    .enter().append("rect")
    .attr("width", self.cfg.rectsize)
    .attr("height", self.cfg.rectsize)
    .attr("x", function(d) { return self.weekCalc(d) * self.cfg.rectsize; })
    .attr("y", function(d) { return self.dayCalc(d) * self.cfg.rectsize; })
    .attr("fill", self.cfg.emptycolor)
    
    var nesteddata = d3.nest()
    .key(function(d) { return d[self.cfg.datefield]; })
    .rollup(function(d) { return +d[0][self.cfg.key]; })
    .object(this.data);
    
    this.rects.filter(function(d) { return d.yyyymmdd() in nesteddata; })
    .attr("fill", function(d) { return self.cScale(nesteddata[d.yyyymmdd()]); })
    .append("title")
    .text(function(d) { return d.mmdd() + " : " + nesteddata[d.yyyymmdd()] + "%"; });
    
    
    self.drawLabels();
  }
  
  drawLabels() {
    var self = this;
    
    var j_start = this.cfg.mondaystart ? 1 : 0;
    
    for(var j = j_start; j < j_start+7; j++){
      self.g.append("text")
      .attr("class", 'label')
      .style("text-anchor", "end")
      .attr("dy", self.cfg.rectsize * (j - j_start) + self.cfg.rectsize*0.7)
      .attr("dx", "-1em")
      .text(self.weekDay(new Date(2018, 0, j)));
    }
    for(var j = 0; j < 12; j++){
      self.g.append("text")
      .attr("class", 'label')
      .style("text-anchor", "middle")
      .attr("dy", -5)
      .attr("dx", (j*self.cfg.rectsize*4.4) + (self.cfg.rectsize*2.2))
      .text(self.monthName(new Date(2018, j, 1)));
    }
  }
  
}

// DATES: Year, Month and Day
Date.prototype.yyyymmdd = function(joinchar='-') {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  
  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
  ].join(joinchar);
};


// DATES: Month and Day only
Date.prototype.mmdd = function(joinchar='/') {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();
  
  return [(mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
  ].join(joinchar);
};
