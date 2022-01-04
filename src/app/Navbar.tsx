import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotfications, selectAllNotficationFn } from '../features/notfications/notficationsSlice';
export const Navbar = () => {
  const dispatch = useDispatch();
  const allNotfications = useSelector(selectAllNotficationFn);
  const countOfUnReadNotfications = allNotfications.filter(notfications => !notfications.read);
  let doNotReadNotfications: JSX.Element | undefined;
  if(countOfUnReadNotfications.length > 0){
    doNotReadNotfications = (
      <span style={{color: 'red'}}>{countOfUnReadNotfications.length}</span>
    )
  }
  const addNewNotfications = () => {
    dispatch(fetchNotfications());
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
        </div>
        <div>
          <Link to = "/" style={{marginRight:"16px"}}> Posts List </Link>
          <Link to = "/users" style={{marginRight:"16px"}}> Users List </Link>
          <Link to = '/notfications' style={{marginRight:"16px"}}> Notfications {doNotReadNotfications} </Link>
          <button onClick={addNewNotfications}> Add New Notfications </button>
        </div>
      </section>
    </nav>
  )
}
