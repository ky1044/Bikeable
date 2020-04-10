function ChangeSinceLoad(localhistory){
    if ( localhistory == null){
        return ""
    }
    if (localhistory.length>1){
        let bikeChange = localhistory[localhistory.length-1]-localhistory[0]
        if (bikeChange===0){
            return "Same number of bikes as when page was first loaded."
        }else if (bikeChange>1){
            return toString(bikeChange)+" more bikes since page was first loaded."
        }else if (bikeChange===1){
            return "1 more bike since page was first loaded."
        }else if (bikeChange<-1){
            return toString(-bikeChange)+" less bikes since page was first loaded."
        }else if (bikeChange===-1){
            return "1 less bikes since page was first loaded."
        }
    }else{
        return""
    }
}
export default ChangeSinceLoad