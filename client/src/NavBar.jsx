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

  
  const handleDropdownChange = () => {

    setShowDropdown(false); // Hide dropdown after selection
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

  return (
    <div className="container-fluid sidebar">
      <div className="profile-section">
        <div className="profile-circle">
          {/* <i className="fas fa-user-circle fa-2x"></i> */}
          <img src={image} className="profile-img" alt="profile" />
        </div>
      </div>
      
      <div className="icon-section">
      <div className="sidebar-icon">
          <i className="fas fa-chart-line"></i> {/* Settings icon */}
        </div>
        <div className="sidebar-icon">
          <i className="fas fa-book"></i> {/* Read icon */}
        </div>
        <div className="sidebar-icon">
          <i className="fas fa-volume-up"></i> {/* Listen icon */}
        </div>
        <div className="sidebar-icon">
          <i className="fas fa-hand-holding-heart"></i> {/* Get Help icon */}
        </div>
        
        <div className="sidebar-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}><i className="fab fa-discord"></i></button>
            {showDropdown && (
              <div className="dropdown-content">
                <a href="#" onClick={() => handleDropdownChange("Serena 1")}>Serena 1.0</a>
                <a href="#" onClick={() => handleDropdownChange("Serena 2")}>Serena 2.0</a>
              </div>
            )}
          </div>
        </div>

       


      </div>
      <div className="mt-auto">
        <i className="fas fa-sign-out-alt fa-flip-horizontal logout-icon red"></i>
      </div>
    </div>
  );
};

export default NavBar;
