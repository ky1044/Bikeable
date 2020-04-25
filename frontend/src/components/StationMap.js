import React from "react";
import { Map, Marker, TileLayer,Tooltip } from "react-leaflet";

async function scrollToStation(id) {
  let element = document.getElementById("station_"+id);
  element.scrollIntoView({behavior: "smooth"});
  }

class  StationMap extends React.Component{

  shouldComponentUpdate(nextProps, nextState) {
    return  nextProps.showMap!==this.props.showMap||nextProps.stations!==this.props.stations ;    
  }

  render(){
    return (
      <div>
        <div className ="map-container" style={{height:this.props.view==="Desktop"?"calc(100vh - 175px)":300}}>
            <Map center={[this.props.locationCoordinates[this.props.selectedLocation].latitude, -this.props.locationCoordinates[this.props.selectedLocation].longitude]} zoom={16}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
  
            {this.props.stations.map(stationID=>(this.props.status[stationID])).map(station=>(

              <Marker 
              key = {station.id} 
              position = {[station.latitude,station.longitude]} 
              onClick = {(event)=>{this.props.handleMapClick(event,station.id);scrollToStation(station.id)}}>
                <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                         <h4 style= {{color:"black"}}>{station.bikes}/{station.docks}</h4>
                </Tooltip>
              
              </Marker>
            
            ))}
            <Marker position = {[this.props.locationCoordinates[this.props.selectedLocation].latitude, -this.props.locationCoordinates[this.props.selectedLocation].longitude]} />
            
            </Map>
            
        </div>
        
      </div>
    );
  }
  
}
export default StationMap