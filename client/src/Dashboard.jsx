import React from 'react';
import  NavBar  from './NavBar';
import DayQuote from './DayQuote';
import Reading from './Reading';
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="dashboard-page flex">
        <div className="left-dash-body">
          <div className="upper-half">
            <div className="greeting-container">
              <h1>Welcome to SerenitySync,</h1>
              <h1>Tishyo!</h1>
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
    </div>
  );
};

export default Dashboard;
