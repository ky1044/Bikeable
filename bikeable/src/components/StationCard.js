import React from "react"
function StationCard(props){
    return (
        <div>
            <div className = "station-container">
                <h2>{props.stationInfo.name}: {props.stationInfo.bikes}/{props.stationInfo.docks} Bikes</h2>
                <p >{props.stationInfo.distance} meters away. Updated {parseInt(props.lastUpdate/1000)} seconds ago. <a style = {{color:"#00deff"}}href={props.stationInfo.mapsURL}>Get Me There (beta){/* Yes this whole site is beta */}.</a></p>
                
            </div>
            <br/>
        </div>
    )
}
export default StationCard