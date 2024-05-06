import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
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
            return (therapist.city?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    therapist.address?.toLowerCase().includes(searchTerm.toLowerCase()));
        });
        return filteredTherapists;
    };

    return (
        <div className="therapist-page-container">
            <NavBar />
            <div className="therapist-page">
                <div className="nvbr">
                    <div>
                        <h1>Where Healing Begins</h1>
                        <h2>Explore Our Therapist Directory</h2>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter Locality or City"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className='list-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handleSearch().map(therapist => (
                                <tr key={therapist._id}>
                                    <td>{therapist.name}</td>
                                    <td>{therapist.email}</td>
                                    <td>{therapist.phone}</td>
                                    <td>{therapist.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TherapistPage;
