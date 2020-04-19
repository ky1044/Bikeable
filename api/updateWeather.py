import requests

def updateWeather():
	url = 'https://api.darksky.net/forecast/c0bf1a3d3f7744d6310629119c80ca4c/40.7580,-73.9855'
	resp = requests.get(url=url)
	feed = resp.json()
	print(str(feed)[:500])
	print(feed["currently"]["summary"])

	temperature = int((feed["currently"]["temperature"]-32)*(5/9))
	weather = feed["currently"]["summary"]

	with open("currentWeather", 'w') as newWeather:
		newWeather.write(str(temperature)+","+weather)


if __name__ == "__main__":
	updateWeather()
