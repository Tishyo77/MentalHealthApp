import React from 'react';
import './Details.css';
import Logo from '../Images/SSLogo.png';

const Details = () => {
  return (
    <div className="details-container">
      <div className='logo'>
        <img src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Details;
