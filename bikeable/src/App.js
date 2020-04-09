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
    longitude:73.9973
    
    }
    this.Initialize = this.Initialize.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.getStationStatus = this.getStationStatus.bind(this);

  }
  async Initialize(){
    let x = await this.getStationStatus()
    console.log(this.latitude)
    this.getStationStatus()
    
  }
  
  getLocation(){
    
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setLocation,this.handleLocationError,{timeout:10000})
    }else{
      console.log("error")
      alert("User location could not be retrieved.")
    }
    return null
  }

  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert( "User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
    this.setState({ 
      warnings: "location could not be retried, so example location of Washington Square Park was used",
      latitude: 40.7308,
      longitude:73.9973
     });
  }

  setLocation(position){
    console.log("HELLO")
    console.log(position)
    this.setState({ 
      latitude: position.coords.latitude,
      longitude:position.coords.longitude
     });
  }
  getStationStatus(){
    fetch('stationstatus/'+String(this.latitude)+String(this.longitude)).then(res=>res.json()).then(data=>(
      this.setStationStatus(data)
    ))
  }

  setStationStatus(data){
    console.log(data)
    this.setState({ 
      stations:data.stationStatus
     });
  }

  componentDidMount() {
    this.Initialize()
      
  
    
  }

  

 
  render(){

   

    // const [stationList,setStationList] = useState(0);
  
    // useEffect(()=>{
    //   fetch('getStationInfo').then(res=>res.json()).then(data=>{
    //     setStationList(data.bikes)
    //   })
    // }
    // )

    return (
    
      <div>
        <Header/>
        <p>{this.warnings}</p>
        {/* <button onClick = {this.getLocation}>Get location</button> */}
        {this.state.stations.map( station=>(
          <StationCard
          key={station.stationName}
          stationInfo = {station}
        />
        ) )}
        {/* <p>{this.state.location}</p> */}
      </div>
    );
  }
}

export default App;
