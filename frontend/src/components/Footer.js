import React from "react"

function Footer(props){
    return(
        <div className = "footer">
            <div style={{height:50}} />
            {props.hasLoaded &&<p style={{textAlign: "center",color:"#313131",marginBottom:10}}>Made by Ken Yokokawa. Source code on <a href="https://github.com/ky1044/Bikeable" style={{color:"#313131"}}>Github</a>.</p>}
            <br/>
        </div>    
    )
}
export default Footer