import React from "react"
import LocationCard from "./LocationCard"
import Maps from "./StationMap"
import {scroller} from "react-scroll"

function scrollToStation(id) {
    scroller.scrollTo("station_"+id,{duration: 500,smooth: true,offset:-20})
    console.log(id)
    }

function Dashboard(props){
    return(
        <div>
        {props.hasLoaded?

            <div>
                <div style={{height:8}}/>
                <div className = "mobile-container" style={{color:"#aaaaaa"}}>
                <h4 style={{float:"left"}}>{props.time}, {props.date}</h4>
                <h4 style={{float:"right"}}>{props.temperature}, {props.weather}</h4>
                </div>
                <div style = {{height:10}}/>
                <LocationCard {...props} handleLocationChange = {props.handleLocationChange} /> 
                <div className = "toggle" style={{marginTop:15}} onClick={props.handleMapToggle}>
                    {props.showMap?"hide map ∧":"show map ∨"}</div>
                <div style = {{clear:"both"}}/>
                {props.showMap&&<Maps{...props} handleMapClick = {props.handleMapClick} scrollToStation={scrollToStation}/>}
                <div style={{height:25}}/>
            </div>
            :

            <h2 style={{textAlign: "center"}}>Loading...</h2>
            }
        </div>
    )
}
export default Dashboard