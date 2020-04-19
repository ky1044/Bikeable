import React from "react"
import StationCard from "./StationCard"

function Stations(props){
    return(
        <div>
            {props.stations.map( (id,index )=>(
            <StationCard
            key={id}
            id = {id}
            index = {index}
            {...props}

            handleShowChange = {props.handleShowChange}
            />
            ) )}

            {props.hasloaded && props.stations.length<30 && <div><h3 className = "load-more" onClick={()=>props.loadMoreStations() }>Load More Stations</h3><br/></div>}
        </div>
    )
}
export default Stations