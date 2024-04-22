import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import logo from "./Images/SSLogo.png";
import axios from 'axios';

export const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
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

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFullName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (fullNameError || emailError || passwordError || confirmPasswordError) {
      setShowErrorPopup(true);
      return;
    }

    let userExists = 0;

    axios.get(`http://localhost:4000/userRoute/retrieve?email=${email}`)
        .then((userExistsResponse) => 
        {
            if (userExistsResponse.status === 200) 
            {
                alert("Email already in use!");
                userExists = 1;
            }
        })
        .catch((error) => 
        {
            
        })
        .then(() => 
        {
          if(!userExists)
          {
            const data = { email: email, password: password, name: fullName, date: "NULL" };

            axios.post("http://localhost:4000/userRoute/create-user", data)
                .then((createUserResponse) => 
                {
                    if (createUserResponse.status === 200) 
                    {
                        alert("Account Created!");
                    }  
                    else 
                    {
                        alert("Failed to create account");
                    }

                    axios.post("http://localhost:4000/detailsRoute/add-user", { email: email, feelings: [], diary: [{ date: "", entry: "" }]})
                      .then(result =>
                      {
                      })
                      .catch(err => console.log(err))
                })
                .catch((error) => 
                {
                    console.error("Error creating account:", error);
                    alert("Error creating account");
                });
            }
        });
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="signup-container">
      <div className="background">
      <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="formContainer">
        <div className="inputContainer">
        <h2 className="h2CustomStyle">Hey, Hope You're Doing Great!</h2>
          <label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </label>

          <label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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

          <label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
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
            {confirmPasswordError && <li>{confirmPasswordError}</li>}
          </ul>
          <br></br>
          <button onClick={closeErrorPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
