import React from "react"
import ChangeSinceLoad from "./ChangeSinceLoad"

function AdditionalStationInfo(props){

        return(
            <div>
            {props.show &&
                <div className = "additional-station-info">
                    <hr style ={{borderColor:"#555555"}}/>
                    <h4>Additional Info:</h4>
                    <p style = {{color:"#aaaaaa"}}>Updated {parseInt(props.timeSinceUpdate/1000)} seconds ago. {ChangeSinceLoad(props.logBikeCount,props.timeSinceLoad)}</p>
                </div>
            }</div>
        )
}
export default AdditionalStationInfo