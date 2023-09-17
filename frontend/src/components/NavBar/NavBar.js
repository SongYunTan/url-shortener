import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const userID = sessionStorage.getItem('id');

  const handleLogout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
  };

  return (
    <nav className="navBar">
      <img src="/logo-white.png" className="navBar-logo" />
      {userID === null ? (
        <Link to="/login" className="login-button">
          Log in/Sign up
        </Link>
      ) : (
        <Link to="/login" onClick={handleLogout} className="logout-button">
          Log out
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
