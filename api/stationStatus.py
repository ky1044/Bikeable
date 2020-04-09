import requests
import json
from geopy import distance
import geocoder


def get_user_location():
	g = geocoder.ip('me')
	return g.latlng


def get_nearby_stations(lat,lon,radius,max_length):
	url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
	resp = requests.get(url=url)
	feed = resp.json()

	user_coord = (lat,lon)

	station_list=[]

	for station in feed['data']['stations']:
		station_coord = (station['lat'],station['lon'])
		station_distance = distance.distance(user_coord, station_coord).m
		# print(station_distance)
		if station_distance<radius:
			place = len(station_list)
			for s in range(len(station_list)):
				if station_list[s]["distance"]>station_distance:
					place=s
					break
			MapsURL = "https://www.google.com/maps/search/?api=1&query=Citi+Bike+"+station['name'].replace(" ","+").replace("&","%26")
			station_list.insert(place,{"id": station['station_id'],"name":station['name'],"distance":station_distance,"mapsURL":MapsURL})
		# print(station_list)
	return station_list[:max_length]


def get_station_availability(station_list):
	url = 'https://gbfs.citibikenyc.com/gbfs/es/station_status.json'
	resp = requests.get(url=url)
	feed = resp.json()

	for station in station_list:
		station["bikes"]=0
		station["docks"]=0

	for station in feed['data']['stations']:
		#ISSUE: "bikes" and "docks" add up to number of docks, but valet stations don't always have all docks available to use so "docks" may be  overestimated.
		try:
			station_index = [i["id"] for i in station_list].index(station["station_id"])
			station_list[station_index]["bikes"]=station["num_bikes_available"]
			station_list[station_index]["docks"]=station["num_docks_available"]+station["num_bikes_available"]
		except:
			pass
			
	return station_list


def get_station_status(user_latitude, user_longitude):
	# user_latitude, user_longitude = get_user_location()
	nearby_station_list = get_nearby_stations(user_latitude, user_longitude,1000,5)
	nearby_station_status = get_station_availability(nearby_station_list)
	return nearby_station_status


if __name__ == "__main__":
	get_station_status(40.729188, -73.996473)