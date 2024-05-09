import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import LandingPage from './LandingPage';
import SignUp from './SignUp'; 
import LogIn from './LogIn'; 
import Dashboard from './Dashboard/Dashboard';
import MeditatePage from './Meditation/MeditationPage';
import TherapistPage from './Therapist/TherapistPage';
import TherapistRegister from './Therapist/TherapistRegister';
import LibraryPage from './Library/LibraryPage';
import DiaryPage from './Diary/DiaryPage';
import Profile from './Profile';

const App = () => {

  const [jwtToken, setToken] = useState("");
  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");
    const hash = window.location.hash;

    if (!jwtToken && hash) 
    {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
    } 
    else if (jwtToken) 
    {
      setToken(jwtToken);
    }

  }, []);


  const [hasJwt, setHasJwt] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('token'); 
    setHasJwt(!!jwtToken); 
  }, []);


  return (
    <Router>
      <Routes>
        {hasJwt ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/therapist" element={<TherapistPage />} />
        <Route path="/register-therapist" element={<TherapistRegister />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/meditation" element={<MeditatePage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
