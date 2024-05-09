import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const [image, setImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const email = localStorage.getItem('email');
        if (email) {
          const response = await axios.get(`http://localhost:4000/detailsRoute/get-avatar/${email}`);
          setImage(response.data.avatar);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="container-fluid sidebar">
      <div className="profile-section">
        <Link to="/profile" className="profile-circle">
          <img src={image} className="profile-img" alt="profile" />
        </Link>
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
      </div>
      <div className="mt-auto">
        <i className="fas fa-sign-out-alt fa-flip-horizontal logout-icon red" onClick={handleLogout}></i>
      </div>
    </div>
  );
};

export default NavBar;