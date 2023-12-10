import React, { useState } from 'react';
import './NavButton.css'; // You can style the button and menu in a separate CSS file

const NavButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-button-container">
      <button className="nav-button" onClick={toggleMenu}>
        Menu
      </button>
      {menuOpen && (
        <div className="menu">
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            {/* Add more menu options as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavButton;
