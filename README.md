# Neighborhood Map
A project I created for my Udacity Front-End Nanodegree - an interactive map of my hometown Ljubljana, Slovenia, made with React and powered by Mapbox and Foursquare.

## How to Get Started
Download the project to your device:

* as a zip-file, extract it and cd into the project directory.
OR
* by cloning the repository: ```git clone https://github.com/DanielaKuester/Udacity-Project07-MyReadsApp/```

THEN
1. install the project dependencies with `npm install`
2. start the development server with `npm start`
3. the app should open automatically in your browser (if it doesn't, open `localhost:3000` in your browser)

## How the App Works
Once the app is up and running, a map should be displayed along with a sidebar containing a list of Ljubljana's top venues, accoridng to Foursquare. Markers showing the location of each venue are displayed on the map. When you click on a marker, a pop-up appears, containing a short description of the venue and its address. To search for a specific venue, simply type in part of any venue's name and it will filter out all irrelevant locations. Clicking buttons next to each location listing will also make the venue's pop-up appear. Enjoy!

## Dependencies
* The map is provided by [Mapbox-GL-JS API](https://www.mapbox.com/mapbox-gl-js/api)
* The data for the venues was fetched using [Foursquare API](https://developer.foursquare.com/)

## Credits
* [Udacity's study material](https://classroom.udacity.com/nanodegrees/nd001/parts/c3e7b0d6-ffef-4421-b5fc-6df10fd0a1ae) helped me understand React. I used some code from previous projects in this one as well, mostly in the search field functionality
* [Yayha Elharony's YouTube tutorials](https://www.youtube.com/watch?v=ywdxLNjhBYw&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1) helped me set up my project's basic functionalities, like displaying the map, fetching data from Foursquare, displaying markers
* [The Mapbox documentation](https://www.mapbox.com/documentation/) helped me understand how to use Mapbox and implement its features into my app.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

