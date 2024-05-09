// Dashboard.js
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import DayQuote from './DayQuote';
import Reading from './Reading';
import Details from "./Details";
import FeelingPopup from './FeelingPopup';
import Graph from './Graph';
import "./Dashboard.css";
import axios from 'axios';

const Dashboard = () => {
  const [showFeelingPopup, setShowFeelingPopup] = useState(false);
  const [userName, setUserName] = useState("");
  const [lastReadBook, setLastReadBook] = useState({});

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const userEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if (userEmail) {
      axios.get(`http://localhost:4000/detailsRoute/get-last-read-book?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setLastReadBook(response.data);
      })
      .catch(error => {
        console.error("Error retrieving last read book:", error);
      });
    }
  }, []);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const userEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if (userEmail) {
      axios.get(`http://localhost:4000/userRoute/retrieve?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data.date !== currentDate) {
          setShowFeelingPopup(true);
          axios.post(
            `http://localhost:4000/userRoute/update-date`,
            { email: userEmail, date: currentDate },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(res => {})
          .catch(err => {
            console.error("Update date error:", err);
          });
        }
        const names = response.data.name.split(' ');
        const firstName = names.length > 0 ? names[0] : '';
        setUserName(firstName);
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
          <div className="bottom-left-half">
            <div className="graph">
              <Graph />
            </div>
          </div>
        </div>
        <div className="right-dash-body">
          <div className="upper-half">
            <div className="reading-now">
              <Reading lastReadBook={lastReadBook} />
            </div>
          </div>
          <div className="bottom-right-half">
            <div className="reading-now">
              <Details />
            </div>
          </div>
        </div>
      </div>
      {showFeelingPopup && <FeelingPopup onSelect={handleFeelingPopupConfirm} />}
    </div>
  );
};

export default Dashboard;
