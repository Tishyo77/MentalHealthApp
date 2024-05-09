import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import "./DiaryPage.css";

const DiaryPage = () => {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editableEntryIndex, setEditableEntryIndex] = useState(-1); // Index of the entry being edited, -1 means no entry is being edited
    const [showTextarea, setShowTextarea] = useState(true); // State to control whether to show the textarea
    const [filteredEntries, setFilteredEntries] = useState(entries); // New state to store filtered entries

    useEffect(() => {
        const fetchEntries = async () => {
            const userEmail = localStorage.getItem('email');
            if (userEmail) {
                try {
                    const response = await axios.get(`http://localhost:4000/detailsRoute/find-entries?email=${userEmail}`);
                    setEntries(response.data.diary);
                    setFilteredEntries(response.data.diary); // Initialize filteredEntries with entries
                    // Check if there's an entry for today, if so, set it as editable
                    const today = new Date().toISOString().split('T')[0];
                    const todayEntryIndex = response.data.diary.findIndex(entry => entry.date === today);
                    if (todayEntryIndex !== -1) {
                        setEditableEntryIndex(todayEntryIndex);
                        setCurrentEntry(response.data.diary[todayEntryIndex].entry);
                        setShowTextarea(false); // Hide the textarea if an entry for today already exists
                    }
                } catch (error) {
                    console.error('Error fetching diary entries:', error.message);
                }
            }
        };

        fetchEntries();
    }, []);

    const handleSaveEntry = async () => {
        const userEmail = localStorage.getItem('email');
        if (userEmail && currentEntry.trim() !== "") {
            const currentDate = new Date().toISOString().split('T')[0];
            const newEntry = { date: currentDate, entry: currentEntry };
            
            try {
                if (editableEntryIndex !== -1) {
                    // If an entry for today already exists, update it
                    await axios.put(`http://localhost:4000/detailsRoute/edit-entry`, { email: userEmail, entry: newEntry });
                    setEntries(prevEntries => {
                        const updatedEntries = [...prevEntries];
                        updatedEntries[editableEntryIndex] = newEntry; // Update the entry in the state
                        return updatedEntries;
                    });
                } else {
                    // If no entry for today exists, add it
                    await axios.post(`http://localhost:4000/detailsRoute/add-entry`, { email: userEmail, entry: newEntry });
                    setEntries(prevEntries => [...prevEntries, newEntry]);
                }
                setCurrentEntry(""); 
                setEditableEntryIndex(-1);
                setShowTextarea(false); // Hide the textarea after saving the entry
            } catch (error) {
                console.error('Error saving diary entry:', error.message);
            }
        }
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term === '') {
            setFilteredEntries(entries);
        } else {
            const filtered = entries.filter((entry) =>
                entry.date.includes(term)
            );
            setFilteredEntries(filtered);
        }
    };
        

    return (
        <div className="diary-page-container">
            <NavBar />
            <div className="diary-page">
                <div className="nvbr">
                    <div>
                        <h1>Journey Within</h1>
                        <h2>Your Personal Diary</h2>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Enter Date"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                {showTextarea && (
                    <div className="current-entry">
                        <div className="diary-entry">
                        <div className="diary-header">
                            <h2>Dear Diary,</h2>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                        <textarea
                            value={currentEntry}
                            onChange={(e) => setCurrentEntry(e.target.value)}
                            placeholder="Write your entry..."
                        />
                        <button className='buton-save' onClick={handleSaveEntry}>Save Entry</button>
                        </div>
                    </div>
                )}
                <div className="entries">
                    {filteredEntries
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(({ date, entry }, index) => (
                            <div key={index} className="entry">
                                <p>{date}</p>
                                <p>{entry}</p>
                                {new Date(date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0] && (
                                    <button className="buton-edit" onClick={() => {
                                        setCurrentEntry(entry);
                                        setEditableEntryIndex(index);
                                        setShowTextarea(true); // Show the textarea when editing the current day's entry
                                    }}>Edit</button>
                                )}
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
};

export default DiaryPage;