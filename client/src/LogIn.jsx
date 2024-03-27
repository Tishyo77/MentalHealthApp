// Import necessary modules and styles
import React, { useState } from 'react';
import './LogIn.css';
import axios from 'axios';
import logo from "./Images/SSLogo.png";
import { useNavigate } from 'react-router-dom';

// Create the Login component
export const LogIn = () => {
  const navigate = useNavigate();
  // State variables for email, password, and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Function to validate email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  // Function to validate password
  const validatePassword = () => {
    // Password must be at least 6 characters
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  // Event handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (emailError || passwordError) {
      setShowErrorPopup(true);
       return;
    }

    axios.post("http://localhost:4000/userRoute/login-user", {email, password})
        .then(result => 
        {
            const { data, token } = result.data;
            if(data === "Success")
            {
              localStorage.setItem('email', email);
              console.log("Logged In");
              localStorage.setItem('token', token);
              navigate('/dashboard');
            }
            else if(data === "Incorrect")
            {
              alert("Incorrect Password!");
            }
            else
            {
              alert("User does not exist!");
            }
        })
        .catch(err => console.log(err))
  };

  // Function to close the error popup
  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  // JSX structure for the login page
  return (
    <div className="login-container">
      <div className="background">
      <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="formContainer">
        <div className="inputContainer">
          <h2 className="h2CustomStyle">Welcome back!</h2>

          <label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
            />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Log In
          </button>

          <p style={{ textAlign: 'left', marginLeft: '15px', marginBottom: '20%', fontSize: '15px', fontFamily: "-moz-initial" }}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>

      {showErrorPopup && (
        <div className="errorPopup">
          <p>Please fix the following errors:</p>
          <ul>
            {emailError && <li>{emailError}</li>}
            {passwordError && <li>{passwordError}</li>}
          </ul>
          <br></br>
          <button className ="btn btn-primary" onClick={closeErrorPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LogIn;
