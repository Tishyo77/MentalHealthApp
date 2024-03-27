import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import axios from 'axios';
import "./TherapistPage.css";

const TherapistPage = () => {
    return (
        <div className="therapist-page-container">
            <NavBar />
            <div className="therapist-page">
            </div>
        </div>
    );
};

export default TherapistPage;