import React from "react"
import ChangeSinceLoad from "./ChangeSinceLoad"

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';
Boost(Highcharts);

function AdditionalStationInfo(props){
    const options = {
        chart: {
          type: 'spline',
          backgroundColor:"#1a1a1a",
        },
        
        title: {
          text: 'bike count since page was loaded'
        },
        yAxis: {
            title: {
                text: 'Bikes'
            }
        },
        series: [
            {
                data: [2,3,4,5,3,2,4],
                name: "Bikes at this station"
            }]
          
      };

    if (props.show){
        
        return(
            
            <div className = "additional-station-info">
                <hr style ={{borderColor:"#555555"}}/>
                <h4>Additional Info:</h4>
                <p style = {{color:"#aaaaaa"}}>Updated {parseInt(props.timeSinceUpdate/1000)} seconds ago. {ChangeSinceLoad(props.logBikeCount,props.timeSinceLoad)}</p>
                <HighchartsReact highcharts={Highcharts} options={options} />
                
            </div>
            

            )

    }else{
        return(<div></div>)
    }
}
export default AdditionalStationInfo