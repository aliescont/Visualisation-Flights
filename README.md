# Visualisation-Flights

### Summary
This visualisation gives you an option to select a year and shows sum of delayed flight by airport for all major airports in US for 2006 to 2016 in an US map and shows you the variation of flight delayed through all months in a year. 

### Design
The dataset contains information on United States flight delays from RITA for the last 10 years, selecting major airports of US. The main object of this visualisation is to analyse which airports have more flight with delay in the last 10 years and if there is an important reduction or increase of number of flight delayed in the last 10 years. 

The first step was cleaning data got from RITA and select variables of location and date, such as
State, Airport, Long, Lat, Dat. And variables showing arrivals, delayed, cancelled,	diverted and the reason for delayed
carrier_del	weather_del	nas_del	security_dellate_aircraft_del	on_time

I noticed on EDA done using R that there were a decrease on flight delayed on from 2006 to 2009 and then it remains with a similar patron. Also, I noticed that there was a seasonality on flight delayed; there is more frequency of delayed flight on high seasons and want to show also what are the airports which with more frequency have more delay flights.

The first version of this visualisation includes a U.S map showing the distribution of major airports with bubble size proportional to the amount of delayed flights on each airport and a bar chart showing the distribution of delayed flights each month of selected year. 

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

### References

https://bl.ocks.org/mbostock/6123708

https://stackoverflow.com/questions/34700903/d3-zoom-not-working-as-in-example

http://bl.ocks.org/biovisualize/1016860

http://bl.ocks.org/d3noob/a22c42db65eb00d4e369

http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5

http://bl.ocks.org/d3noob/8952219



