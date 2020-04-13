import React from "react"
import ChangeSinceLoad from "./ChangeSinceLoad"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,ResponsiveContainer} from 'recharts';




function AdditionalStationInfo(props){
        // console.log(props.log)
        const chartData = props.showInfo[props.id] && props.log[props.id].map(log=>({
            "time":log.datetime.substring(log.datetime.length-5),"bikes":log.bikes
        })).slice(Math.max(props.log[props.id].length - 288, 0))

        const xTicks = chartData && chartData.map(log=>log.time).filter(time => time.substring(time.length-2) ==="00").concat(chartData.map(log=>log.time)[chartData.length-1])
        const yTicks =props.status && [0,10,20,30,40,50,60,70,80,90,100].filter(x=>x<props.status[props.id].docks).concat([props.status[props.id].docks])
        // [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]

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
                        
                        <CartesianGrid  stroke="#222222" />
                        <Line type="monotone" dataKey="bikes" stroke="#00deff" strokeWidth={5} />
                        <XAxis dataKey="time" ticks = {xTicks}/>
                        <YAxis  dataKey="bikes" domain={[0, props.status[props.id].docks]} ticks = {yTicks}/>
                        <Tooltip animationEasing = "linear"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }</div>
        )
}
export default AdditionalStationInfo