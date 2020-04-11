import React from "react"

function AdditionalStationInfoToggle(props){
        return(
            <div className = "additional-info-toggle" onClick={()=>props.change(props.id) }>
                {props.show?"less info ∧":"more info ∨"}</div>
        )
}

export default AdditionalStationInfoToggle