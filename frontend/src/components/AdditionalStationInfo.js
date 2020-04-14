import React from "react"


import ChangeSinceLoad from "./ChangeSinceLoad"
import DayChart from "./DayChart"
import WeekChart from "./WeekChart"



class  AdditionalStationInfo extends React.Component{

        constructor(props) {
            super(props);
        }
        shouldComponentUpdate(nextProps, nextState) {
            return  nextProps.showInfo!==this.props.showInfo||nextProps.timeSinceLoad-this.props.timeSinceLoad > 100;    
          }

        
        render(){
            
            return(
                <div>
                {this.props.showInfo[this.props.id] &&
                    <div className = "additional-station-info">
                        <hr style ={{borderColor:"#555555"}}/>
                        <h4>Additional Info:</h4>
                        <span>
                        <p style = {{color:"#aaaaaa"}}>{this.props.timeSinceUpdate>3000? `Updated ${parseInt(this.props.timeSinceUpdate/1000)} seconds ago.`: `Updated just now.`} {ChangeSinceLoad(this.props.logBikeCount[this.props.id],this.props.timeSinceLoad)}</p>
                        </span>
                        <br/>
                        
                        <DayChart  {...this.props}/>
                        <WeekChart  {...this.props}/>
                    </div>
                }</div>
            )
        }
        
}
export default AdditionalStationInfo