import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ChainCasa_Logo.png';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-brand">
        <img src={logo} alt="ChainCasa Logo" /> {/* Logo image */}
        <h1>ChainCasa</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;