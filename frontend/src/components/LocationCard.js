import React from "react"

import SearchLocations from "./SearchLocations"
function LocationCard(props){
    return (
        <div>
            
            <div className = "location-container">
            <div style = {{marginTop:10}}>
            {props.hasLoaded&&<h3 style = {{display:"inline-block",padding:"5px 0px"}}><span style = {{color:"#aaaaaa" }} >Around </span>{props.selectedLocation}</h3>}
            <SearchLocations {...props} handleLocationChange = {props.handleLocationChange}/>
            </div>
            
            <div style={{clear:"both"}}></div>
            
            {/* Old location selector */}
            {/* {Object.keys(props.locationCoordinates).map((key,index)=>(
            props.hasLoaded&&props.selectedLocation!==key&&<h5 key = {key} style={{float:"left"}}className = "location-option" onClick={()=>props.handleLocationChange(key) }>{key}</h5>
            ))} */}
            <div className = "map-toggle" style={{marginTop:10}} onClick={props.handleMapToggle}>
                    {props.showMap?"hide map ∧":"show map ∨"}</div>
            </div>

            
            
            <div style = {{height:0,clear:"both"}}/>
            
        </div>
    )
}
export default LocationCard