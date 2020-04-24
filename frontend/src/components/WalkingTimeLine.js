import React from "react"

function LocationCard(props){
    const MinuteDistance = 60
    return (
        <div>
            <div style={{height:3}}/>
            {props.stationID !== props.stations[props.stations.length-1]&& Math.floor(props.status[props.stationID].distance/MinuteDistance)<Math.floor(props.status[props.stations[props.index+1]].distance/MinuteDistance)?
                <div>
                    <div className = "walk-container"><p style ={{paddingLeft:5,paddingRight:5,float:"right",backgroundColor:"black"}}>{Math.floor(props.status[props.stations[props.index+1]].distance/MinuteDistance)} minute walk</p></div>
                    <hr style ={{borderColor:"#222222",borderStyle: "dashed",margin:"auto",marginTop:-10}}/>

                </div>:
                <div>
                    <div className = "walk-container"><p style ={{position: "relative"}}> <br/></p></div>
                    <div style ={{marginTop:-8}}></div>

                </div>
                }
            <div style={{height:11}}/>
        </div>
        

    )
}
export default LocationCard