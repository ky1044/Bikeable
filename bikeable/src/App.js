import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [stationList,setStationList] = useState(0);

  useEffect(()=>{
    fetch('getStationInfo').then(res=>res.json()).then(data=>{
      setStationList(data.bikes)
    })
  }


  )

  return (
    

    <div>
      <div class = "header">
        <div style={{margin:"auto",width:320,alignContent:"center"}}>

          <p style={{textAlign: "center"}}>
          <img src ="/logo.png" alt = "Bikeable" style = {{margin:"auto",padding:20, align:"middle"}} width = "160px"/>
          </p>

        </div>
      </div>
      <br/>
      <br/>
      <div class = "station-container">
        <h2>LaGuardia Pl & W 3 St: 16/35 Bikes</h2>
        <p >137 meters away. Updated just now.</p>
      </div>
      <br/>
      <div class = "station-container">
        <h2>Washington Pl & Broadway 13/26 Bikes</h2>
        <p >205 meters away. Updated just now.</p>
      </div>
      <br/>
      <div class = "station-container">
        <h2>Mercer St & Bleecker St: 32/43 Bikes</h2>
        <p >236 meters away. Updated just now.</p>
      </div>
      <div>
        <p id = "info"></p>
      </div>
    

    
    </div>
  );
}

export default App;
