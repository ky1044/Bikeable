import React from "react"


import ChangeSinceLoad from "./ChangeSinceLoad"
import DayChart from "./DayChart"
import WeekChart from "./WeekChart"



class  AdditionalStationInfo extends React.Component{

        shouldComponentUpdate(nextProps, nextState) {
            return  nextProps.showInfo!==this.props.showInfo||nextProps.timeSinceLoad-this.props.timeSinceLoad > 100;    
          }
        
        render(){
            return(
                <div>
                {this.props.showInfo[this.props.stationID] &&
                    <div className = "additional-station-info">
                        <hr style ={{borderColor:"#555555"}}/>
                        <h4>Additional Info:</h4>

                        <p style = {{color:"#aaaaaa"}}>
                            {this.props.timeSinceUpdate>3000? `Updated ${parseInt(this.props.timeSinceUpdate/1000)} seconds ago.`: `Updated just now. `}
                            {ChangeSinceLoad(this.props.initialBikeCount[this.props.stationID],this.props.status[this.props.stationID].bikes,this.props.timeSinceLoad)}
                        </p>
                        <br/>
                        
                        {this.props.dayLog[this.props.stationID]? <DayChart  {...this.props}/>:<h4 align ="center">Loading past day's logs...<br/></h4>}
                        {this.props.weekLog[this.props.stationID]?<WeekChart  {...this.props}/>:<h4 align ="center">Loading past week's logs...<br/></h4>}
                    </div>
                }</div>
            )
        }
        
}
export default AdditionalStationInfo