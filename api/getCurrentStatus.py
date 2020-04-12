from geopy import distance
import geocoder

import flask 
from flask_sqlalchemy import SQLAlchemy

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
			return f"Station:(ID:'{self.id}',Name:'{self.name}',Lat:'{self.latitude}',Lon:'{self.longitude}')\n"

class CurrentStatus(db.Model):
		id = db.Column(db.Integer, primary_key = True)
		bikes = db.Column(db.Integer)
		docks = db.Column(db.Integer)
		updateTime = db.Column(db.String)

		def __repr__(self):
			return f"Station('ID: {self.id}','Bikes: {self.bikes}',Docks: '{self.docks}','Updated:{self.updateTime}')"



def get_nearby_stations(lat,lon,radius,max_length):
	user_coord = (lat,lon)

	stations=Info.query.all()

	nearby_stations = []

	for station in stations:
		station_coord = (station.latitude,station.longitude)
		station_distance = distance.distance(user_coord, station_coord).m
		if station_distance<radius:
			place = len(nearby_stations)
			for s in range(len(nearby_stations)):
				if nearby_stations[s]["distance"]>station_distance:
					place=s
					break
			nearby_stations.insert(place,{"id": station.id,"name":station.name,"distance":station_distance,"mapsURL":""})
	return nearby_stations[:max_length]



def get_station_availability(station_list):

	for station in station_list:
		station["bikes"]=0
		station["docks"]=0

	for station in station_list:

		thisStation = CurrentStatus.query.filter_by(id=station["id"]).first()
		station["bikes"] = thisStation.bikes
		station["docks"] = thisStation.bikes+thisStation.docks
		#ISSUE: "bikes" and "docks" add up to number of docks, but valet stations don't always have all docks available to use so "docks" may be  overestimated.			
	return station_list

def get_station_status(user_latitude, user_longitude):
	nearby_station_list = get_nearby_stations(user_latitude, user_longitude,1000,5)
	nearby_station_status = get_station_availability(nearby_station_list)
	return nearby_station_status


if __name__ == "__main__":
	print(get_station_status(40.7308,-73.9973))
