import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchNotfications } from '../features/notfications/notficationsSlice';
export const Navbar = () => {
  const dispatch = useDispatch();
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
          <Link to = '/notfications' style={{marginRight:"16px"}}> Notfications </Link>
          <button onClick={addNewNotfications}> Add New Notfications </button>
        </div>
      </section>
    </nav>
  )
}
