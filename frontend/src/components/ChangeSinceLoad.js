function ChangeSinceLoad(logBikeCount,timeSinceUpdate){
    // if ( logBikeCount == null){
    //     return ""
    // }
    const minutesAgo = parseInt(timeSinceUpdate/60000)
    let timeAgo = "0 minutes ago"
    if (minutesAgo===0){
        timeAgo = "just now."
    }else if (minutesAgo===1){
        timeAgo = "1 minute ago."
    }else{
        timeAgo = minutesAgo.toString()+" minutes ago."
    }
    if (logBikeCount.length>=1){
        let bikeChange = logBikeCount[logBikeCount.length-1]-logBikeCount[0]
        if (bikeChange===0){
            return "Number of bikes is same as when page was loaded "+timeAgo
        }else if (bikeChange>1){
            return bikeChange.toString()+" more bikes since page was loaded "+timeAgo
        }else if (bikeChange===1){
            return "1 more bike since page was loaded "+timeAgo
        }else if (bikeChange<-1){
            return (-bikeChange).toString()+" fewer bikes since page was loaded "+timeAgo
        }else if (bikeChange===-1){
            return "1 fewer bike since page was loaded "+timeAgo
        }
    }else{
        return""
    }
}
export default ChangeSinceLoad