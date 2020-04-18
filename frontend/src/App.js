import React from 'react';
import './App.css';

import Header from "./components/Header"
import LocationCard from "./components/LocationCard"
import StationCard from "./components/StationCard"
import Footer from "./components/Footer"

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      warnings:null,

      selectedLocation:"Washington Square Park",
      locationCoordinates:{
        "Washington Square Park":{latitude :40.7308,longitude:73.9973},
        "Union Square Park":{latitude:40.7359, longitude:73.9911},
        "Times Square":{latitude:40.7580,longitude:73.9911},
        "Bowling Green":{latitude:40.7050, longitude:74.0137},
        "The MET":{latitude:40.7794, longitude:73.9632},
        "Penn Station":{latitude:40.7506,longitude:73.9935}
      },
      latitude :40.7308,
      longitude:73.9973,
      numStations:5,

      time:"",
      date:"",

      weather:"",
      temperature:"",

      stations:[],
      initialBikeCount:{},
      logBikeCount:{},
      status:{},
      log :{},
      logWeek :{},
      
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
    this.getStationLog = this.getStationLog.bind(this);
    this.setStationLog = this.setStationLog.bind(this);
    this.getStationLogWeek = this.getStationLogWeek.bind(this);
    this.setStationLogWeek = this.setStationLogWeek.bind(this);
    this.loadMoreStations = this.loadMoreStations.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);

    
  }

  getStationStatus(){
    fetch(`stationstatus/${this.state.numStations}/${this.state.locationCoordinates[this.state.selectedLocation].latitude},${this.state.locationCoordinates[this.state.selectedLocation].longitude}`).then(res=>res.json()).then(data=>(
      this.setStationStatus(data)
    ))
  }
  setStationStatus(data){

    let stationList = data.stationStatus.map(station=>{return station.id})
    
    if (!this.state.loadTime){
      this.setState({ 
        loadTime:Date.now()
       });

     }

     this.setState({
      updateTime: Date.now(),
      date:data.date,
      time: data.time,
      temperature:data.weatherTemperature,
      weather: data.weatherDescription
      
    })
         

     for (let stationI = 0; stationI < stationList.length; stationI++){
      this.setState(prevState=>({ 
        status:{
          ...prevState.status,
          [stationList[stationI]]:data.stationStatus[stationI]
          
        }
       }));
       console.log(data)
      
       if (stationList[stationI] in this.state.initialBikeCount){
         const prevStationState = this.state.logBikeCount[stationList[stationI]].concat([this.state.status[stationList[stationI]].bikes])
        this.setState(prevState=>({ 
          logBikeCount:{
            ...prevState.logBikeCount,
            [stationList[stationI]]:prevStationState
          }
         }));
       }else{
        this.setState(prevState=>({ 
          showInfo:{
            ...prevState.showInfo,
            [stationList[stationI]]:false
          },
          initialBikeCount:{
            ...prevState.initialBikeCount,
            [stationList[stationI]]:this.state.status[stationList[stationI]].bikes
          },
          logBikeCount:{
            ...prevState.logBikeCount,
            [stationList[stationI]]:[this.state.status[stationList[stationI]].bikes]
          }
         }));
         
       }
       this.getStationLog(stationList[stationI])
       this.getStationLogWeek(stationList[stationI])
       
     }
     this.setState({
      stations:stationList

    })
     
     this.setState({ 
      hasloaded:true
     });
     console.log("updated station status")
  }

  getStationLog(stationID){
    fetch(`stationlog/${stationID}`).then(res=>res.json()).then(data=>(
      this.setStationLog(data,stationID)
    ))
    // console.log("updated station "+stationID+" logs")
  }

  setStationLog(data,stationID){


      this.setState(prevState=>({
        log:{
          ...prevState.log,
          [stationID]:data.stationLog
        }
      }))
    
  }

  getStationLogWeek(stationID){
    fetch(`stationlogweek/${stationID}`).then(res=>res.json()).then(data=>(
      this.setStationLogWeek(data,stationID)
    ))
    // console.log("updated station "+stationID+" logs")
  }

  setStationLogWeek(data,stationID){

      this.setState(prevState=>({
        logWeek:{
          ...prevState.logWeek,
          [stationID]:data.stationLog
        }
      }))
      // console.log(this.state.logWeek[stationID])
    
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

  async handleLocationChange(name){
    await this.setState( {
      selectedLocation:name,
      numStations:5,
      stations:[],
      initialBikeCount:{},
      logBikeCount:{},
      status:{},
      log :{},
      logWeek :{},
      hasloaded:false,
      loadTime: null,
      updateTime :null,
      timeSinceUpdate:null,
      timeSinceLoad:null,
      showInfo:{}
    })
    this.getStationStatus()
  }

  async loadMoreStations(){
    await this.setState(prevState=>({
      numStations: prevState.numStations+5
    }))
    this.getStationStatus()

  }

  componentDidMount() {
    this.getStationStatus()
    setInterval(() => this.setState(prevState=>({ timeSinceUpdate: Date.now()-prevState.updateTime,timeSinceLoad:Date.now()-prevState.loadTime})), 100)
    setInterval(() => this.getStationStatus(), 30000)
      
  }



  render(){

    return (
    
      <div>
        <Header {...this.state}/>
        {!this.state.hasloaded&&<h2 style={{textAlign: "center"}}>Loading...</h2>}
        {this.state.hasloaded&&<div className = "general-info-container" style={{color:"#aaaaaa"}}><h4 style={{float:"left"}}>{this.state.time}, {this.state.date}</h4><h4 style={{float:"right"}}>{this.state.temperature}, {this.state.weather}</h4></div>}        
        <LocationCard {...this.state} handleLocationChange = {this.handleLocationChange} />
        {this.state.stations.map( (id,index )=>(
          <StationCard
          key={id}
          id = {id}
          index = {index}
          {...this.state}

          handleShowChange = {this.handleShowChange}
          />
        ) )}
      
          {this.state.hasloaded && this.state.stations.length<30 && <div><h3 className = "load-more" onClick={()=>this.loadMoreStations() }>Load More Stations</h3><br/></div>}

        {this.state.hasloaded&&<Footer/>}

      </div>
    );
  }
}

export default App;
