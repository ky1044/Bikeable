import React from 'react';
import './App.css';

import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import Stations from "./components/Stations"
import Footer from "./components/Footer"


import Desktop from "./components/Desktop"

var API_URL = "https://citibikeable.com/"
// API_URL  = ""

class App extends React.Component{
  constructor(){
    super()
    this.state = {

      selectedLocation:"Union Square Park",
      selectedLocationLatitude:40.7359,
      selectedLocationLongitude:-73.9911,
      locationCoordinates:{
        "Washington Square Park":{latitude :40.7308,longitude:-73.9973},
        "Union Square Park":{latitude:40.7359, longitude:-73.9911},
        "Times Square":{latitude:40.7580,longitude:-73.9911},
        "Bowling Green":{latitude:40.7050, longitude:-74.0137},
        "The MET":{latitude:40.7794, longitude:-73.9632},
        "Penn Station":{latitude:40.7506,longitude:-73.9935},
      },
      numStations:10,

      time:"",
      date:"",
      weather:"",
      temperature:"",

      stations:[],
      initialBikeCount:{},
      status:{},
      showInfo:{},
      dayLog :{},
      weekLog :{},
      
      hasLoaded:false,

      showMap:false,
      mapStation:null,
      
      loadTime: null,
      updateTime :null,
      mapClickTime:null,
      timeSinceUpdate:null,
      timeSinceLoad:null,
      timeSinceMapClick:null,

      windowHeight:0,
      windowWidth:0,
      view:null

      
    }
    this.getStationStatus = this.getStationStatus.bind(this);
    this.setStationStatus = this.setStationStatus.bind(this);

    this.getStationDayLog = this.getStationDayLog.bind(this);
    this.setStationDayLog = this.setStationDayLog.bind(this);

    this.getStationWeekLog = this.getStationWeekLog.bind(this);
    this.setStationWeekLog = this.setStationWeekLog.bind(this);

    this.handleMapLocationChange = this.handleMapLocationChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleMapToggle = this.handleMapToggle.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleShowChange = this.handleShowChange.bind(this);
    this.loadMoreStations = this.loadMoreStations.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  getStationStatus(){
    fetch(`${API_URL}stationstatus/${this.state.numStations}/${this.state.selectedLocationLatitude},${this.state.selectedLocationLongitude}`).then(res=>res.json()).then(data=>(
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
      
       if (!(stationList[stationI] in this.state.initialBikeCount)){
        this.setState(prevState=>({ 
          showInfo:{
            ...prevState.showInfo,
            [stationList[stationI]]:false
          },
          initialBikeCount:{
            ...prevState.initialBikeCount,
            [stationList[stationI]]:this.state.status[stationList[stationI]].bikes
          },

          }));
      }
      //  this.getStationDayLog(stationList[stationI])
      //  this.getStationWeekLog(stationList[stationI])       
     }
     this.setState({
      stations:stationList

    })
     
     this.setState({ 
      hasLoaded:true
     });
     console.log("updated station status")
  }

  getStationDayLog(stationID){
    fetch(`${API_URL}stationlog/${stationID}`).then(res=>res.json()).then(data=>(
      this.setStationDayLog(data,stationID)
    ))
    // console.log("updated station "+stationID+" logs")
  }

  setStationDayLog(data,stationID){

      this.setState(prevState=>({
        dayLog:{
          ...prevState.dayLog,
          [stationID]:data.stationLog
        }
      }))
    
  }

  getStationWeekLog(stationID){
    fetch(`${API_URL}stationlogweek/${stationID}`).then(res=>res.json()).then(data=>(
      this.setStationWeekLog(data,stationID)
    ))
  }

  setStationWeekLog(data,stationID){

      this.setState(prevState=>({
        weekLog:{
          ...prevState.weekLog,
          [stationID]:data.stationLog
        }
      }))
      // console.log(this.state.weekLog[stationID])
    
  }

  async handleMapLocationChange(lat,lon){
    await this.setState( prevState=>({
      selectedLocation: "Custom Location",
      selectedLocationLatitude:lat.toFixed(5),
      selectedLocationLongitude:lon.toFixed(5),

      numStations:10,
      stations:[],
      initialBikeCount:{},
      status:{},
      showInfo:{},
      dayLog :{},
      weekLog :{},
      
      hasLoaded:false,


      mapStation:null,
      
      loadTime: null,
      updateTime :null,
      mapClickTime:null,
      timeSinceUpdate:null,
      timeSinceLoad:null,
      timeSinceMapClick:null,
    }))
    this.getStationStatus()

  }

  async handleLocationChange(name){
    await this.setState( prevState=>({
      selectedLocation: name,
      selectedLocationLatitude:prevState.locationCoordinates[name].latitude,
      selectedLocationLongitude:prevState.locationCoordinates[name].longitude,
      numStations:10,
      stations:[],
      initialBikeCount:{},
      status:{},
      showInfo:{},
      dayLog :{},
      weekLog :{},
      
      hasLoaded:false,

      mapStation:null,
      
      loadTime: null,
      updateTime :null,
      mapClickTime:null,
      timeSinceUpdate:null,
      timeSinceLoad:null,
      timeSinceMapClick:null,
    }))
    this.getStationStatus()
  }

  handleMapToggle(){
    this.setState( prevState =>(
      {showMap:!prevState.showMap}
     ))
  }

  async handleMapClick(event,id){
    await this.setState( prevState=>({
        mapStation:id,
        mapClickTime:Date.now(),
        showInfo:{
          ...prevState.showInfo,
          [id]:true
        } }
      

    ))
    this.getStationDayLog(id)
    this.getStationWeekLog(id) 
    
  }

  async handleShowChange(id){
    await this.setState( prevState =>{
      const newShow = !prevState.showInfo[id]
      return { 
      showInfo:{
        ...prevState.showInfo,
        [id]:newShow
      }
     }})
    this.getStationDayLog(id)
    this.getStationWeekLog(id)   
  }

  async loadMoreStations(){
    await this.setState(prevState=>({
      numStations: prevState.numStations+10
    }))
    this.getStationStatus()
  }

  updateWindowDimensions() {
    this.setState(prevState=>{
      const nextShowMap = prevState.showMap || (prevState.view!=="Desktop"&&window.innerWidth>820);
      return {
        windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight,
      view:window.innerWidth>820?"Desktop":"Mobile",
      showMap:nextShowMap
    }});
    
      
     
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({showMap:window.innerWidth>820?true:false})
    this.getStationStatus()
    setInterval(() => this.setState(prevState=>({ timeSinceUpdate: Date.now()-prevState.updateTime,timeSinceLoad:Date.now()-prevState.loadTime})), 100)
    setInterval(() => this.setState(prevState=>({timeSinceMapClick:Date.now()-prevState.mapClickTime})), 10)
    setInterval(() => this.getStationStatus(), 30000)
    
      
  }

  render(){
    if (this.state.view==="Desktop"){return (
      <div>
        <Header {...this.state}/>
        <Desktop {...this.state} handleLocationChange = {this.handleLocationChange} handleMapClick = {this.handleMapClick} handleMapLocationChange = {this.handleMapLocationChange} handleMapToggle = {this.handleMapToggle} handleShowChange = {this.handleShowChange} loadMoreStations = {this.loadMoreStations}/>
        <Footer {...this.state}/>
        
      </div>
    );}
    else{return(
      <div>
        <Header {...this.state}/>
        <div style={{width:"min(90vw,800px)",margin:"auto"}}>
        <Dashboard{...this.state} handleLocationChange = {this.handleLocationChange} handleMapClick = {this.handleMapClick} handleMapLocationChange = {this.handleMapLocationChange}  handleMapToggle = {this.handleMapToggle}/>
        <Stations{...this.state} handleShowChange = {this.handleShowChange} loadMoreStations = {this.loadMoreStations}/>
        </div>
        <Footer {...this.state}/>
      </div>
    )
      
    }
  }
}

export default App;
