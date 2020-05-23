# [Bikeable](https://ky1044.github.io/Bikeable/)
website to find the current and past status of the nearest Citibike stations.

## Project Status
This project is currently in development. Users can see the real time status and of the nearest Citibike stations as well as logs for the past week. Functionality to predict future status is in progress

## Live Demo
Link: [https://ky1044.github.io/Bikeable/](https://ky1044.github.io/Bikeable/)

React frontend is hosted on Github Pages, Flask API and backend is hosted on AWS (Elastic Beanstalk).
### Issues
- Critical issue with APScheduler on Elastic Beanstalk, which is used to schedule bike count updates and logging statuses. Live demo is currently broken, and cron is being considered as an alternative. 

## Project Screen Shot

Desktop<br/>

<img src="https://github.com/ky1044/Bikeable/blob/master/media/Screenshot-2020:05:20-1.png" width="1000px">

Mobile<br/>
<img align="center" src="https://github.com/ky1044/Bikeable/blob/master/media/Screenshot-2020:04:26-2.png" width="300px">

## Installation and Setup Instructions


- You will need `npm` and `python 3` installed globally on your machine.  
- Clone this repo to your local machine using `https://github.com/y1044/Bikeable`

#### Running React

- Go to '/front-end' folder on command line
- start with `npm start`  
- terminate by holding `ctrl` + `c`

#### Running the API 

- Go to '/api' folder on command line
- activate virtual environment with `source venv/bin/activate` 
- start with `python3 application.py`  
- terminate by holding `ctrl` + `c`

#### Using the Website 

- on your browser, visit `localhost:3000` 

## Tools Used
The front end is built using HTML/CSS and Javascript, using the React framework. Libraries used for this project include [Recharts](https://recharts.org/en-US), [React Leaflet](https://react-leaflet.js.org/), and [React Autosuggest](https://react-autosuggest.js.org/). 

The back end API is built with Flask, and currently gives users real time and past week info for nearby station statuses, which it stores in a local SQLite database using SQLAlchemy. 

Citibike status is collected using their [GBFS API](http://gbfs.citibikenyc.com/gbfs/gbfs.json), and weather data is collected using the [Darksky API](https://darksky.net/dev)
