class LinearCalendar{
    constructor(selection, data, config = {}) {
        let self = this;
        this.selection = selection;
        this.data = data;

        // Graph configuration
        this.cfg = {
            'margin': {'top': 30, 'right': 20, 'bottom': 40, 'left': 60},
            'year': 'key',
            'start': 'start',
            'end': 'end',
            'domain': ['01-01-2020', '12-31-2020'],
            //'dateformat': '%d-%m-%Y', // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
            'dateformat': '%Y-%m-%d',
            'scaleformat': '%B',
            'color': 'steelblue',
            'title': false,
            'source': false,
            'radius': 4,
            'stroke': 2.5,
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

        this.parseTime = d3.timeParse(this.cfg.dateformat);
        this.formatTime = d3.timeFormat(this.cfg.dateformat);
        this.formatTimeLeg = d3.timeFormat('%d %B');
        this.yScale = d3.scaleBand().rangeRound([0, self.cfg.height]).padding(1);
        this.xScale = d3.scaleTime().range([0, this.cfg.width]);

        this.initGraph();
    }
    initGraph() {
     var self = this;

        this.data.forEach(function(d){
            d.jsdateStart = self.parseTime(d[self.cfg.start]);
            d.jsdateEnd = self.parseTime(d[self.cfg.end]);
        });

        this.yScale.domain(this.data.map(function(d){ return +d[self.cfg.year]}))
        this.xScale.domain([self.parseTime(self.cfg.domain[0]), self.parseTime(self.cfg.domain[1])]);

        this.svg = this.selection.append('svg')
            .attr("class", "chart calendar-linear")
            .attr("viewBox", "0 0 "+(this.cfg.width + this.cfg.margin.left + this.cfg.margin.right)+" "+(this.cfg.height + this.cfg.margin.top + this.cfg.margin.bottom))
            .attr("width", this.cfg.width + this.cfg.margin.left + this.cfg.margin.right)
            .attr("height", this.cfg.height + this.cfg.margin.top + this.cfg.margin.bottom);

        this.g = this.svg.append("g")
            .attr("transform", "translate(" + (self.cfg.margin.left) + "," + (self.cfg.margin.top) + ")");
        
        this.yGrid = this.g.append("g")           
            .attr("class", "grid grid--y")
            .call(self.make_y_gridlines()
                .tickSize(-self.cfg.width)
                .tickFormat(""));

        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.cfg.height + ")")
            .call(d3.axisBottom(self.xScale)
                .tickFormat(d3.timeFormat(self.cfg.scaleformat)));
        
        //var key = ["Ban on All Events", "Close Entertainment Venues",
        //"Stay at Home Order", "Teleworking", "Workplace Closures"] 

        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(self.yScale));

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


        // ITEM GROUP
        this.itemg = this.g.selectAll('.itemgroup')
            .data(this.data)
            .enter().append('g')
            .attr('class', 'itemgroup')
            .attr('transform', function(d, i){
                return 'translate(0,'+ self.yScale(d[self.cfg.year]) +')';
        })

        this.itemg.append('line')
            .attr('y1', 0)
            .attr('x1', function(d){
                return self.xScale(d.jsdateStart);
            })
            .attr('y2', 0)
            .attr('x2', function(d){
                return self.xScale(d.jsdateEnd);
            })
            .attr('stroke', self.cfg.color)
            .attr('stroke-width', self.cfg.stroke)

        this.itemg.append('circle')
            .attr('class', 'start')
            .attr('cy', 0)
            .attr('cx', function(d){
                return self.xScale(d.jsdateStart);
            })
            .attr('r', self.cfg.radius)
            .attr('stroke-width', 3)
            .attr('fill', self.cfg.color);
            
        this.itemg.append('circle')
            .attr('class', 'end')
            .attr('cy', 0)
            .attr('cx', function(d){
                return self.xScale(d.jsdateEnd);
            })
            .attr('r', self.cfg.radius)
            .attr('stroke-width', 3)
            .attr('fill', self.cfg.color);
            
        // MOUSE INDICATOR
        this.mouseover = this.g.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', self.cfg.width)
            .attr('height', self.cfg.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            
        this.mousegroup = this.g.append('g')
            .attr('class', 'mousegroup')
            .attr('pointer-events', 'none')
            .style("opacity", "0");

        this.mouseline = this.mousegroup.append("path") // this is the black vertical line to follow mouse
            .attr("class", "mouse-line")
            .attr("shape-rendering", "crispEdges")
            .style("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", 0.3)
            .attr("d", "M0,"+ (self.cfg.height - self.yScale.step()) + " 0," + self.yScale.step())

        this.mousetext = this.mousegroup.append("text")
            .attr('text-anchor', 'middle')
            .attr('class', 'label')
            .style('font-size', '10px')
            .attr('y', self.yScale.step() -2);
            

        this.mouseover.on('mouseover', function(){
            self.mousegroup.style('opacity', '1')
        }).on('mouseout', function(){
            self.mousegroup.style('opacity', '0')
        }).on('mousemove', function(){
            var mouse = d3.mouse(this);
            var tim = self.formatTime(self.xScale.invert(mouse[0]));
            self.mousegroup.attr("transform", "translate("+mouse[0]+",0)")
            self.mousetext.text(self.formatTimeLeg(self.xScale.invert(mouse[0])))
            
            self.itemg.selectAll('circle')
                .attr('stroke', 'transparent')
            self.itemg.filter(function(d){ return d.inicio ==  tim; })
                .selectAll('.start')
                .attr('stroke', self.cfg.color)
            self.itemg.filter(function(d){ return d.fin ==  tim; })
                .selectAll('.end')
                .attr('stroke', self.cfg.color)
                
        })
    }
    
  

    // gridlines in y axis function
    make_y_gridlines() {       
        return d3.axisLeft(this.yScale);
    }
    
    
}
