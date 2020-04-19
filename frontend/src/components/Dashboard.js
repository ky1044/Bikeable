import React from "react"
import LocationCard from "./LocationCard"

function Dashboard(props){
    return(
        <div>
        {!props.hasloaded&&<h2 style={{textAlign: "center"}}>Loading...</h2>}
        {props.hasloaded&&
            <div className = "general-info-container" style={{color:"#aaaaaa"}}>
                <h4 style={{float:"left"}}>{props.time}, {props.date}</h4>
                <h4 style={{float:"right"}}>{props.temperature}, {props.weather}</h4>
            </div>}        
        <LocationCard {...props} handleLocationChange = {props.handleLocationChange} /> 
        </div>
    )
}
export default Dashboard