// Reading.js
import React from 'react';
import "./Reading.css";

const MAX_NAME_LENGTH = 35; // Maximum length for book name
const MAX_AUTHOR_LENGTH = 20; // Maximum length for author name

const Reading = ({ lastReadBook }) => {
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="reading-container">
      {Object.keys(lastReadBook).length > 0 ? (
        <div>
          <img src={lastReadBook.linkImage} alt="Book Cover" />
          <h5>{shortenText(lastReadBook.name, MAX_NAME_LENGTH)}</h5>
          <p>Author: {shortenText(lastReadBook.author, MAX_AUTHOR_LENGTH)}</p>
          <a href={lastReadBook.linkBook} target="_blank" rel="noopener noreferrer">Continue Reading</a>
        </div>
      ) : (
        <div>
        <h1>Visit our Library</h1>
        <h1>and</h1>
        <h1>Start Reading Now!</h1>
        </div>
      )}
    </div>
  );
};

export default Reading;
