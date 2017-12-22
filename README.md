# Visualisation-Flights

### Summary
This visualisation gives you an option to select a year and shows sum of delayed flight by airport for all major airports in US for 2006 to 2016 in an US map and shows you the variation of flight delayed through all months in a year. 

### Design
The dataset contains information on United States flight delays from Bureau of Transportation Statistics (https://www.transtats.bts.gov/OT_Delay/OT_DelayCause1.asp), selecting all carriers, major airports and a period from January 2006 to January 2016. The main object of this visualisation is to analyse delayed flights on each airport to identify which airports have more delay flights each year and evaluate if there is an increase or decrease on number of delayed flights by airport.

The first step was cleaning data got from RITA selecting variables of location and date, such as
State, Airport, Long, Lat, Dat. And variables showing arrivals, delayed, cancelled,	diverted and the reason for delayed
by carrier,	weather, NAS (National Aviation System), security or aircraft delay. And create a new variable to identify the percentage of flight on time. 

After this first exploratory analysis I realise that there were 2 major airports whit highest sum of delay flight for this period, which are William B Hartsfield-Atlanta International and Chicago O'Hare International. I also noticed that in period 2006 to 2011 there was a higher flights delayed than after this period. Taking into account the events of 9/11 I could tell from this data, that one possible reason of this decrease was probably due to measures taken after this event that improve efficiency over flight performance. After 2011

Also, I noticed that during high season the sum of flights delayed increase, which is something that I was expecting before EDA.

The first version of this visualisation includes a U.S map showing the distribution of major airports (selected according to filter option in RITA web page) ploting a circle with a radius proportional to the sum of delayed flights on selected year in each airport. I've chosen a map because I though is a good visualisation tool that could help to identify airports with higher delayed and if there is similar trends on all major airports or there are few of them with highest delayed in this period. 

Also this visualisation shows a bar chart with months in x axis and sum of delayed flights in y axis, in order to evaluate the distribution of delayed flight over year selected. I choose a bar chart because I though it would show the difference between months and show trends and would improve interaction with user would change from one year to another.

I use light gray and blue because there are sober colors that could send a message of reliability and strenght on this visualisation. I use some text in gray to show consistency with map and bar chart.

One of the issues found on this first version was that there are several airports located closer to each other and some bubbles were overlapping. In order to solve this, I used zoom function to have a better look of these cases and sort values of nested data to prevent that bigger bubbles were above smaller ones. 

### Feedback

#### First review
- About the bar chart, I would make more explicit that represents the total of delayed flights by month, perhaps it would be enough adding the word "total" to the title. I would also add the name of the months on the x axis. 
- On the map view, I think I would use the airport's name instead of the acronym for the tooltip. 

#### Second review
Another review I got mentioned that explanatory text describing each image (map and bar chart) should be pointed closer to map and bar chart and no as main paragrah because it's not clear that map shows sum of delayed flight each year and bar chart shows information on monthly basis.

#### Third review
- What do you notice in the visualization? 
That every time you clicked the years the data both from the graphic and the map changed, also on mouse over in the points of the map you can get more information by placing the mouse on top of the points in the map
- What questions do you have about the data? 
I don't know if the Delay is an average of hours delayed or the total
- What relationships do you notice? 
That from 2011 on september and october are low months untill 2014
- What do you think is the main takeaway from this visualization? 
That you can establish a correlation between high seasons (summer vacations) and low seasons (near september after 9/11 attacks), and also the Atlanta and chicago airport have the more flights and the more delays.
- Is there something you don’t understand in the graphic?
Nope

After feedback review I've done few changes on stylesheet and changing text labels and axis and moving text explaining data closer to map and bar chart also changing title and adding mouse pointer and cause of delayed to a tooltip on map to gives you more information to the user to interact with this visualisation.

The last version are shown on index_final.html, vis.js and main.css

### References

https://bl.ocks.org/mbostock/6123708

https://stackoverflow.com/questions/34700903/d3-zoom-not-working-as-in-example

http://bl.ocks.org/biovisualize/1016860

http://bl.ocks.org/d3noob/a22c42db65eb00d4e369

http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5

http://bl.ocks.org/d3noob/8952219



