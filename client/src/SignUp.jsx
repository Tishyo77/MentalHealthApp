import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const validateFullName = () => {
    if (fullName.length < 6) {
      setFullNameError('Name must be at least 6 characters');
    } else {
      setFullNameError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters and include at least one symbol, number, and uppercase letter');
    } else {
      setPasswordError('');
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFullName();
    validateEmail();
    validatePassword();

    if (fullNameError || emailError || passwordError) {
      setShowErrorPopup(true);
      return;
    }

    console.log('Submitted:', { fullName, email, password });

    navigate('/dashboard');
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="signup-container">
      <div className="background"></div>
      <div className="formContainer">
        <div className="inputContainer">
        <h2 className="h2CustomStyle">Hey, Hope You're Doing Great!</h2>
          <label>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </label>

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
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Create Account
          </button>

          <p style={{ textAlign: 'left',  marginLeft: '15px', marginBottom: '20%', fontSize: '15px', fontFamily: "-moz-initial" }}>
        Already have an account? <a href="/login">Log in</a>
        </p>

        </div>
      </div>

      {showErrorPopup && (
        <div className="errorPopup">
          <p>Please fix the following errors:</p>
          <ul>
            {fullNameError && <li>{fullNameError}</li>}
            {emailError && <li>{emailError}</li>}
            {passwordError && <li>{passwordError}</li>}
          </ul>
          <br></br>
          <button onClick={closeErrorPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
