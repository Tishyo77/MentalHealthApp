import React, { useEffect, useState } from 'react';
import './NavBar.css'; 
import apiClient from './Meditate/Spotify';

const NavBar = () => {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url);
    })
  }, [])

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
          <i className="fas fa-book"></i> {/* Read icon */}
        </div>
        <div className="sidebar-icon">
          <i className="fas fa-volume-up"></i> {/* Listen icon */}
        </div>
        <div className="sidebar-icon">
          <i className="fas fa-hand-holding-heart"></i> {/* Get Help icon */}
        </div>
        <div className="sidebar-icon">
          <i className="fas fa-flag-checkered"></i> {/* Challenges icon */}
        </div>

       


      </div>
      <div className="mt-auto">
        <i className="fas fa-sign-out-alt fa-flip-horizontal logout-icon red"></i>
      </div>
    </div>
  );
};

export default NavBar;
