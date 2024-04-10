import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./TherapistPage.css";

const TherapistPage = () => {
    const [therapists, setTherapists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const response = await axios.get('http://localhost:4000/therapistRoute/details');
                setTherapists(response.data);
            } catch (error) {
                console.error('Error fetching therapists:', error.message);
            }
        };

        fetchTherapists(); // Call the function to fetch therapists
    }, []); // Empty dependency array to run effect only once on component mount

    const handleSearch = () => {
        // Filter therapists based on search term (city or area)
        const filteredTherapists = therapists.filter(therapist => {
            return therapist.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   therapist.locality.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return filteredTherapists;
    };

    return (
        <div className="therapist-page-container">
            <div className="nvbr">
                <div className="heading">Therapist Search</div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by city or area"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="therapist-page">

                <ul>
                    {handleSearch().map(therapist => (
                        <li key={therapist._id}>
                            <h2>{therapist.name}</h2>
                            <p>Email: {therapist.email}</p>
                            <p>Phone: {therapist.phone}</p>
                            <p>Address: {therapist.address}</p>
                            <p>Locality: {therapist.locality}</p>
                            <p>City: {therapist.city}</p>
                            <p>State: {therapist.state}</p>
                            <p>Country: {therapist.country}</p>
                            <p>Verification: {therapist.verification}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TherapistPage;
