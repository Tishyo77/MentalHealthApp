import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import NavBar from './NavBar';
import avatarPaths from './Avatars'; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPictureOptions, setShowPictureOptions] = useState(false);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetchUser(email);
      fetchPictures();
    }
  }, []);

  const fetchUser = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/userRoute/retrieve?email=${email}`);
      setUser(response.data);
  
      // Fetch the user's avatar from the details collection
      const avatarResponse = await axios.get(`http://localhost:4000/detailsRoute/get-avatar/${email}`);
      setProfilePicture(avatarResponse.data.avatar);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  const handleProfilePictureChange = async (pictureUrl) => {
    try {
      if (user && user.email) {
        await axios.patch(`http://localhost:4000/detailsRoute/update-avatar/${user.email}`, { avatar: pictureUrl });
        setShowPictureOptions(false);
  
        // Fetch the updated avatar URL from the details collection
        const response = await axios.get(`http://localhost:4000/detailsRoute/get-avatar/${user.email}`);
        setProfilePicture(response.data.avatar);
      } else {
        console.error('User email not found');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  const fetchPictures = () => {
    setPictures(avatarPaths.map((path, index) => ({ id: index + 1, url: path })));
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      try {
        await axios.delete('http://localhost:4000/userRoute/delete-user', { data: { email: user.email } });
        await axios.delete('http://localhost:4000/detailsRoute/delete-details', { data: { email: user.email } });
        alert('Account deleted successfully');
        // Perform any additional cleanup, such as clearing local storage and redirecting to the home page
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  return (
    <div className="profile-page-container">
      <NavBar />
      <div className="profile-page">
        {user ? (
          <>
            <div className="profile-picture-container">
              <img
                src={profilePicture || '/default-profile-picture.jpg'}
                alt="Profile"
                className="profile-picture"
              />
              <button
                className="edit-picture-button"
                onClick={() => setShowPictureOptions(!showPictureOptions)}
              >
                Edit
              </button>
              {showPictureOptions && (
                <div className="picture-options">
                  {pictures.map((picture) => (
                    <img
                      key={picture.id}
                      src={picture.url}
                      alt={`Avatar ${picture.id}`}
                      onClick={() => handleProfilePictureChange(picture.url)}
                    />
                  ))}
              </div>
              )}
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;