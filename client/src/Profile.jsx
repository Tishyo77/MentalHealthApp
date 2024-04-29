import React, { useState } from 'react';
import "./Profile.css";
import NavBar from './NavBar';

const Profile = ({ name, email, password }) => {

  return (
    <div className="profile-page-container">
      <NavBar />
      <div className="profile-page">
      </div>
    </div>
  );
};

export default Profile;
