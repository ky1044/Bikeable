import React from "react"
import ChangeSinceLoad from "./ChangeSinceLoad"
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';




function AdditionalStationInfo(props){
        // console.log(props.log)
        const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];

        return(
            <div>
            {props.showInfo[props.id] &&
                <div className = "additional-station-info">
                    <hr style ={{borderColor:"#555555"}}/>
                    <h4>Additional Info:</h4>
                    <p style = {{color:"#aaaaaa"}}>Updated {parseInt(props.timeSinceUpdate/1000)} seconds ago. {ChangeSinceLoad(props.logBikeCount[props.id],props.timeSinceLoad)}</p>
                    
                    {/* <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart> */}
                </div>
            }</div>
        )
}
export default AdditionalStationInfo