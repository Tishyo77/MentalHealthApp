import React, { useState } from 'react';
import "./FeelingPopup.css"; 
import axios from 'axios';

const FeelingPopup = ({ onSelect }) => {
  const [selectedFeeling, setSelectedFeeling] = useState('');

  const handleFeelingSelection = (feeling) => {
    setSelectedFeeling(feeling);
  };

  const userEmail = localStorage.getItem('email');

  const handleConfirm = () => {
    axios.post("http://localhost:4000/detailsRoute/add-feeling", {email: userEmail, feeling: selectedFeeling})
      .then(result =>
      {
        console.log("Feeling added");
      })
      .catch(err => console.log(err))

    onSelect(selectedFeeling);
  };

  return (
    <div className="feeling-popup-overlay">
      <div className="feeling-popup-container">
        <h2>How are you feeling today?</h2>
        <div className="feeling-options">
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Joyful' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Joyful')} />
              Joyful
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Calm' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Calm')} />
              Calm
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Neutral' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Neutral')} />
              Neutral
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Worried' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Worried')} />
              Worried
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Stressed' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Stressed')} />
              Stressed
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Lonely' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Lonely')} />
              Lonely
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Depressed' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Depressed')} />
              Depressed
            </label>
          </div>
        </div>
        <button onClick={handleConfirm} disabled={!selectedFeeling}>Confirm</button>
      </div>
    </div>
  );
};

export default FeelingPopup;
