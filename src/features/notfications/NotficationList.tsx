import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { allNotficationsRead, selectAllNotficationFn } from './notficationsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { formatDistanceToNow, parseISO} from 'date-fns';

const NotficationList = () => {
    const dispatch = useDispatch();
    const notfications = useSelector(selectAllNotficationFn);
    const users = useSelector(selectAllUsers);
    useEffect(()=>{
        dispatch(allNotficationsRead())
    })
    const renderNotfications = notfications.map(notfication => {
        const date = parseISO(notfication.date);
        const timeAgo = formatDistanceToNow(date);
        const userhasNotfication = users.find( user=> user.id === notfication.user ) || {
            name: 'Unknow User'
        }

        return (
            <div style={{background: notfication.isNew ? 'blue' : ''}}>
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
