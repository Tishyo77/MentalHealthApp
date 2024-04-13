import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import SpotifyLogin from './Meditate/SpotifyLogin';
import LandingPage from './LandingPage';
import SignUp from './SignUp'; 
import LogIn from './LogIn'; 
import Dashboard from './Dashboard/Dashboard';
import MeditationPage from './Meditate/MeditationPage';
import TherapistPage from './Therapist/TherapistPage';
import TherapistRegister from './Therapist/TherapistRegister';
import LibraryPage from './Library/LibraryPage';
import { setClientToken } from './Meditate/Spotify';

const App = () => {

  const [tokenSP, setTokenSP] = useState("");
  useEffect(() => {
    const tokenSP = window.localStorage.getItem("tokenSP");
    const hash = window.location.hash;
    window.location.hash = "";
    if(!tokenSP && hash)
    {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("tokenSP", _token);
      setTokenSP(_token);
      setClientToken(_token);
    }
    else
    {
      setTokenSP(tokenSP);
      setClientToken(tokenSP);
    }
  }, []);

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
        <Route path="/spotify" element={<SpotifyLogin />} />
        {hasJwt ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meditate" element={<MeditationPage />} />
        <Route path="/therapist" element={<TherapistPage />} />
        <Route path="/register-therapist" element={<TherapistRegister />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
