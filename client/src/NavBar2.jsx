import React from 'react';
import './NavBar2.css'; // Import the new CSS file

const NavBar2 = () => {
  return (
    <div className="container-fluid sidebar">
      <div className="profile-section">
        <div className="profile-circle">
          <i className="fas fa-user-circle fa-2x"></i> {/* Human icon */}
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

export default NavBar2;
