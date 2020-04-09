import React from "react"
function StationCard(props){
    return (
        <div>
            <div className = "station-container">
                <h2>{props.stationInfo.name}: {props.stationInfo.bikes}/{props.stationInfo.docks} Bikes</h2>
                <p >{props.stationInfo.distance} meters away. Updated {parseInt(props.lastUpdate/1000)} seconds ago.</p>
            </div>
            <br/>
        </div>
    )
}
export default StationCard