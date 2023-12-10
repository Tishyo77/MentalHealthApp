import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="menu">
      <Link to="/signup" className="sign-up-button">Sign Up</Link>
      <Link to="/login" className="log-in-button">Log In</Link>
    </div>
  );
};

export default LandingPage;
