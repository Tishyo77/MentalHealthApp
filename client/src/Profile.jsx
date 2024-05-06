import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css";
import NavBar from './NavBar';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    // Fetch avatars from database
    axios.get('http://localhost:4000/avatarRoute/retrieve')
      .then(response => {
        setAvatars(response.data);
      })
      .catch(error => {
        console.error("Error fetching avatars:", error);
      });

    // Retrieve user email from local storage
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  // useEffect(() => {
  //   setAvatars(avatarData);
  // }, []);

  useEffect(() => {

    if (userEmail) {
      console.log(userEmail)
      // Fetch user details using the stored email
      axios.get(`http://localhost:4000/userRoute/retrieve?email=${userEmail}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [userEmail]);

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
  };


  // Handling deletion of the userDetails and User from the database at a same time using multiple axios.delete.
  const handleDeleteUser = () => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      axios.delete(`http://localhost:4000/userRoute/delete-user`, { data: { email: storedEmail } })
        .then(response => {

          console.log('User deleted successfully');
          axios.delete(`http://localhost:4000/detailsRoute/delete-details`, { data: { email: storedEmail } })
            .then(detailsResponse => {
              console.log('Details deleted successfully');
            })
            .catch(detailsError => {
              console.error('Error deleting details:', detailsError);
            });
        })
        .catch(userError => {
          console.error('Error deleting user:', userError);
        });
    } else {
      console.error('Email not found in localStorage');
    }
  };
  

  return (
    <div className="profile-page-container">
      <NavBar />
      <h1>hello</h1>
      <div className="profile-page">
        {userData && (
          <div>
            <h2>User Details</h2>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.name}</p>
            <p>Date: {userData.date}</p>
            <h3>Select Avatar</h3>
            <div className="avatar-container">
              {avatars.map(avatar => (
                <img
                  key={avatar.id}
                  src={avatar.link}
                  alt={`Avatar ${avatar.id}`}
                  className={`avatar ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar.id)}
                />
              ))}
            </div>
            <button onClick={handleDeleteUser}>{deleteConfirmation ? 'Confirm Delete' : 'Delete User'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
