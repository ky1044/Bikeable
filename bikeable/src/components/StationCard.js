import React from "react"
function StationCard(props){
    return (
        <div>
            <div className = "station-container">
                <h2>{props.stationInfo.stationName}: {props.stationInfo.bikes}/{props.stationInfo.docks} Bikes</h2>
                <p >{props.stationInfo.distance} away. Updated {props.stationInfo.lastUpdate}.</p>
            </div>
            <br/>
        </div>
    )
}
export default StationCard