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

    
  }

  getStationStatus(){
    fetch(`stationstatus/${this.state.latitude},${this.state.longitude}`).then(res=>res.json()).then(data=>(
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
      updateTime: Date.now()
    })
         

     for (let stationI = 0; stationI < stationList.length; stationI++){
      this.setState(prevState=>({ 
        status:{
          ...prevState.status,
          [stationList[stationI]]:data.stationStatus[stationI]
        }
       }));
      
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

        {this.state.stations.map( id =>(
          <StationCard
          key={id}
          id = {id}
          {...this.state}

          handleShowChange = {this.handleShowChange}
          />
        ) )}
        {this.state.hasloaded&&<Footer/>}

      </div>
    );
  }
}

export default App;
