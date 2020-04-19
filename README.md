# Bikeable
website to find the current and past status of the nearest Citibike stations.

## Project Status
This project is currently in development. Users can see the real time status of the nearest Citibike stations. Functionality to predict future status is in progress

## Project Screen Shot

![alt text](https://github.com/ky1044/Bikeable/blob/master/media/Screenshot-2020:04:19.png "Bikeable progress - April 19th 2020")


## Installation and Setup Instructions


- You will need `npm` and `python 3` installed globally on your machine.  
- Clone this repo to your local machine using `https://github.com/y1044/Bikeable`

#### Running React

- Go to '/front-end' folder on command line
- start with `npm start`  

#### Running the API 

- Go to '/api' folder on command line
- activate virtual environment with `source venv/bin/activate` 
- start with `python3 api.py`  

#### Using the Website 

- on your browser, go to `localhost:3000`  

## Tools Used
The front end is built using HTML/CSS and Javascript, using the React framework. Currently the only add-on library being used is the [Recharts](https://recharts.org/en-US) library for React. 

The back end API is built with Flask, and currently gives users real time and past week info for nearby station statuses, which it stores in a local SQLite database using SQLAlchemy. 

Citibike status is collected using their [GBFS API](http://gbfs.citibikenyc.com/gbfs/gbfs.json), and weather data is collected using the [Darksky API](https://darksky.net/dev)
