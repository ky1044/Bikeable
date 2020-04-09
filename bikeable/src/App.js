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
    console.log(data)
    this.setState({ 
      stations:data.stationStatus
     });
  }

  componentDidMount() {
    this.getStationStatus()
      
  
    
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
