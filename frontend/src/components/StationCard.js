import React from "react"
import AdditionalStationInfoToggle from "./AdditionalStationInfoToggle"
import AdditionalStationInfo from "./AdditionalStationInfo"
import WalkingTimeLine from "./WalkingTimeLine"
function StationCard(props){
    let cardBrightness = Math.max(0,Math.floor(50-(props.timeSinceMapClick/50)))
    let cardColor = cardBrightness+","+cardBrightness*1.5+","+cardBrightness*2
    // props.mapStation===props.stationID&&console.log(cardColor)
    return (
        <div>
            <div className = "station-container"  style = {{backgroundColor:props.mapStation===props.stationID&&"rgb("+cardColor+")"}}>
                <h2>{props.status[props.stationID].name}: {props.status[props.stationID].bikes}/{props.status[props.stationID].docks} Bikes</h2>
                    <div style = {{float:"left"}}>
                    <p style = {{color:"#aaaaaa"}}>{props.status[props.stationID].distance} meters, <a style = {{color:"#00deff"}}href={props.status[props.stationID].mapsURL}>Map</a>, <a style = {{color:"#00deff"}}href={props.status[props.stationID].appURL}>Use</a>.</p>
                    </div>
                    <AdditionalStationInfoToggle  {...props}/>
                    <AdditionalStationInfo {...props}/>

                
            </div>
            {props.view==="Mobile"?<WalkingTimeLine {...props}/>:<div style={{height:20}}/>}
            
        </div>
    )
}
export default StationCard