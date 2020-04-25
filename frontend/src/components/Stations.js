import React from "react"
import StationCard from "./StationCard"

function Stations(props){
    return(
        <div>
            {props.stations.map( (id,index )=>(
            <div id={"station_"+id} key = {id}>
            <StationCard
            key={id}
            stationID = {id}
            index = {index}
            {...props}

            handleShowChange = {props.handleShowChange}
            />
            </div>
            ) )}

            {props.hasLoaded && props.stations.length<30 && <div><h3 className = "load-more" onClick={()=>props.loadMoreStations() }>Load More Stations</h3><br/></div>}
        </div>
    )
}
export default Stations