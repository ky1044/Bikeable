import flask
import sys

import time
import requests

from datetime import datetime
from pytz import timezone

from flask_sqlalchemy import SQLAlchemy

from apscheduler.schedulers.background import BackgroundScheduler
from updateInfo import updateInfo, Info
from updateCurrentStatus import updateCurrentStatus,CurrentStatus
from logStatus import logStatus

from getCurrentStatus import get_station_status
from queryStationLog import queryPastDay, queryPastWeek


app = flask.Flask(__name__)
app.config["DEBUG"] = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///station.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)

@app.route('/stationstatus/<count>/<coords>',methods=['GET'])
def getStationInfo(count,coords):
	lat,lon=coords.split(",")
	lat = float(lat)
	lon = float(lon)
	count = int(count)
	status = get_station_status(lat, -lon,count )
	for i in status:
		i["distance"]=int(i["distance"])
	weather = open("currentWeather","r").readline().split(",")
	return {
		"stationStatus":status ,
		"date":datetime.now(timezone('US/Eastern')).strftime("%A, %B %d"),
		"time": datetime.now(timezone('US/Eastern')).strftime("%I:%M %p"),
		"weatherTemperature":weather[0]+"°C",
		"weatherDescription":weather[1]


	}

@app.route('/stationlog/<stationId>',methods=['GET'])
def getStationLog(stationId):
	return {"stationLog":queryPastDay(stationId)}

@app.route('/stationlogweek/<stationId>',methods=['GET'])
def getStationLogWeek(stationId):
	return {"stationLog":queryPastWeek(stationId)}



if __name__ == "__main__":
	scheduler = BackgroundScheduler(daemon=True)
	scheduler.add_job(func=updateInfo, trigger="interval", minutes=60)
	scheduler.add_job(func=updateCurrentStatus, trigger="interval", seconds=10)
	scheduler.add_job(func=logStatus, trigger="interval", seconds=10)
	scheduler.start()
	
	app.run(use_reloader=False)

	