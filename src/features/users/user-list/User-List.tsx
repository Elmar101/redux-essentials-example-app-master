import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from '../usersSlice';
import { User } from '../userType';
interface Props {}
const UserList: React.FC<Props> = (props) => {
    const users = useSelector(selectAllUsers);

    const renderUsers = users.map((user:User)=> (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>id: {user.id}  <span> | </span> <b> User Name :  {user.name} </b></Link>
        </li>
    ))
    return (
        <div>
           <h2> Users List </h2> 
           {renderUsers}
        </div>
    )
}

export default UserList
