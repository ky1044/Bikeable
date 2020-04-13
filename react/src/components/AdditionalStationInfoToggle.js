import React from "react"

function AdditionalStationInfoToggle(props){
        return(
            <div className = "additional-info-toggle" onClick={()=>props.handleShowChange(props.id) }>
                {props.showInfo[props.id]?"less info ∧":"more info ∨"}</div>
        )
}

export default AdditionalStationInfoToggle