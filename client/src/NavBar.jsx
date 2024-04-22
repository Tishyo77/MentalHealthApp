import React, { useEffect, useState } from 'react';
import './NavBar.css'; 
import apiClient from './Meditate/Spotify';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url);
    })
  }, [])

  const handleDropdownChange = (selectedOption) => {
    setShowDropdown(false); // Hide dropdown after selection
    // Handle the selected option
    console.log("Selected Option:", selectedOption);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    setShowDropdown(false);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="container-fluid sidebar">
      <div className="profile-section">
        <div className="profile-circle">
          <img src={image} className="profile-img" alt="profile" />
        </div>
      </div>
      
      <div className="icon-section">
        <Link to="/" className="sidebar-icon">
          <i className="fas fa-chart-line"></i> {/* Settings icon */}
        </Link>
        <Link to="/library" className="sidebar-icon">
          <i className="fas fa-book"></i> {/* Read icon */}
        </Link>
        <Link to="/meditation" className="sidebar-icon">
          <i className="fas fa-volume-up"></i> {/* Listen icon */}
        </Link>
        <Link to="/therapist" className="sidebar-icon">
          <i className="fas fa-hand-holding-heart"></i> {/* Get Help icon */}
        </Link>
        
        <div className="sidebar-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}><i className="fab fa-discord"></i></button>
            {showDropdown && (
              <div className="dropdown-content">
                <button onClick={() => handleDropdownChange("Serena 1")}>Serena 1.0</button>
                <button onClick={() => handleDropdownChange("Serena 2")}>Serena 2.0</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <i className="fas fa-sign-out-alt fa-flip-horizontal logout-icon red" onClick={handleLogout}></i>
      </div>
    </div>
  );
};

export default NavBar;
