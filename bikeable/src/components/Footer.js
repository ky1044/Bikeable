import React from "react"

function Footer(props){
    if (props.loaded){
        return(

            <div className = "foodster">
                <div style={{margin:"auto",alignContent:"center"}}>
        
                <p style={{textAlign: "center",color:"#313131"}}>Made by Ken Yokokawa. Source code on <a href="https://github.com/ky1044/Bikeable" style={{color:"#313131"}}>Github</a>.</p>
                <br/>
                </div>
            </div>
        
        
            )
    }
    else{
        return(
            <h2 style={{textAlign: "center"}}><br/>Loading...</h2>
        )
    }
	
}
export default Footer