import flask 
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime, timedelta
from pytz import timezone

from sql import db, StatusLog



def queryPastDay(stationID):

	queryTime = datetime.now(timezone('US/Eastern'))
	queryTimeRounded = queryTime - timedelta(minutes=queryTime.minute % 5, seconds=queryTime.second, microseconds=queryTime.microsecond)

	eastern = timezone('US/Eastern')
	originTime = eastern.localize(datetime.strptime("2020-01-01 00:00", "%Y-%m-%d %H:%M"))

	
	queryDelta=eastern.localize(datetime.strptime(queryTimeRounded.strftime("%Y-%m-%d"+" 12:00"), "%Y-%m-%d %H:%M"))-originTime
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
			DayLog.append({"datetime": (datetime.strptime("2020-01-01 00:00", "%Y-%m-%d %H:%M")+timedelta(days=logDateI,minutes=TimeIList[timeIter])).strftime("%Y-%m-%d %H:%M"),"bikes":DayLog[-1]["bikes"],"docks":DayLog[-1]["docks"]})
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

def queryPastWeek(stationID):
	interval = 30
	frequency = int(1440/interval)
	gapAllowed = int(60/interval)

	queryTime = datetime.now(timezone('US/Eastern'))
	queryTimeRounded = queryTime - timedelta(minutes=queryTime.minute % 5, seconds=queryTime.second, microseconds=queryTime.microsecond)

	eastern = timezone('US/Eastern')
	originTime = eastern.localize(datetime.strptime("2020-01-01 00:0", "%Y-%m-%d %H:%M"))

	queryDelta=eastern.localize(datetime.strptime(queryTimeRounded.strftime("%Y-%m-%d"+" 12:00"), "%Y-%m-%d %H:%M"))-originTime
	queryDateI=queryDelta.days
	queryTimeI= queryTimeRounded.hour*60+queryTimeRounded.minute


	
	
	times = []
	timeZero = datetime.strptime("00:00", "%H:%M")
	for hourI in range(24):
		for minI in range(0,60,interval):
			times.append((timeZero+timedelta(hours=hourI, minutes=minI)).strftime("%H:%M"))

	Days = ["Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday"]
	#0:Wednesday
	#1:Thursday
	#2:Friday
	#3:Saturday
	#4:Sunday
	#5:Monday
	#6:Tuesday

	weekLog = {
		"times":times,
		"Today":Days[queryDateI%7],
		"bikesToday":[],
		"bikesMonday":[],
		"bikesTuesday":[],
		"bikesWednesday":[],
		"bikesThursday":[],
		"bikesFriday":[],	
		"bikesSaturday":[],	
		"bikesSunday":[]
	}
	
	TimeIList = [0]
	for i in range(frequency):
		TimeIList.append((TimeIList[-1]+interval))


	#fill in data for past week, not today
	for dayofWeek in range(queryDateI-7,queryDateI):
		timeIter = 0
		stationLog = StatusLog.query.filter_by(id=stationID,dateI=dayofWeek).all()

		for log in stationLog:
			while log.timeI>TimeIList[timeIter]:
				weekLog["bikes"+Days[dayofWeek%7]].append(-1)
				timeIter+=1
				if timeIter>=len(TimeIList):
					break

				

			if log.timeI==TimeIList[timeIter]:
				weekLog["bikes"+Days[dayofWeek%7]].append(log.bikes)
				timeIter+=1
				if timeIter>=len(TimeIList):
					break
		while timeIter<len(TimeIList):
			weekLog["bikes"+Days[dayofWeek%7]].append(-1)
			timeIter+=1
			if timeIter>=len(TimeIList):
				break

		thisGap = 0
		for obs in range(len(weekLog["bikes"+Days[dayofWeek%7]])):
			if weekLog["bikes"+Days[dayofWeek%7]][obs]==-1:
				thisGap+=1
			else:
				if thisGap<=gapAllowed:
					for i in range(thisGap):
						weekLog["bikes"+Days[dayofWeek%7]][obs-i-1]=weekLog["bikes"+Days[dayofWeek%7]][thisGap]
				thisGap=0


	#fill in data for today
	timeIter = 0

	stationLog = StatusLog.query.filter_by(id=stationID,dateI=queryDateI).all()

	for log in stationLog:
		while log.timeI>TimeIList[timeIter]:
			weekLog["bikesToday"].append(-1)
			timeIter+=1
			if timeIter>=len(TimeIList):
				break

		if log.timeI==TimeIList[timeIter]:
			weekLog["bikesToday"].append(log.bikes)
			timeIter+=1
			if timeIter>=len(TimeIList):
				break
	while timeIter<len(TimeIList):
		weekLog["bikesToday"].append(-1)
		timeIter+=1
		if timeIter>=len(TimeIList):
			break

	thisGap = 0
	for obs in range(len(weekLog["bikesToday"])):
		if weekLog["bikesToday"][obs]==-1:
			thisGap+=1
		else:
			if thisGap<=gapAllowed:
				for i in range(thisGap):
					weekLog["bikesToday"][obs-i-1]=weekLog["bikesToday"][thisGap]
			thisGap=0



	return weekLog


if __name__ == "__main__":
	# for i in queryPastDay(336):
	# 	print(i)
	dic = queryPastWeek(336)
	for i in dic:
		# pass
		print(i,dic[i])