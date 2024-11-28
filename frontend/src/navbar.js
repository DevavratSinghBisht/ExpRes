import React from 'react';
import './navbar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar" style={{boxShadow:"1px 5px 20px #1F4287"}}>
      <div className="navbar-container" >
        <h1 className="navbar-logo" style={{padding: "5px", marginLeft:"25px", fontSize:"38px"}}>
          <a href="./home" style={{color:"whitesmoke", textDecoration:"none"}}>ExpRes</a></h1>
        <ul className="navbar-links">
          <li><a href="./home">Home</a></li>
          <li><a href="./about">About</a></li>
          <li><a href="./login">Login</a></li>
          <li><a href="./signup">Sign Up</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
