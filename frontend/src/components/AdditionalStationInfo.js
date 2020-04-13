import React from "react"
import ChangeSinceLoad from "./ChangeSinceLoad"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,ResponsiveContainer} from 'recharts';




function AdditionalStationInfo(props){
        // console.log(props.log)
        const chartData = props.showInfo[props.id] && props.log[props.id].map(log=>({
            "time":log.datetime.substring(log.datetime.length-5),"bikes":log.bikes
        })).slice(Math.max(props.log[props.id].length - 288, 0))

        // const chartTime = chartData && chartData.map(log=>log.time).filter(time => time.substring(time.length-2) ==="00")
        

        return(
            <div>
            {props.showInfo[props.id] &&
                <div className = "additional-station-info">
                    <hr style ={{borderColor:"#555555"}}/>
                    <h4>Additional Info:</h4>
                    <p style = {{color:"#aaaaaa"}}>Updated {parseInt(props.timeSinceUpdate/1000)} seconds ago. {ChangeSinceLoad(props.logBikeCount[props.id],props.timeSinceLoad)}</p>
                    <br/>
                    <h4 align ="center">bike count over last day</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart  data={chartData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="bikes" stroke="#00deff" strokeWidth={5} />
                        <CartesianGrid  stroke="#555555" strokeDasharray="3 15" />
                        <XAxis dataKey="time" />
                        <YAxis  dataKey="bikes" domain={[0, props.status[props.id].docks]}/>
                        <Tooltip animationEasing = "linear"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }</div>
        )
}
export default AdditionalStationInfo