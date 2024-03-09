import React from 'react';
import "./DayQuote.css";

const DayQuote = () => {
  return (
    <div className="dayquote-container">
        <div className="heading">
            <h4>Quote of the Day</h4>
        </div>
        <p className="quote">
            "Life has got all those twists and turns. You've got to hold on tight and off you go."
        </p>
        <p className="author">
            - Nicole Kidman
        </p>
    </div>
  );
};

export default DayQuote;