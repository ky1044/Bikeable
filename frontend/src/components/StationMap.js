import React from "react";
import L from "leaflet"
import { Map, Marker, TileLayer,Tooltip } from "react-leaflet";
import currentLocation from "./mapImages/currentLocation.png"

const currentLocationIcon = new L.Icon({
  iconUrl: require('./mapImages/currentLocation.png'),
  // iconRetinaUrl: require('./mapImages/currentLocation.png'),
  iconAnchor: null,
  // popupAnchor: null,
  // shadowUrl: null,
  // shadowSize: null,
  // shadowAnchor: null,
  iconSize: new L.Point(20, 20),
  // className: 'leaflet-div-icon'
});
const stationIcon = new L.Icon({
  iconUrl: require('./mapImages/station2.png'),
  iconAnchor: null,
  iconSize: new L.Point(30, 30),

});

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
              icon = {stationIcon}
              position = {[station.latitude,station.longitude]} 
              onClick = {(event)=>{this.props.handleMapClick(event,station.id);scrollToStation(station.id)}}>
                <Tooltip direction='top' offset={[0, -4]} opacity={.4}  permanent>
                         <h4 style= {{color:"black",opacity:1}}>{station.bikes}/{station.docks}</h4>
                </Tooltip>
              
              </Marker>
            
            ))}
            <Marker icon = {currentLocationIcon} position = {[this.props.locationCoordinates[this.props.selectedLocation].latitude, -this.props.locationCoordinates[this.props.selectedLocation].longitude]}  />
            
            </Map>
            
        </div>
        
      </div>
    );
  }
  
}
export default StationMap