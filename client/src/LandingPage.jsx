import React from 'react';
import './LandingPage.css'; 
import Logo from './Images/SSLogo.png'; 
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="navbar">
        <div className="logo">
          <img src={Logo} alt="Your Logo" />
        </div>
        <Link to="/login" className="login-btn">
          Log In
        </Link>
      </div>

      <div className="content">
        <h1>Embrace Tranquility: <br></br> Nurturing Mental Wellness</h1>
        <br></br>
        <p>Welcome to SerenitySync, your dedicated companion on the journey to mental well-being. We understand the importance of maintaining a healthy mind in today's fast-paced world. SerenitySync is not just a mental health monitoring website; it's your sanctuary for tranquility. <br></br> <br></br> Immerse yourself in our curated collection of guided meditations, explore insightful self-help books, and engage with empowering podcasts, all designed to uplift and support your mental health. Our user-friendly platform seamlessly integrates mindfulness practices into your daily routine, helping you achieve a sense of balance and serenity. Join the SerenitySync community and embark on a path of self-discovery and mental wellness. Your peace of mind is just a click away.</p>
        <Link to="/signup" className="signup-btn">
          Embark on Serenity
        </Link>
        <Link to="/register-therapist" className="register-btn">
          Register as a Therapist
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
