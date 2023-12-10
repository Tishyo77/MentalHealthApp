import React from 'react';
import './NavBar.css'; // You can style the navigation bar in a separate CSS file

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src="your-logo-url.png" // Replace with the URL or import your logo
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="navbar-right">
        <button className="profile-button">Profile</button>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
