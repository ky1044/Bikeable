import flask 
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime, timedelta
from pytz import timezone

from sql import db, StatusLog

def queryPastWeek(stationID):

	queryTime = datetime.now(timezone('US/Eastern'))
	queryTimeRounded = queryTime - timedelta(minutes=queryTime.minute % 5, seconds=queryTime.second, microseconds=queryTime.microsecond)

	eastern = timezone('US/Eastern')
	originTime = eastern.localize(datetime.strptime("2020-01-01 00:0", "%Y-%m-%d %H:%M"))

	queryDelta=queryTimeRounded-originTime
	queryDateI=queryDelta.days
	queryTimeI= queryTimeRounded.hour*60+queryTimeRounded.minute


	stationLog = StatusLog.query.filter_by(id=stationID).filter(StatusLog.dateI>=queryDateI-7).all()

	weekLog = []

	for log in stationLog:
		print({"datetime": log.dateTime,"bikes":log.bikes,"docks":log.bikes+log.docks})
		weekLog.append({"datetime": log.dateTime,"bikes":log.bikes,"docks":log.bikes+log.docks})
	return weekLog

if __name__ == "__main__":
	queryPastWeek(336)