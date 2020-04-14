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
		# print({"datetime": log.dateTime,"bikes":log.bikes,"docks":log.bikes+log.docks})
		print(log)
		weekLog.append({"datetime": log.dateTime,"bikes":log.bikes,"docks":log.bikes+log.docks})
	return weekLog

def queryPastDay(stationID):

	queryTime = datetime.now(timezone('US/Eastern'))
	queryTimeRounded = queryTime - timedelta(minutes=queryTime.minute % 5, seconds=queryTime.second, microseconds=queryTime.microsecond)

	eastern = timezone('US/Eastern')
	originTime = eastern.localize(datetime.strptime("2020-01-01 00:0", "%Y-%m-%d %H:%M"))

	queryDelta=queryTimeRounded-originTime
	queryDateI=queryDelta.days
	queryTimeI= queryTimeRounded.hour*60+queryTimeRounded.minute


	# stationLog = StatusLog.query.filter_by(id=stationID).filter(StatusLog.dateI>=queryDateI-7).all()

	DayLog = []

	TimeIList = [queryTimeI]
	for i in range(288):
		TimeIList.append((TimeIList[-1]+5)%1440)

	timeIter = 0
	logDateI = queryDateI-1


	#original for loop, much slower since query was done by each time interval instead of all at onces
	# for logTimeI in TimeIList:
	# 	if logTimeI==0:
	# 		logDateI+=1
	
	# 	log = StatusLog.query.filter_by(id=stationID, dateI = logDateI, timeI = logTimeI).first()
	# 	if (log is None):
	# 		DayLog.append({"datetime": (datetime.strptime("2020-01-01 00:0", "%Y-%m-%d %H:%M")+timedelta(days=logDateI,minutes=logTimeI)).strftime("%Y-%m-%d %H:%M"),"bikes":DayLog[-1]["bikes"],"docks":DayLog[-1]["docks"]})
	# 	else:
	# 		DayLog.append({"datetime": log.dateTime,"bikes":log.bikes,"docks":log.bikes+log.docks})

	stationLog = StatusLog.query.filter_by(id=stationID).filter(StatusLog.dateI>=queryDateI-7).all()
	for log in stationLog:
		while log.timeI>TimeIList[timeIter]:
			DayLog.append({"datetime": (datetime.strptime("2020-01-01 00:0", "%Y-%m-%d %H:%M")+timedelta(days=logDateI,minutes=TimeIList[timeIter])).strftime("%Y-%m-%d %H:%M"),"bikes":DayLog[-1]["bikes"],"docks":DayLog[-1]["docks"]})
			timeIter+=1
			if timeIter>=len(TimeIList):
				break
			if TimeIList[timeIter]==0:
				logDateI+=1

		if log.timeI==TimeIList[timeIter]:
			DayLog.append({"datetime": log.dateTime,"bikes":log.bikes,"docks":log.bikes+log.docks})
			timeIter+=1
			if timeIter>=len(TimeIList):
				break
			if TimeIList[timeIter]==0:
				logDateI+=1


	return DayLog

if __name__ == "__main__":
	for i in queryPastDay(336):
		print(i)