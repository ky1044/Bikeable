import React from "react"

import SearchLocations from "./SearchLocations"
function LocationCard(props){
    return (
        <div>
            <div className = "mobile-container" style = {{overflow:"visible",padding:"0px 10px"}}>

            {props.hasLoaded&&<h4 style = {{padding:"5px 0px"}}><span style = {{color:"#aaaaaa" }} >Around </span>{props.selectedLocation}</h4>}
            <SearchLocations {...props} handleLocationChange = {props.handleLocationChange}/>
            </div>
        
    
        
            
        </div>
    )
}
export default LocationCard