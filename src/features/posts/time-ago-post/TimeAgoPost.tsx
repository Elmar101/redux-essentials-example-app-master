import React from 'react'
import {parseISO, formatDistanceToNow} from "date-fns"
interface Props {
    timeStamp?: Date | string;
}

const TimeAgoPost: React.FC<Props>= (props) => {
    const { timeStamp } = props
    let timeAgo: string = "";
    if(timeStamp){
        const date = parseISO(timeStamp as string);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = timePeriod + " ago";
    }
    return (
        <span>
            <span>  </span><i> { timeAgo ? timeAgo : "" }</i>
        </span>
    )
}

export default TimeAgoPost;

