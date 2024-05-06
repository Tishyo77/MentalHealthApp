import React, { useEffect, useState } from 'react';
import "./BookCard.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ name, author, linkImage, linkBook }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleReadBook = async () => {
    try {
      await axios.post('http://localhost:4000/detailsRoute/update-last-read-book', {
        email,
        name,
        author,
        linkImage,
        linkBook
      });
      // Optionally, you can display a success message or perform additional actions
    } catch (error) {
      console.error('Error updating last read book:', error);
      // Handle the error case
    }
  };

  return (
    <div className="book-card">
      <img src={linkImage} alt={name} />
      <div className="book-details">
        <h3>{name}</h3>
        <p>{author}</p>
        <Link to={linkBook} target="_blank" rel="noopener noreferrer" onClick={handleReadBook}>
          <button className='buton'>Read Book</button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;