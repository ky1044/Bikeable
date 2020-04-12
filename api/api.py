import flask
import sys
from stationStatus import get_nearby_stations,get_station_availability,get_station_status
import time
import requests

from flask_sqlalchemy import SQLAlchemy

from apscheduler.schedulers.background import BackgroundScheduler
from updateInfo import updateInfo, Info
from updateCurrentStatus import updateCurrentStatus,CurrentStatus

app = flask.Flask(__name__)
app.config["DEBUG"] = True


#SQL
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///station.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

# db = SQLAlchemy(app)


scheduler = BackgroundScheduler(daemon=True)
scheduler.add_job(func=updateInfo, trigger="interval", minutes=60)
scheduler.add_job(func=updateCurrentStatus, trigger="interval", seconds=10)
scheduler.start()



@app.route('/stationstatus/<coords>',methods=['GET'])
def getStationInfo(coords):
		# print(coords)
	print(coords, file=sys.stderr)
	lat,lon=coords.split(",")
	lat = float(lat)
	lon = float(lon)
	status = get_station_status(lat, -lon )
	# print(status)
	for i in status:
		i["distance"]=int(i["distance"])
	return {"stationStatus":status }




if __name__ == "__main__":
	
	app.run(use_reloader=False)