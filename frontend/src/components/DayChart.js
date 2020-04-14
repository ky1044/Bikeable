import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,ResponsiveContainer,ReferenceLine,Label} from 'recharts';


class  DayChart extends React.Component{

    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return  nextProps.showInfo!==this.props.showInfo||nextProps.log!==this.props.log ;    
      }

    
    render(){
        
        let chartData = this.props.showInfo[this.props.id] && this.props.log[this.props.id] && this.props.log[this.props.id].map(log=>({
            "time":log.datetime.substring(log.datetime.length-5),
            "bikes":log.bikes
        })).slice(Math.max(this.props.log[this.props.id].length - 288, 0))

        let xTicks = chartData && chartData.map(log=>log.time).filter(time => time.substring(time.length-2) ==="00").concat(chartData.map(log=>log.time)[chartData.length-1])
        let yTicks =this.props.status && [0,10,20,30,40,50,60,70,80,90,100].filter(x=>x<this.props.status[this.props.id].docks).concat([this.props.status[this.props.id].docks])
        // [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
        return(
            <div>
                <h4 align ="center">bike count over past 24 hours</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart  data={chartData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                    
                    <CartesianGrid  stroke="#222222" />
                    <ReferenceLine x={"00:00"} stroke="#444444" label={<Label angle = {270} offset={10} value="midnight" position='insideLeft' style={{ textAnchor: 'middle', fontSize: '80%', fill: "#444444"}}/>}/>
                    <ReferenceLine x={"12:00"} stroke="#444444" label={<Label angle = {270} offset={10} value="noon" position='insideLeft' style={{ textAnchor: 'middle', fontSize: '80%', fill: "#444444"}}/>}/>
                    <Line dot = {false} isAnimationActive ={true}  type="monotone" dataKey="bikes" stroke="#00deff" strokeWidth={5} animationDuration={500}/>
                    <XAxis dataKey="time" ticks = {xTicks}/>
                    <YAxis  dataKey="bikes" domain={[0, this.props.status[this.props.id].docks]} ticks = {yTicks}/>
                    <Tooltip wrapperStyle = {{color:"black"}} itemStyle = {{color:"black"}} animationEasing = "ease"/>
                    </LineChart>
                </ResponsiveContainer>

            </div>
        )
    }
    }
export default DayChart