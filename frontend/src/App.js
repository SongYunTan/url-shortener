import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ShortenURL from './pages/ShortenURL/ShortenURL';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shortenURL" element={<ShortenURL />} />
      </Routes>
    </div>
  );
}

export default App;
