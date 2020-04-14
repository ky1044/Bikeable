import React from "react"
import AdditionalStationInfoToggle from "./AdditionalStationInfoToggle"
import AdditionalStationInfo from "./AdditionalStationInfo"
function StationCard(props){
    return (
        <div>
            
            <div className = "station-container">
                <h2>{props.status[props.id].name}: {props.status[props.id].bikes}/{props.status[props.id].docks} Bikes</h2>
                    <div style = {{float:"left"}}>
                    <p style = {{color:"#aaaaaa"}}>{props.status[props.id].distance} meters away, <a style = {{color:"#00deff"}}href={props.status[props.id].mapsURL}>Map</a>, <a style = {{color:"#00deff"}}href={props.status[props.id].appURL}>Use</a>.</p>
                    </div>
                    <AdditionalStationInfoToggle  {...props}/>
                    <AdditionalStationInfo {...props}/>

                
            </div>
            <br/>
        </div>
    )
}
export default StationCard