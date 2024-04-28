import React, { useState } from 'react';
import axios from 'axios';
import "./TherapistRegister.css";
import logo from "../Images/SSLogo.png";

const TherapistRegister = () => {
    const [therapist, setTherapist] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        state: '',
        country: '',
        verification: '',
        approved: false,
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked.toString() : e.target.value;
        setTherapist({
            ...therapist,
            [e.target.name]: value,
        });
    };

    const isEmailValid = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };    

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        // Validation: Check if any field is empty
        if (!therapist.name || !therapist.email || !therapist.phone || !therapist.address || !therapist.state || !therapist.country || !therapist.verification) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
    
        // Validation: Check if email is valid
        if (!isEmailValid(therapist.email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
    
        const approvedBool = therapist.approved === 'true';
    
        axios.post('http://localhost:4000/therapistRoute/add-therapist', therapist)
            .then((response) => {
                console.log('Therapist added successfully:', response.data);
                alert('We will be verifying your application and adding you shortly!');
                // Reset the form fields and error message here
                setTherapist({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    state: '',
                    country: '',
                    verification: '',
                    approved: false, 
                });
                setErrorMessage('');
            })
            .catch((error) => {
                console.error('Error adding therapist:', error.message);
                window.alert('Error adding therapist. Please try again.');
            });
    };    
    
    return (
        <div className='therapist-container'>
            <div className="background">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className='formContainer'>
                <div className="inputContainer">
                    <h2 className='h2CustomStyle'>Start Helping Others!</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={therapist.name}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={therapist.email}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={therapist.phone}
                                onChange={handleInputChange}
                        />
                        </label>

                        <label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Full Address"
                                value={therapist.address}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={therapist.state}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={therapist.country}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                        <input
                                type="text"
                                name="verification"
                                placeholder="Verification Link"
                                value={therapist.verification}
                                onChange={handleInputChange}
                            />
                        </label>

                        {errorMessage && <p style={{ color: 'white', fontWeight: 'lighter' }}>{errorMessage}</p>}
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TherapistRegister;
