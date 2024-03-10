import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DayQuote from './DayQuote';
import Reading from './Reading';
import FeelingPopup from './FeelingPopup';
import "./Dashboard.css";
import axios from 'axios';

const Dashboard = () => {
    const [showFeelingPopup, setShowFeelingPopup] = useState(false);
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
      const lastFetchedDate = localStorage.getItem('lastFetchedDate');
      const currentDate = new Date().toLocaleDateString();
  
      if (lastFetchedDate !== currentDate) 
        setShowFeelingPopup(true);

      const userEmail = localStorage.getItem('email');
      const token = localStorage.getItem('token');
      if (userEmail) 
      {
        axios.get(`http://localhost:4000/userRoute/retrieve?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUserName(response.data.name); 
        })
        .catch(error => {
          console.error("Error retrieving user information:", error);
        });
      }
    }, []);

    const handleFeelingPopupConfirm = () => {
        setShowFeelingPopup(false);
    };

    

    return (
        <div className="dashboard-container">
            <NavBar />
            <div className="dashboard-page flex">
                <div className="left-dash-body">
                    <div className="upper-half">
                        <div className="greeting-container">
                            <h1>Welcome to SerenitySync,</h1>
                            <h1>{userName}</h1>
                        </div>
                        <div className="qotd">
                            <DayQuote />
                        </div>
                    </div>
                </div>
                <div className="right-dash-body">
                    <div className="upper-half">
                        <div className="reading-now">
                            <Reading />
                        </div>
                    </div>
                </div>
            </div>
            {showFeelingPopup && <FeelingPopup onSelect={handleFeelingPopupConfirm} />}
        </div>
    );
};

export default Dashboard;
