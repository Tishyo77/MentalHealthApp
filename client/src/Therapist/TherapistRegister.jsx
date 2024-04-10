import React, { useState } from 'react';
import axios from 'axios';
import "./TherapistRegister.css";

const TherapistRegister = () => {
    const [therapist, setTherapist] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        locality: '',
        city: '',
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const approvedBool = therapist.approved === 'true';

        axios.post('http://localhost:4000/therapistRoute/add-therapist', therapist)
            .then((response) => {
                console.log('Therapist added successfully:', response.data);
                window.alert('Therapist added successfully !');
                // Reset the form fields and error message here
                setTherapist({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    locality: '',
                    city: '',
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
    }
    return (
        <div>
            <div className='heading'>
                <h2>Therapist Registration</h2>
            </div>
            <div>
                <div className=' register-body'>
                    <div className="therapist-register-container">
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={therapist.name}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={therapist.email}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={therapist.phone}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={therapist.address}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="locality">Locality:</label>
                            <input
                                type="text"
                                name="locality"
                                value={therapist.locality}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                name="city"
                                value={therapist.city}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="state">State:</label>
                            <input
                                type="text"
                                name="state"
                                value={therapist.state}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="country">Country:</label>
                            <input
                                type="text"
                                name="country"
                                value={therapist.country}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="verification">Verification:</label>
                            <input
                                type="text"
                                name="verification"
                                value={therapist.verification}
                                onChange={handleInputChange}
                            />
                            {errorMessage && <p style={{ color: 'white', fontWeight: 'lighter' }}>{errorMessage}</p>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TherapistRegister;
