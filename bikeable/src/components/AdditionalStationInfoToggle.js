import React from "react"

function AdditionalStationInfoToggle(props){
    if (props.show) {
        return(
            <div className = "additional-info-toggle" onClick={()=>props.change(props.id) }>less info ∧</div>

        )
    }else{
        return(
            <div className = "additional-info-toggle" onClick={()=>props.change(props.id) }>more info ∨</div>
        )
    }

}

export default AdditionalStationInfoToggle