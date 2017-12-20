# Visualisation-Flights

### Summary
This visualisation shows the localisation of major airports in USA and flights delayed by airport each year from 2006 to 2016. Also, shows the variation of flight delayed through all months in a year. 

### Design
The dataset contains information on United States flight delays from RITA for the last 10 years, selecting major airports of US. The main object of this visualisation is to analyse which airports have more flight with delay in the last 10 years. 

The first step was cleaning data from data got from RITA and select variables of location and date, such as
State, Airport, Long, Lat, Dat. And variables showing arrivals, delayed, cancelled,	diverted and the reason for delayed
carrier_del	weather_del	nas_del	security_dellate_aircraft_del	on_time

The first version of this visualisation includes a U.S map showing the distribution of major airports with bubble size proportional to the amount of delayed flights on each airport. One of the issues found on this version was that there are several airports located closer to each other and some bubbles were overlapping to each other. In order to solve this, I used zoom function to have a better look of these cases and sort values of nested data to prevent that bigger bubbles were above small ones. 

### Feedback

- About the bar chart, I would make more explicit that represents the total of delayed flights by month, perhaps it would be enough adding the word "total" to the title. I would also add the name of the months on the x axis. 
- On the map view, I think I would use the airport's name instead of the acronym for the tooltip. 



Feedback review:

Steps to be able to see this visualisation project
- Add data_v2.tsv, us_new.json and index.html to your local file
- Open terminal and start local server: python -m SimpleHTTPServer 8000
- Select year buttons on index.html

What do you notice in the visualization?
What questions do you have about the data?
What relationships do you notice?
What do you think is the main takeaway from this visualization?
Is there something you don’t understand in the graphic?

References

https://bl.ocks.org/mbostock/6123708

https://stackoverflow.com/questions/34700903/d3-zoom-not-working-as-in-example

http://bl.ocks.org/biovisualize/1016860

http://bl.ocks.org/d3noob/a22c42db65eb00d4e369

http://bl.ocks.org/d3noob/b3ff6ae1c120eea654b5

http://bl.ocks.org/d3noob/8952219



