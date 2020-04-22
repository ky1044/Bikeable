import React from "react";
import { Map, Marker, TileLayer,Tooltip } from "react-leaflet";
// import { Icon } from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
// import "./app.css";

function StationMap(props) {
  return (
    <div>
      <div className ="map-container">
          <Map center={[props.locationCoordinates[props.selectedLocation].latitude, -props.locationCoordinates[props.selectedLocation].longitude]} zoom={15.5}>
          <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {props.stations.map(stationID=>(props.status[stationID])).map(station=>(
            <Marker 
            key = {station.id} 
            position = {[station.latitude,station.longitude]} 
            onClick = {(event)=>props.handleMapClick(event,station.id)}>
              <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                       <h4 style= {{color:"black"}}>{station.bikes}/{station.bikes+station.docks}</h4>
              </Tooltip>
            
            </Marker>
          
          ))}
          <Marker position = {[props.locationCoordinates[props.selectedLocation].latitude, -props.locationCoordinates[props.selectedLocation].longitude]} />
          
          </Map>
          
      </div>
      
    </div>
  );
}
export default StationMap