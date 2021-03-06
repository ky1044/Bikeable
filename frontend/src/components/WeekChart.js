import React from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,ResponsiveContainer,ReferenceLine,Label,Dot} from 'recharts';


class  WeekChart extends React.Component{

    constructor(props) {
        super(props);
        this.makeDayArray = this.makeDayArray.bind(this)
    }


    makeDayArray(array){
        return array.map((numBikes, index)=>{
            if (numBikes===-1){
                return {"time":this.props.weekLog[this.props.stationID]["times"][index],"bikes":undefined}
            }else{
                return {"time":this.props.weekLog[this.props.stationID]["times"][index],"bikes":numBikes}

            }
        }).filter( time=>time!==undefined)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return  nextProps.showInfo!==this.props.showInfo||nextProps.weekLog!==this.props.weekLog ;    
      }

    
    render(){
        let chartData = [
            
            {
                name:"Monday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesMonday"])
            },
            {
                name:"Tuesday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesTuesday"])
            },
            {
                name:"Wednesday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesWednesday"])
            },
            {
                name:"Thursday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesThursday"])
            },
            {
                name:"Friday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesFriday"])
            },
            {
                name:"Saturday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesSaturday"])
            },
            {
                name:"Sunday",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesSunday"])
            },
            {
                name:"Today",
                data:this.makeDayArray(this.props.weekLog[this.props.stationID]["bikesToday"])
            }

        ]
        
        


        


        let xTicks = chartData && this.props.weekLog[this.props.stationID]["times"].filter(time => time.substring(time.length-2) ==="00").concat(chartData.map(log=>log.time)[chartData.length-1])
        let yTicks =this.props.status && [0,10,20,30,40,50,60,70,80,90,100].filter(x=>x<this.props.status[this.props.stationID].docks).concat([this.props.status[this.props.stationID].docks])

        let times = chartData&&chartData[7]["data"].filter(a=>a!==undefined).filter(a=>a["bikes"]!==undefined)

        let timeNow = times[times.length-1]["time"]

        const CustomDot = (props) => {
            const {payload,cx,cy ,key} = props;
            return payload.time===timeNow&&<Dot key={key} cx={cx}cy={cy}r={5} fill="white"/>
        }
        

        return(
            <div>
                <h4 align ="center">bike count of past week (every 30 mins)</h4>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart  data={chartData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
                    
                    <CartesianGrid  stroke="#222222" />
                    <ReferenceLine x={timeNow} stroke="white" label={<Label angle = {270} offset={10} value="current time" position='insideLeft' style={{ textAnchor: 'middle', fontSize: '80%', fill: "#444444"}}/>}/>
                    <XAxis dataKey="time" allowDuplicatedCategory={false} ticks ={xTicks}/>
                    <YAxis  dataKey="bikes" domain={[0, this.props.status[this.props.stationID].docks]} ticks = {yTicks}/>
                    {chartData.map(s => (
                        <Line dataKey="bikes" data={s.data} name={s.name} key={s.name} dot = {s.name==="Today"&&CustomDot} isAnimationActive ={true}  type="monotone" stroke="#00deff" strokeWidth={s.name==="Today"?5:4} animationDuration={500} opacity={s.name==="Today"?1:0.5} />
                    ))}
                    <Tooltip wrapperStyle = {{color:"black"}} itemStyle = {{color:"black",fontSize:12,marginTop:-7,marginBottom:-7,lineHeight:-5}} animationEasing = "ease"/>
                    </LineChart>
                </ResponsiveContainer>

            </div>
        )
    }
    }
export default WeekChart