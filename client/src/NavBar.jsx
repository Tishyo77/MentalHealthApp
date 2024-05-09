import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import therapistIcon from './Icons/Therapist.png';
import meditateIcon from './Icons/Meditate.png';
import libraryIcon from './Icons/Library.png';
import diaryIcon from './Icons/Diary.png';
import dashIcon from './Icons/Dashboard.png';

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
          <div className='hover-box'>
          <img src={dashIcon} className="icon" alt="Dashboard" />
          </div>
        </Link>
        <Link to="/therapist" className="sidebar-icon">
        <div className='hover-box'>
          <img src={therapistIcon} className="icon" alt="Therapist" />
        </div>
        </Link>
        <Link to="/library" className="sidebar-icon">
        <div className='hover-box'>
          <img src={libraryIcon} className="icon" alt="Library" />
        </div>
        </Link>
        <Link to="/meditation" className="sidebar-icon">
        <div className='hover-box'>
          <img src={meditateIcon} className="icon" alt="Meditate" />
        </div>
        </Link>
        <Link to="/diary" className="sidebar-icon">
        <div className='hover-box'>
          <img src={diaryIcon} className="icon" alt="Diary" />
        </div>
        </Link>
      </div>
      <div className="mt-auto">
        <i className="fas fa-sign-out-alt fa-flip-horizontal logout-icon red" onClick={handleLogout}></i>
      </div>
    </div>
  );
};

export default NavBar;
