import React from "react";
import L from "leaflet"
import { Map, Marker, TileLayer,Tooltip,Popup } from "react-leaflet";

const currentLocationIcon = new L.Icon({
  iconUrl: require('./mapImages/currentLocation.png'),
  iconAnchor: null,
  iconSize: new L.Point(20, 20),
});

const stationIcon = new L.Icon({
  iconUrl: require('./mapImages/station2.png'),
  iconAnchor: null,
  iconSize: new L.Point(30, 30),
});

function pan(map,latitude,longitutde) {
  map.setView([latitude,longitutde],17)
}

async function scrollToStation(id) {
  let element = document.getElementById("station_"+id);
  element.scrollIntoView({behavior: "smooth"});
  }


class  StationMap extends React.Component{
  
  constructor() {
    super()
    this.mapRef = React.createRef();
    this.state={
      newLocation:null,
    }

    this.resetNewLocation = this.resetNewLocation.bind(this);
    this.NewLocation = this.NewLocation.bind(this);
  }

  resetNewLocation() {
    this.setState({ newLocation: null });
  }

  NewLocation(e) {
    this.setState({ newLocation: e.latlng });
  }


  componentDidMount (){
    const mapRef = this.mapRef.current.leafletElement
    this.setState({mapRef:mapRef})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  nextProps.showMap!==this.props.showMap||nextProps.stations!==this.props.stations||nextState.newLocation!==this.state.newLocation ;    
  }

  render(){    

    return (
      <div>
        <div className ="map-container" style={{height:this.props.view==="Desktop"?"calc(100vh - 175px)":300}}>
            <Map center={[this.props.selectedLocationLatitude, this.props.selectedLocationLongitude]} zoom={16} ref = {this.mapRef} onClick={this.NewLocation} onViewportChange = {this.resetNewLocation}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
            />
  
            {this.props.stations.map(stationID=>(this.props.status[stationID])).map(station=>(

              <Marker 
              key = {station.id} 
              icon = {stationIcon}
              position = {[station.latitude,station.longitude]} 
              onClick = {(event)=>{this.props.handleMapClick(event,station.id);scrollToStation(station.id);pan(this.state.mapRef,station.latitude,station.longitude);this.resetNewLocation() }}>
                <Tooltip direction='top' offset={[0, -4]} opacity={.4}  permanent>
                         <h4 style= {{color:"black",opacity:1}}>{station.bikes}/{station.docks}</h4>
                </Tooltip>
              
              </Marker>
            
            ))}
            <Marker icon = {currentLocationIcon} position = {[this.props.selectedLocationLatitude, this.props.selectedLocationLongitude]}  />
            {this.state.newLocation && <Marker  icon = {currentLocationIcon}  opacity = {0.5} position = {[this.state.newLocation.lat,this.state.newLocation.lng]}></Marker>}
            {this.state.newLocation && <Popup position=  {[this.state.newLocation.lat,this.state.newLocation.lng]}  onClose = {this.resetNewLocation}> 
              <h4 onClick={(event)=>{this.props.handleMapLocationChange(this.state.newLocation.lat,this.state.newLocation.lng)}}  style= {{color:"black",cursor:"pointer"}}>set location</h4>
            </Popup>}
            
            </Map>
            
        </div>
        
      </div>
    );
  }
  
}
export default StationMap