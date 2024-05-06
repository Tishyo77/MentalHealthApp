import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import BookCard from "./BookCard";
import "./LibraryPage.css";

const LibraryPage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/bookRoute/retrieve'); 
                setBooks(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const filteredBooks = books.filter(book => {
            return (book.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    book.author?.toLowerCase().includes(searchTerm.toLowerCase()));
        });
        return filteredBooks;
    };

    return (
        <div className="library-page-container">
            <NavBar />
            <div className="library-page">
                <div className="nvbr">
                    <div>
                        <h1>Unlock Your Best Self </h1>
                        <h2>Browse Our Self-Help Collection</h2>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter Title or Author"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                    <div className="books-container">
                        {handleSearch().map(book => (
                            <BookCard
                                name={book.name}
                                author={book.author}
                                linkImage={book.linkImage}
                                linkBook={book.linkBook} 
                            />
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default LibraryPage;
