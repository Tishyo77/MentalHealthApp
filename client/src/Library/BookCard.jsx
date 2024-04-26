import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./BookCard.css";

const BookCard = ({ name, author, linkImage }) => {
    return (
        <div className="book-card-container">
            <h2>{name}</h2>
        </div>
    );
};

export default BookCard;
