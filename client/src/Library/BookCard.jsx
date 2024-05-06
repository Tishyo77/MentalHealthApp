import React from 'react';
import "./BookCard.css";
import { Link } from 'react-router-dom';

const BookCard = ({ name, author, linkImage, linkBook }) => {
  return (
    <div className="book-card">
      <img src={linkImage} alt={name} />
      <div className="book-details">
        <h3>{name}</h3>
        <p>{author}</p>
        <Link to={linkBook} target="_blank" rel="noopener noreferrer">
          <button className='buton'>Read Book</button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;