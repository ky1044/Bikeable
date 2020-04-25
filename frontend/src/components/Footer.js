import React from "react"

function Footer(props){
    return(
        <div className = "footer">
            {props.view==="Mobile" ?<div style={{height:30}} />: <div style={{height:5}}/>}
            {props.hasLoaded &&<p style={{textAlign: "center",color:"#313131",marginBottom:-10,padding:0}}>Made by Ken Yokokawa. Source code on <a href="https://github.com/ky1044/Bikeable" style={{color:"#313131"}}>Github</a>.</p>}
            {props.view==="Mobile" &&<div style={{height:5}} />}
        </div>    
    )
}
export default Footer