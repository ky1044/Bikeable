import React from "react"

function LocationCard(props){
    return (
        <div>
            
            <div className = "location-container">
            {props.hasLoaded&&<h3 ><span style = {{color:"#aaaaaa"}} >Around </span>{props.selectedLocation}</h3>}
            
            {Object.keys(props.locationCoordinates).map((key,index)=>(
            props.hasLoaded&&props.selectedLocation!==key&&<h5 key = {key} style={{float:"left"}}className = "location-option" onClick={()=>props.handleLocationChange(key) }>{key}</h5>
            ))}
            <div className = "map-toggle" style={{marginTop:16}} onClick={props.handleMapToggle}>
                    {props.showMap?"hide map ∧":"show map ∨"}</div>
            </div>
            
            <div style = {{height:0,clear:"both"}}/>
        </div>
    )
}
export default LocationCard