import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ShortenURL from './pages/ShortenURL/ShortenURL';
import OriginalURL from './pages/OriginalURL/OriginalURL';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ShortenURL />} />
        <Route path="/:shortenedURL" element={<OriginalURL />} />
      </Routes>
    </div>
  );
}

export default App;
