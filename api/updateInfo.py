import flask 
from flask_sqlalchemy import SQLAlchemy
import requests

from sql import db, Info, CurrentStatus

def updateInfo():
	print("updating station info")
	url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
	resp = requests.get(url=url)
	feed = resp.json()

	for station in feed['data']['stations']:
		info = Info(id = station['station_id'],name =station['name'],latitude = station['lat'], longitude = station['lon'],capacity = station['capacity'])
		Info.query.filter_by(id=info.id).delete()
		db.session.add(info)
	db.session.commit()