import React from 'react';
import './Controller.css';
import pauseIcon from '../Icons/Pause.png';
import nextIcon from '../Icons/Next.png';
import previousIcon from '../Icons/Previous.png';

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
            <button onClick={handlePrevious}>
                <img src={previousIcon} alt="Previous" />
            </button>
            <button onClick={handlePauseToggle}>
                <img src={pauseIcon} alt="Pause/Play" />
            </button>
            <button onClick={handleNext}>
                <img src={nextIcon} alt="Next" />
            </button>
        </div>
    );
};

export default Controller;
