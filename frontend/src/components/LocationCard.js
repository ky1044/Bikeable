import React from "react"

function LocationCard(props){
    return (
        <div>
            
            <div className = "location-container">
            {props.hasLoaded&&<h3 ><span style = {{color:"#aaaaaa"}} >Around </span>{props.selectedLocation}</h3>}
            
            {Object.keys(props.locationCoordinates).map((key,index)=>(
            props.hasLoaded&&props.selectedLocation!==key&&<h5 key = {key} style={{float:"left"}}className = "location-option" onClick={()=>props.handleLocationChange(key) }>{key}</h5>
            ))}
            </div>
            <div style = {{height:8,clear:"both"}}/>
        </div>
    )
}
export default LocationCard