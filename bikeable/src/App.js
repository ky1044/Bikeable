import React from 'react';
import './App.css';

import Header from "./components/Header"
import StationCard from "./components/StationCard"
import Footer from "./components/Footer"

class App extends React.Component{
  constructor(){
    super()
    this.state = {
    warnings:null,
    stations :  [],
    localhistory:{},
    latitude :40.7308,
    longitude:73.9973,
    lastUpdate :null,
    timeSinceUpdate:null,
    hasloaded:false
    }
    this.getStationStatus = this.getStationStatus.bind(this);
    this.setStationStatus = this.setStationStatus.bind(this);

  }

  getStationStatus(){
    fetch(`stationstatus/${this.state.latitude},${this.state.longitude}`).then(res=>res.json()).then(data=>(
      this.setStationStatus(data)
    ))
  }
  setStationStatus(data){
    
    this.setState({ 
      stations:data.stationStatus,
      lastUpdate: Date.now()
     });
     for (let stationI = 0; stationI < this.state.stations.length; stationI++){
       if (this.state.stations[stationI].id in this.state.localhistory){
         const prevStationState = this.state.localhistory[this.state.stations[stationI].id].concat([this.state.stations[stationI].bikes])
        this.setState(prevState=>({ 
          localhistory:{
            ...prevState.localhistory,
            [this.state.stations[stationI].id]:prevStationState
          }
         }));
       }else{
        this.setState(prevState=>({ 
          localhistory:{
            ...prevState.localhistory,
            [this.state.stations[stationI].id]:[this.state.stations[stationI].bikes]
          }
         }));
       }
     }
     this.setState({ 
      hasloaded:true
     });
     console.log("updated station status")
  }

  componentDidMount() {
    this.getStationStatus()
    setInterval(() => this.setState({ timeSinceUpdate: Date.now()-this.state.lastUpdate}), 100)
    setInterval(() => this.getStationStatus(), 5000)
      
  }

  render(){

    return (
    
      <div>
        <Header/>
        {this.state.stations.map( station=>(
          <StationCard
          key={station.id}
          stationInfo = {station}
          localhistory = {this.state.localhistory[station.id]}
          lastUpdate = {this.state.timeSinceUpdate}
          loaded = {this.state.hasloaded}
        />
        ) )}
        <Footer loaded = {this.state.hasloaded}/>
      </div>
    );
  }
}

export default App;
