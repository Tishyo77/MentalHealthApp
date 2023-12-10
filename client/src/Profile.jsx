import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ name, email, password }) => {
  const [editMode, setEditMode] = useState(null);

  const containerStyle = {
    width: '50%', // Decreased width for a smaller rectangle
    margin: 'auto',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // 90% transparent white
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  };

  const startEditMode = (field) => {
    setEditMode(field);
  };

  const saveField = () => {
    setEditMode(null);
  };

  const labelStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '298px',
  
  };

  const underlineStyle = {
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
    paddingBottom: '5px',
    fontSize: '16px',
    display: 'inline-block',
    margin: '0 4px 0 0',
  };

  const editButtonStyle = {
    borderRadius: '12px',
    marginLeft: 'auto', // Adjusted to place the edit buttons on the opposite side
    background: 'transparent',
    color: 'black',
    borderRadius: '11px',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
    opacity: 0.8,
  };

  return (
    <div className="container" style={containerStyle}>
      <h2>
        {editMode === 'name' ? (
          <input type="text" value={name} onChange={(e) => console.log(e.target.value)} />
        ) : (
          <>
            <span style={labelStyle}>Name:</span>
            <button
              className="btn btn-info"
              style={editButtonStyle}
              onClick={() => startEditMode('name')}
            >
              Edit
            </button>
          </>
        )}
        {editMode === 'name' && (
          <button className="btn btn-info" style={editButtonStyle} onClick={saveField}>
            Save
          </button>
        )}
      </h2>
      <p style={underlineStyle} className="mb-3">
        {editMode === 'email' ? (
          <input type="text" value={email} onChange={(e) => console.log(e.target.value)} />
        ) : (
          <>
            <span style={labelStyle}>Email:</span>
            <button
              className="btn btn-info"
              style={editButtonStyle}
              onClick={() => startEditMode('email')}
            >
              Edit
            </button>
          </>
        )}
        {editMode === 'email' && (
          <button className="btn btn-info" style={editButtonStyle} onClick={saveField}>
            Save
          </button>
        )}
      </p>
      <p style={underlineStyle} className="mb-3">
        {editMode === 'password' ? (
          <input type="text" value={password} onChange={(e) => console.log(e.target.value)} />
        ) : (
          <>
            <span style={labelStyle}>Password:</span>
            <button
              className="btn btn-info"
              style={editButtonStyle}
              onClick={() => startEditMode('password')}
            >
              Edit
            </button>
          </>
        )}
        {editMode === 'password' && (
          <button className="btn btn-info" style={editButtonStyle} onClick={saveField}>
            Save
          </button>
        )}
      </p>
    </div>
  );
};

export default Profile;
