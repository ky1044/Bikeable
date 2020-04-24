import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,ResponsiveContainer,ReferenceLine,Label,Dot} from 'recharts';


class  DayChart extends React.Component{

    shouldComponentUpdate(nextProps, nextState) {
        return  nextProps.showInfo!==this.props.showInfo||nextProps.dayLog!==this.props.dayLog ;    
      }

    
    render(){
        
        let chartData = this.props.showInfo[this.props.stationID] && this.props.dayLog[this.props.stationID] && this.props.dayLog[this.props.stationID].map(log=>({
            "time":log.datetime.substring(log.datetime.length-5),
            "bikes":log.bikes
        })).slice(Math.max(this.props.dayLog[this.props.stationID].length - 288, 0))

        let xTicks = chartData && chartData.map(log=>log.time).filter(time => time.substring(time.length-2) ==="00").concat(chartData.map(log=>log.time)[chartData.length-1])
        let yTicks =this.props.status && [0,10,20,30,40,50,60,70,80,90,100].filter(x=>x<this.props.status[this.props.stationID].docks).concat([this.props.status[this.props.stationID].docks])
        // [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]

        let timeNow = chartData && chartData.map(log=>log.time)[chartData.length-1]

        const CustomDot = (props) => {
            const {payload,cx,cy ,key} = props;
            return payload.time===timeNow&&<Dot key={key} cx={cx}cy={cy}r={5} fill="white"/>
        }
        return(
            <div>
                <h4 align ="center">bike count over past 24 hours (every 5 mins)</h4>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart  data={chartData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                    
                    <CartesianGrid  stroke="#222222" />
                    <ReferenceLine x={"00:00"} stroke="#444444" label={<Label angle = {270} offset={10} value="midnight" position='insideLeft' style={{ textAnchor: 'middle', fontSize: '80%', fill: "#444444"}}/>}/>
                    <ReferenceLine x={"12:00"} stroke="#444444" label={<Label angle = {270} offset={10} value="noon" position='insideLeft' style={{ textAnchor: 'middle', fontSize: '80%', fill: "#444444"}}/>}/>
                    <ReferenceLine x={timeNow} stroke="white" label={<Label angle = {270} offset={10} value="current time" position='insideLeft' style={{ textAnchor: 'middle', fontSize: '80%', fill: "#444444"}}/>}/>
                    <Line  dot = {CustomDot} isAnimationActive ={true}  type="monotone" dataKey="bikes" stroke="#00deff" strokeWidth={5} animationDuration={500}/>
                    <XAxis dataKey="time" ticks = {xTicks}/>
                    <YAxis  dataKey="bikes" domain={[0, this.props.status[this.props.stationID].docks]} ticks = {yTicks}/>
                    <Tooltip wrapperStyle = {{color:"black"}} itemStyle = {{color:"black"}} animationEasing = "ease"/>
                    </LineChart>
                </ResponsiveContainer>

            </div>
        )
    }
    }
export default DayChart