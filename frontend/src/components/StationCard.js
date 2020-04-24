import React from "react"
import AdditionalStationInfoToggle from "./AdditionalStationInfoToggle"
import AdditionalStationInfo from "./AdditionalStationInfo"
import WalkingTimeLine from "./WalkingTimeLine"
function StationCard(props){
    return (
        <div id = {"station_"+props.stationID}>
            
            <div className = "station-container"  style = {{backgroundColor:props.mapStation===props.stationID&&"#1a1a1a"}}>
                <h2>{props.status[props.stationID].name}: {props.status[props.stationID].bikes}/{props.status[props.stationID].docks} Bikes</h2>
                    <div style = {{float:"left"}}>
                    <p style = {{color:"#aaaaaa"}}>{props.status[props.stationID].distance} meters away, <a style = {{color:"#00deff"}}href={props.status[props.stationID].mapsURL}>Map</a>, <a style = {{color:"#00deff"}}href={props.status[props.stationID].appURL}>Use</a>.</p>
                    </div>
                    <AdditionalStationInfoToggle  {...props}/>
                    <AdditionalStationInfo {...props}/>

                
            </div>
            <WalkingTimeLine {...props}/>
        </div>
    )
}
export default StationCard