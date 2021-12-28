import React from 'react'
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
        </div>
        
        <Link to = "/" style={{marginRight:"16px"}}> Posts List </Link>
        <Link to = "/users" > Users List </Link>
      </section>
    </nav>
  )
}
