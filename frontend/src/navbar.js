import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar" style={{ boxShadow: "1px 5px 20px #1F4287" }}>
      <div className="navbar-container">
        <h1
          className="navbar-logo"
          style={{ padding: "5px", marginLeft: "25px", fontSize: "38px" }}
        >
          <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>
            ExpRes
          </Link>
        </h1>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li><a href="/posts">Post</a></li>
          <li>
            <Link to="/ChatApp">ExpRes Chat</Link>
          </li>
          <li>
            <Link to="/FriendSearch"> Search Friend</Link>
          </li>
          <li>
            <Link to="/ProfilePage"> Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/RegistrationForm">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;