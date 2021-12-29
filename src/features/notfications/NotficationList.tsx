import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllNotficationFn } from './notficationsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { formatDistanceToNow, parseISO} from 'date-fns';

const NotficationList = () => {
    const notfications = useSelector(selectAllNotficationFn);
    const users = useSelector(selectAllUsers);
    
    const renderNotfications = notfications.map(notfication => {
        const date = parseISO(notfication.date);
        const timeAgo = formatDistanceToNow(date);
        const userhasNotfication = users.find( user=> user.id === notfication.user ) || {
            name: 'Unknow User'
        }

        return (
            <div>
                <div>
                    <b> { userhasNotfication.name} </b>  {notfication.message}
                </div>
                <div>
                    <hr/>
                    <i> {timeAgo} ago </i>
                </div>
            </div>
        )
    })
    return (
        <div>
           <h1> Notfications </h1>
           <hr/>
           {renderNotfications} 
        </div>
    )
}

export default NotficationList
