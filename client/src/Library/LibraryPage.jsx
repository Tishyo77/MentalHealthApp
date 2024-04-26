import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import BookCard from "./BookCard";
import DocViewer from 'react-doc-viewer';
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

    const openGoogleDrive = (link) => {
        window.open(link, "_blank");
    };

    return (
        <div className="library-page-container">
            <NavBar />
            <div className="library-page">
                <div className="nvbr">
                    <h1>Read</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Books"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="books-container">
                        {handleSearch().map(book => (
                            <BookCard
                                name={book.name}
                                author={book.author}
                                linkImage={book.linkImage}
                            />
                        ))}
                    </div>
                </div>
                <div className="google-drive-buttons">
                    <div>
                        <button onClick={() => openGoogleDrive("https://drive.google.com/file/d/1bffwaGirJgMd1hd26eqFSXjY2jzDVwJy/view?usp=drivesdk")}>The Art of Feeling Better</button>
                    </div>
                    <div className="gap"></div>
                    <div>
                        <button onClick={() => openGoogleDrive("https://drive.google.com/file/d/1wkebD44hW48DB_jBsIdWhLkXsROcoItU/view?usp=drive_link")}>50 Ways to Worry Less</button>
                    </div>
                </div>
            </div>
            {/* <App /> */}
        </div>
    );
};

export default LibraryPage;
