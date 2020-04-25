import React from "react"

function LocationCard(props){
    const MinuteDistance = 60
    return (
        <div>
            <div style={{height:3}}/>
            {props.stationID !== props.stations[props.stations.length-1]&& Math.floor(props.status[props.stationID].distance/MinuteDistance)<Math.floor(props.status[props.stations[props.index+1]].distance/MinuteDistance)?
                <div>
                    <div className = "walk-container"><p style ={{paddingLeft:5,paddingRight:5,position:"absolute",right:20,backgroundColor:"black"}}>{Math.floor(props.status[props.stations[props.index+1]].distance/MinuteDistance)} minute walk</p></div>
                    <hr style ={{borderColor:"#222222",borderStyle: "dashed",marginTop:8 ,position:"absolute",left:-4,width:"100%",zIndex:-5}}/>
                    <div style ={{height:10}}></div>

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