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

class StatusLog(db.Model):
		logId = db.Column(db.Integer,primary_key = True)
		id = db.Column(db.Integer)
		bikes = db.Column(db.Integer)
		docks = db.Column(db.Integer)
		dateTime = db.Column(db.String)
		dateI=db.Column(db.Integer)
		timeI=db.Column(db.Integer)

		def __repr__(self):
			return f"Log('ID: {self.id}','Bikes: {self.bikes}',Docks: '{self.docks}','Logged:{self.dateTime}','dateI:{self.dateI}','timeI:{self.timeI}','logID:{self.logId}')\n"