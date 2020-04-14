import flask 
from flask_sqlalchemy import SQLAlchemy
import requests
from datetime import datetime, timedelta
from pytz import timezone
import pytz

from sql import db, StatusLog

def logStatus():

	lastLogFile = open("lastLog","r")
	lastLogTime = lastLogFile.readline()
	lastLogFile.close()

	logTime = datetime.now(timezone('US/Eastern'))
	logTimeRounded = logTime - timedelta(minutes=(logTime.minute % 5), seconds=logTime.second, microseconds=logTime.microsecond)


	eastern = timezone('US/Eastern')
	originTime = eastern.localize(datetime.strptime("2020-01-01 00:00", "%Y-%m-%d %H:%M"))


	LogDelta=eastern.localize(datetime.strptime(logTimeRounded.strftime("%Y-%m-%d"+" 12:00"), "%Y-%m-%d %H:%M"))-originTime
	logDateI=LogDelta.days
	logTimeI =logTimeRounded.hour*60+logTimeRounded.minute
	
	with open("lastLog", 'w') as newlastLog:
		    newlastLog.write(logTimeRounded.strftime("%Y-%m-%d %H:%M"))


	if lastLogTime[-5:]!=logTimeRounded.strftime("%H:%M"):
		try:
			print("logging station status")

			url = 'https://gbfs.citibikenyc.com/gbfs/es/station_status.json'
			resp = requests.get(url=url)
			feed = resp.json()
			print("got station status")

			for station in feed['data']['stations']:
				log = StatusLog(id = station['station_id'],bikes =station['num_bikes_available'],docks = station['num_docks_available'],dateTime = logTimeRounded.strftime("%Y-%m-%d %H:%M"),dateI =logDateI,timeI=logTimeI)
				db.session.add(log)
			db.session.commit()
		except:
			print("couldn't log status")
			with open("lastLog", 'w') as newlastLog:
			    newlastLog.write(lastLogTime)



if __name__ == "__main__":
	logStatus()