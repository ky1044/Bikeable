import flask 
from flask_sqlalchemy import SQLAlchemy
import requests
from datetime import datetime
from pytz import timezone

app = flask.Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///station.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)


class CurrentStatus(db.Model):
		id = db.Column(db.Integer, primary_key = True)
		bikes = db.Column(db.Integer)
		docks = db.Column(db.Integer)
		updateTime = db.Column(db.String)


		def __repr__(self):
			return f"Station('ID: {self.id}','Bikes: {self.bikes}',Docks: '{self.docks}','Updated:{self.updateTime}')"

def updateCurrentStatus():
	print("updating station status")

	updateTime = datetime.now(timezone('US/Eastern'))
	

	url = 'https://gbfs.citibikenyc.com/gbfs/es/station_status.json'
	resp = requests.get(url=url)
	feed = resp.json()

	print(updateTime.strftime("%Y-%m-%d %H:%M:%S"))

	for station in feed['data']['stations']:
		currentStatus = CurrentStatus(id = station['station_id'],bikes =station['num_bikes_available'],docks = station['num_docks_available'],updateTime = updateTime.strftime("%Y-%m-%d %H:%M:%S"))
		CurrentStatus.query.filter_by(id=currentStatus.id).delete()
		db.session.add(currentStatus)
	db.session.commit()
	print(CurrentStatus.query.filter_by(bikes=2).all())

if __name__ == "__main__":
	updateCurrentStatus()