import React from 'react';
import './MeditationPage.css'; 
import  NavBar  from './NavBar';
import Logo from './Images/SSLogo.png'; 
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const MeditationPage = () => {
  return (
    <div className="meditation-page">
        <NavBar />
    </div>
  );
};

export default MeditationPage;