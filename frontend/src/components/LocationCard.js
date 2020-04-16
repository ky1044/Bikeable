import React from "react"

function LocationCard(props){
    return (
        <div>
            
            <div className = "location-container">
            {props.hasloaded&&<h4 >Current Location: {props.selectedLocation}</h4>}
            
            {Object.keys(props.locationCoordinates).map((key,index)=>(
            props.hasloaded&&props.selectedLocation!==key&&<h5 style={{float:"left"}}className = "location-option" onClick={()=>props.handleLocationChange(key) }>{key}</h5>
            ))}
            </div>
            <br style = {{clear:"both"}}/>
        </div>
    )
}
export default LocationCard