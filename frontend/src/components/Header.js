import React from "react"


const logo = require('./logo.png');

function Header(props){
	return(
    <div>
  
		  <div className = "header">
        
        <div style={{margin:"auto",alignContent:"center"}}>
          <p style={{textAlign: "center"}}>
          
          <img src ={logo} alt = "Bikeable" style = {{margin:"auto",padding:20,paddingBottom:16, align:"middle"}} width = "160px"/>
          </p>
          
        </div>
        
      </div>
     
    </div>
    )
}
export default Header