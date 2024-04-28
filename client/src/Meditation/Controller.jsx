import React from 'react';
import './Controller.css';

const Controller = ({ onNext, onPrevious, onPauseToggle }) => {
    const handlePauseToggle = () => {
        onPauseToggle();
    };

    const handleNext = () => {
        onNext();
    };

    const handlePrevious = () => {
        onPrevious();
    };

    return (
        <div className="controller-container">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handlePauseToggle}>Pause/Play</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Controller;