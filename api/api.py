import flask
import sys

app = flask.Flask(__name__)
app.config["DEBUG"] = True


# @app.route('/', methods=['GET'])
# @app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
@app.route('/stationstatus/<coords>',methods=['GET'])
def getStationInfo(coords):
		# print(coords)
	print(coords, file=sys.stderr)
	stationStatus = [
	{
        "id":1,
        "stationName" :"LaGuardia Pl & W 3 St",
        "bikes" : 19,
        "docks" : 35,
        "distance" : "137 meters",
        "lastUpdate" : "just now",
      },
      {
        "stationName" :"Washington Pl & Broadway",
        "bikes" : 13,
        "docks" : 26,
        "distance" : "205 meters",
        "lastUpdate" : "just now",
      },
      {
        "stationName" :"Mercer St & Bleecker St",
        "bikes" : 32,
        "docks" : 43,
        "distance" : "236 meters",
        "lastUpdate" : "just now",
      }
	]
	return {"stationStatus":stationStatus }

app.run()