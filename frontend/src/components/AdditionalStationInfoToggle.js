import React from "react"

function AdditionalStationInfoToggle(props){
        return(
            <div className = "toggle" onClick={()=>props.handleShowChange(props.stationID) }>
                {props.showInfo[props.stationID]?"less info ∧":"more info ∨"}</div>
        )
}

export default AdditionalStationInfoToggle