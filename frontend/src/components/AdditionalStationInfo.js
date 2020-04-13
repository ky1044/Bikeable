import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,ResponsiveContainer} from 'recharts';

import ChangeSinceLoad from "./ChangeSinceLoad"
import DayChart from "./DayChart"



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
                    </div>
                }</div>
            )
        }
        
}
export default AdditionalStationInfo