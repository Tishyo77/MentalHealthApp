import React, { useEffect, useState } from 'react';
import './DayQuote.css';

const DayQuote = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    const fetchRandomQuote = async () => {
      let newQuote = { content: '', author: '' };

      while (newQuote.content.length > 101 || newQuote.content.length === 0) {
        try {
          const response = await fetch('https://api.quotable.io/random');
          const data = await response.json();
          newQuote = {
            content: data.content,
            author: data.author,
          };
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      // Store the new quote and the current date in local storage
      localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
      localStorage.setItem('lastFetchedDate', new Date().toLocaleDateString());

      setQuote(newQuote);
    };

    // Check if a quote has been stored for today
    const storedDate = localStorage.getItem('lastFetchedDate');
    if (storedDate === new Date().toLocaleDateString()) {
      const storedQuote = JSON.parse(localStorage.getItem('dailyQuote') || '{}');
      setQuote(storedQuote);
    } else {
      // If not, fetch a new quote
      fetchRandomQuote();
    }
  }, []);

  return (
    <div className="dayquote-container">
      <div className="heading">
        <h4>Quote of the Day</h4>
      </div>
      <p className="quote">{quote.content}</p>
      <p className="author">- {quote.author}</p>
    </div>
  );
};

export default DayQuote;
