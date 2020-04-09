import React from 'react';
import './App.css';

import Header from "./components/Header"
import StationCard from "./components/StationCard"

class App extends React.Component{
  constructor(){
    super()
    this.state = {
    warnings:null,
    stations :  [],
    latitude :40.7308,
    longitude:73.9973,
    lastUpdate :null,
    timeSinceUpdate:null
    }
    this.getStationStatus = this.getStationStatus.bind(this);
    this.setStationStatus = this.setStationStatus.bind(this);

  }

  getStationStatus(){
    console.log(this.state.latitude)
    fetch(`stationstatus/${this.state.latitude},${this.state.longitude}`).then(res=>res.json()).then(data=>(
      this.setStationStatus(data)
    ))
  }
  setStationStatus(data){
    console.log("updated status")
    this.setState({ 
      stations:data.stationStatus,
      lastUpdate: Date.now()
     });
  }

  componentDidMount() {
    this.getStationStatus()
    setInterval(() => this.setState({ timeSinceUpdate: Date.now()-this.state.lastUpdate}), 100)
    setInterval(() => this.getStationStatus(), 40000)
      
  }

  render(){

    return (
    
      <div>
        <Header/>
        {this.state.stations.map( station=>(
          <StationCard
          key={station.stationName}
          stationInfo = {station}
          lastUpdate = {this.state.timeSinceUpdate}
        />
        ) )}
        {/* <p>{this.state.location}</p> */}
      </div>
    );
  }
}

export default App;
