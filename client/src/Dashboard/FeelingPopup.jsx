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
            <label className={`feeling-option-label ${selectedFeeling === 'Thriving' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Thriving')} />
              Thriving
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Flourishing' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Flourishing')} />
              Flourishing
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Stable' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Stable')} />
              Stable
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Struggling' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Struggling')} />
              Struggling
            </label>
          </div>
          <div className="feeling-option">
            <label className={`feeling-option-label ${selectedFeeling === 'Distressed' ? 'selected' : ''}`}>
              <input type="radio" name="feeling" onChange={() => handleFeelingSelection('Distressed')} />
              Distressed
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
