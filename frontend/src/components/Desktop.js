import React from "react"
import LocationCard from "./LocationCard"
import Maps from "./StationMap"
import Stations from "./Stations"
// import {scroller} from "react-scroll";
var Scroll = require('react-scroll');
var Element = Scroll.Element;
var scroller = Scroll.scroller;


function scrollToStation(id) {
    scroller.scrollTo("station_"+id,{duration: 500,smooth: true,offset:-20,containerID:"stationListContainer"})
    console.log(id)
    }

function Desktop(props){
    return(
        <div>


        {props.hasLoaded?

            <div className = "main-content">
                <Element class = "left-content" id = "stationListContainer">
                    <div class = "left-top">
                        <div className = "mobile-container" style={{color:"#aaaaaa"}}>
                            <h4 style={{float:"left"}}>{props.time}, {props.date}</h4>
                            <h4 style={{float:"right"}}>{props.temperature}, {props.weather}</h4>
                        </div>
                    </div>
                    <div style = {{padding:5, textAlign:"left"}} >
                    <Stations {...props} handleShowChange = {props.handleShowChange} loadMoreStations = {props.loadMoreStations}/>
                    </div>
                </Element>

                <div class = "right-content" style ={{textAlign:"left"}}>
                    <div class = "right-top" style = {{padding:5}}>
                        <LocationCard {...props} handleLocationChange = {props.handleLocationChange} /> 
                        
                    </div>
                    <div className = "toggle" style={{marginTop:3, float:"right"}} onClick={props.handleMapToggle}>
                    {props.showMap?"hide map ∧":"show map ∨"}</div>
                    <div style = {{padding:5, clear:"both"}}>
                    {props.showMap&&<Maps{...props} handleMapClick = {props.handleMapClick} scrollToStation={scrollToStation}/>}
                    </div>
                </div>
                
                {/* <div style={{height:25}}/> */}
            </div>
            :

            <h2 style={{textAlign: "center"}}>Loading...</h2>
            }
        </div>
    )
}
export default Desktop