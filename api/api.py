import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True


# @app.route('/', methods=['GET'])
@app.route('/getStationInfo')
def getStationInfo():
    return {
    	"stationName":"LaGuardia Pl & W 3 St",
    	"bikes":16,
    	"docks":36
    }

app.run()