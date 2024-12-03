---
title: "Visualization: European Mobility in 2020"
date: "2021-06-09"
summary: "An interactive custom visualization of European mobility in 2020 using d3.js."
description: "This post shows a custom d3.js calendar visualization that allows us to make a connection between change in daily mobility
and a nation's mobility restrictions in 2020." 
toc: false
readTime: false
autonumber: false
math: false
tags: ["visualization", "d3"]
showTags: false
hideBackToTop: false
---

### The world in 2020
It goes without saying that 2020 has been characteristically marked by the Covid-19 pandemic. One of the primary tools that policymakers across the world have chosen to curb the spread of Covid-19 is to impose restriction on mobility. For those of us in Europe, we can take a calendar view of how our time spent at home, at work, and outdoors has changed as a result of national policies. 

<br><br>

The calendar heatmap shows, for a selected nation and mobility category, the daily percent change in mobility compared to a baseline value (more information in the "Data" section). The linear calendar shows the start and end dates of the selected nation's Covid-19 response measures.

<br><br>

To get some insights, __please make some selections__!
<br><br>
    
{{< rawhtml >}}    
<div class="form-group row"><div class="col-xs-2">

<!-- Select country -->
<select id="calendarCountry">
  <option value="Austria">Austria</option> 
  <option value="Belgium">Belgium</option> 
  <option value="Bulgaria">Bulgaria</option> 
  <option value="Croatia">Croatia</option> 
  <option value="Czechia">Czechia</option> 
  <option value="Denmark">Denmark</option> 
  <option value="Estonia">Estonia</option> 
  <option value="Finland">Finland</option> 
  <option value="France">France</option> 
  <option value="Germany" selected >Germany</option> 
  <option value="Greece">Greece</option> 
  <option value="Hungary">Hungary</option> 
  <option value="Ireland">Ireland</option> 
  <option value="Italy">Italy</option> 
  <option value="Latvia">Latvia</option> 
  <option value="Lithuania">Lithuania</option> 
  <option value="Luxembourg">Luxembourg</option> 
  <option value="Malta">Malta</option> 
  <option value="Netherlands">Netherlands</option> 
  <option value="Norway">Norway</option> 
  <option value="Poland">Poland</option> 
  <option value="Portugal">Portugal</option> 
  <option value="Romania">Romania</option> 
  <option value="Slovakia">Slovakia</option> 
  <option value="Slovenia">Slovenia</option> 
  <option value="Spain">Spain</option> 
  <option value="Sweden">Sweden</option> 
  <option value="Switzerland">Switzerland</option> 
  <option value="United Kingdom">United Kingdom</option> 
  </select>

<!-- Select Indicator -->
<select id="ddlViewBy">
  <option value="retail and recreation">retail and recreation</option>
  <option value="grocery and pharmacy">grocery and pharmacy</option>
  <option value="parks">parks</option>
  <option value="transit stations">transit stations</option>
  <option value="workplaces" >workplaces</option>
  <option value="residential">residential</option>
  <option value="driving" selected >driving</option>
  <option value="walking">walking</option>
</select>
</div></div>
    
<!-- Calendar Heatmap -->
    
<div id="calendar" style="width: 110%; height: 220px; font-size:12px;"></div>

<script src = "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script> <!-- load d3.js from CDN. -->

<script src="/js/d3.calendar.js"></script>

<script src="/calendar-heatmap.js"></script>
    
<!-- Div for Linear Calendar and Key-->
        
<div class="wrapper" style="width: 106%;">

<!-- Line Calendar -->
<div id="exports" class="item1" style="width: 100%; height: 200px;"></div>
<div class="item2"  style="width: 100%; height: 200px;">
  <strong>Key</strong>
  <p style="font-size:10px; font-family: sans-serif; padding:0; margin:0; line-height:1.75;">
    1 - Ban on All Events <br>
    2 - Close Entertainment Venues <br>
    3 - Mask Mandatory in All Spaces <br>
    4 - Close Non-Essential Stores <br>
    5 - Close Resaurants and Cafes <br>
    6 - Limit Social Circle <br>
    7 - Stay at Home Order <br>
    8 - Teleworking <br>
    9 - Workplace Closures <br>
  </p>
</div>
</div>
</div>    
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.25.6/d3-legend.min.js"></script>
<script src="/js/d3.linearcalendar.js"></script>
<script src="/linear-calendar.js"></script>
{{</ rawhtml >}}

### Some Insights

- Finland, Estonia, Sweden and Norway had comparatively few Covid Response Measures compared to Belgium, France, Greece and Italy; yet, all countries have relatively similar residential mobility patterns. Sweden, despite its laissez-faire Covid-19 response, shows a strong decrease in mobility in workplaces and transit stations.
- People walked and drove less during times of Covid restrictions. Time spent in parks increases dramatically in the summer for nearly all countries, likely due to warmer weather.
- In several countries - notably Belgium, Netherlands and Luxembourg, people spent more time at home on weekdays, even when stay-at-home response measures were temporarily lifted.

### The Data

Since the beginning of the Covid-19 pandemic, Google has provided [open-source Mobility Reports](https://www.google.com/covid19/mobility/) to "provide insights into what has changed in response to policies aimed at combating COVID-19." Starting from February 6, 2020, the data show for each day how visits and length of stay at different places change compared to a baseline. 

__The baseline is the median value, for the corresponding day of the week, during the 5-week period Jan 3–Feb 6, 2020.__ 

The data can also be downloaded directly from [Our World in Data](https://raw.githubusercontent.com/ActiveConclusion/COVID19_mobility/master/summary_reports/summary_report_countries.csv).

<br>
Data on Covid-19 response measures comes from the European Center for Disease Control and can be found [here]("https://www.ecdc.europa.eu/en/publications-data/download-data-response-measures-covid-19) along with a Data Dictionary that explains the specifics of non-pharmaceutical response measures. The data is updated frequently - this visualization uses the June 10, 2021 version.	
    
<br><br>
    
### Please Note: Interpreting the Data

Google's Mobility data is relative to a baseline. Therefore, it's not adjusted for seasonal fluctuations that naturally occur (for instance, people spend more time in parks when the weather is warmer, pandemic or not). The Covid-19 response measures included in the linear calendar are only a select few of the response measures taken. Therefore, they do not accurately represent all nations' responses; some nations relied more heavily on partial measures and/or regional measures. 
