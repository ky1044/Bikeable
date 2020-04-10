import React from "react"
import ChangeSinceLoad from "./ChangeSinceLoad"
function StationCard(props){
    return (
        <div>
            
            <div className = "station-container">
                <h2>{props.stationInfo.name}: {props.stationInfo.bikes}/{props.stationInfo.docks} Bikes</h2>
                <p style = {{color:"#aaaaaa"}}>Updated {parseInt(props.lastUpdate/1000)} seconds ago. {ChangeSinceLoad(props.localhistory)}</p>
                <p style = {{color:"#aaaaaa"}}>{props.stationInfo.distance} meters away, 
                <a style = {{color:"#00deff"}}href={props.stationInfo.mapsURL}>Get me there</a>.</p>
                
            </div>
            <br/>
        </div>
    )
}
export default StationCard