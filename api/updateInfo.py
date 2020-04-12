import flask 
from flask_sqlalchemy import SQLAlchemy
import requests

app = flask.Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///station.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)


class Info(db.Model):
		id = db.Column(db.Integer, primary_key = True)
		name = db.Column(db.String(50))
		latitude = db.Column(db.Float)
		longitude = db.Column(db.Float)
		capacity =  db.Column(db.Integer)
		MapsURL = db.Column(db.String)
		AppURL = db.Column(db.String)

		def __repr__(self):
			return f"Station:('{self.id}','{self.name}')"

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