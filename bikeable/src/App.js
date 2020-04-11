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
      latitude :40.7308,
      longitude:73.9973,

      stations :  [],
      initialBikeCount:{},
      logBikeCount:{},
      
      hasloaded:false,

      loadTime: null,
      updateTime :null,
      timeSinceUpdate:null,
      timeSinceLoad:null,
      
      showInfo:{}
    }
    this.getStationStatus = this.getStationStatus.bind(this);
    this.setStationStatus = this.setStationStatus.bind(this);
    this.handleShowChange = this.handleShowChange.bind(this);

  }

  getStationStatus(){
    fetch(`stationstatus/${this.state.latitude},${this.state.longitude}`).then(res=>res.json()).then(data=>(
      this.setStationStatus(data)
    ))
  }
  setStationStatus(data){
    
    this.setState({ 
      stations:data.stationStatus,
      updateTime: Date.now()
     });
     if (!this.state.loadTime){
      this.setState({ 
        loadTime:Date.now()
       });

     }

     for (let stationI = 0; stationI < this.state.stations.length; stationI++){
       if (this.state.stations[stationI].id in this.state.initialBikeCount){
         const prevStationState = this.state.logBikeCount[this.state.stations[stationI].id].concat([this.state.stations[stationI].bikes])
        this.setState(prevState=>({ 
          logBikeCount:{
            ...prevState.logBikeCount,
            [this.state.stations[stationI].id]:prevStationState
          }
         }));
       }else{
        this.setState(prevState=>({ 
          showInfo:{
            ...prevState.showInfo,
            [this.state.stations[stationI].id]:false
          },
          initialBikeCount:{
            ...prevState.initialBikeCount,
            [this.state.stations[stationI].id]:this.state.stations[stationI].bikes
          },
          logBikeCount:{
            ...prevState.logBikeCount,
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

  handleShowChange(id){
    this.setState( prevState =>{
      const newShow = !prevState.showInfo[id]
      return { 
      showInfo:{
        ...prevState.showInfo,
        [id]:newShow
      }
     }})
  }

  componentDidMount() {
    this.getStationStatus()
    setInterval(() => this.setState(prevState=>({ timeSinceUpdate: Date.now()-prevState.updateTime,timeSinceLoad:Date.now()-prevState.loadTime})), 100)
    setInterval(() => this.getStationStatus(), 30000)
      
  }



  render(){

    return (
    
      <div>
        <Header/>
        {!this.state.hasloaded&&<h2 style={{textAlign: "center"}}>Loading...</h2>}

        {this.state.stations.map( station=>(
          <StationCard
          key={station.id}
          stationInfo = {station}
          logBikeCount = {this.state.logBikeCount[station.id]}
          timeSinceUpdate = {this.state.timeSinceUpdate}
          timeSinceLoad = {this.state.timeSinceLoad}
          loaded = {this.state.hasloaded}

          showInfo = {this.state.showInfo[station.id]}
          handleShowChange = {this.handleShowChange}

        />
        ) )}

        {this.state.hasloaded&&<Footer/>}
        
      </div>
    );
  }
}

export default App;
