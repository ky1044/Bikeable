import React from "react"
import AdditionalStationInfoToggle from "./AdditionalStationInfoToggle"
import AdditionalStationInfo from "./AdditionalStationInfo"
function StationCard(props){
    return (
        <div>
            
            <div className = "station-container">
                <h2>{props.stationInfo.name}: {props.stationInfo.bikes}/{props.stationInfo.docks} Bikes</h2>
                    <div style = {{float:"left"}}>
                    <p style = {{color:"#aaaaaa"}}>{props.stationInfo.distance} meters away, <a style = {{color:"#00deff"}}href={props.stationInfo.mapsURL}>open on Maps</a>, <a style = {{color:"#00deff"}}href={props.stationInfo.appURL}>open on App</a>.</p>
                    </div>
                    <AdditionalStationInfoToggle show = {props.showInfo} change = {props.handleShowChange} id={props.stationInfo.id} />
                <AdditionalStationInfo show = {props.showInfo} timeSinceUpdate ={props.timeSinceUpdate} timeSinceLoad = {props.timeSinceLoad} logBikeCount = {props.logBikeCount}/>

                
            </div>
            <br/>
        </div>
    )
}
export default StationCard