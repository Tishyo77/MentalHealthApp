import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import SpotifyLogin from './SpotifyLogin';
import LandingPage from './LandingPage';
import SignUp from './SignUp'; 
import LogIn from './LogIn'; 
import Dashboard from './Dashboard';
import MeditationPage from './MeditationPage';
import Playlists from './Playlists';
import { setClientToken } from './Spotify';


const App = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if(!token && hash)
    {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    }
    else
    {
      setToken(token);
      setClientToken(token);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/spotify" element={<SpotifyLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/meditate" element={<MeditationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
