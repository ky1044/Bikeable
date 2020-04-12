import flask 
from flask_sqlalchemy import SQLAlchemy
import requests
from datetime import datetime
from pytz import timezone

from sql import db, Info, CurrentStatus

def updateCurrentStatus():
	print("updating station status")

	updateTime = datetime.now(timezone('US/Eastern'))
	

	url = 'https://gbfs.citibikenyc.com/gbfs/es/station_status.json'
	resp = requests.get(url=url)
	feed = resp.json()



	for station in feed['data']['stations']:
		currentStatus = CurrentStatus(id = station['station_id'],bikes =station['num_bikes_available'],docks = station['num_docks_available'],updateTime = updateTime.strftime("%Y-%m-%d %H:%M:%S"))
		CurrentStatus.query.filter_by(id=currentStatus.id).delete()
		db.session.add(currentStatus)
	db.session.commit()

if __name__ == "__main__":
	updateCurrentStatus()