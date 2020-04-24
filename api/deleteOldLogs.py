import flask 
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime, timedelta
from pytz import timezone

from sql import db, StatusLog

def deleteOldLogs():

	queryTime = datetime.now(timezone('US/Eastern'))
	queryTimeRounded = queryTime - timedelta(minutes=queryTime.minute % 5, seconds=queryTime.second, microseconds=queryTime.microsecond)

	eastern = timezone('US/Eastern')
	originTime = eastern.localize(datetime.strptime("2020-01-01 00:0", "%Y-%m-%d %H:%M"))

	queryDelta=eastern.localize(datetime.strptime(queryTimeRounded.strftime("%Y-%m-%d"+" 12:00"), "%Y-%m-%d %H:%M"))-originTime
	queryDateI=queryDelta.days

	db.session.query(StatusLog).filter(StatusLog.dateI<queryDateI-7).delete(synchronize_session='evaluate')
	db.session.commit()



if __name__ == "__main__":
	deleteOldLogs()