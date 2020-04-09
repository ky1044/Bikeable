import flask
import sys
from stationStatus import get_nearby_stations,get_station_availability,get_station_status

app = flask.Flask(__name__)
app.config["DEBUG"] = True


# @app.route('/', methods=['GET'])
# @app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
@app.route('/stationstatus/<coords>',methods=['GET'])
def getStationInfo(coords):
		# print(coords)
	print(coords, file=sys.stderr)
	lat,lon=coords.split(",")
	lat = float(lat)
	lon = float(lon)
	status = get_station_status(lat, -lon )
	print(status)
	for i in status:
		i["distance"]=int(i["distance"])
	return {"stationStatus":status }

app.run()