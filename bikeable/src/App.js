import React,{useState,useEffect} from 'react';
import './App.css';

import Header from "./components/Header"
import StationCard from "./components/StationCard"

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      stations :  [{
        "stationName" :"LaGuardia Pl & W 3 St",
        "bikes" : 16,
        "docks" : 35,
        "distance" : "137 meters",
        "lastUpdate" : "just now",
      },
      {
        "stationName" :"Washington Pl & Broadway",
        "bikes" : 13,
        "docks" : 26,
        "distance" : "205 meters",
        "lastUpdate" : "just now",
      },
      {
        "stationName" :"Mercer St & Bleecker St",
        "bikes" : 32,
        "docks" : 43,
        "distance" : "236 meters",
        "lastUpdate" : "just now",
      },
    ]
    }
  }

  // const [stationList,setStationList] = useState(0);

  // useEffect(()=>{
  //   fetch('getStationInfo').then(res=>res.json()).then(data=>{
  //     setStationList(data.bikes)
  //   })
  // }
  // )
  render(){
    return (
    
      <div>
        <Header/>
        {this.state.stations.map( station=>(
          <StationCard
          stationInfo = {station}
        />
        ) )}
      </div>
    );
  }
}

export default App;
