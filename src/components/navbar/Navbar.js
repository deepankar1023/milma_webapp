import React from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from '../../utils/auth'; // Import useAuth
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { clearToken } = useAuth(); // Get the clearToken function from useAuth

  return (
    <header className="text-gray-600 body-font" style={{ backgroundColor: '#FFF59D' }}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="w-20 h-20 text-white p-2" width={40} height={40} loading="lazy" />
          <span className="ml-3 text-xl">AlCheta</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
          <Link to="/about" className="mr-5 hover:text-gray-900">About</Link>
          <Link to="/contact" className="mr-5 hover:text-gray-900">Contact</Link>
        </nav>
        <div className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <button className="auth-button mr-2">Login</button>
              </Link>
              <Link to="/signup">
                <button className="auth-button">Sign Up</button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <button
                className="auth-button mr-2"
                onClick={() => {
                  setIsLoggedIn(false);
                  clearToken(); // Clear the token from localStorage
                  toast.success("Logged Out");
                }}
              >
                Log Out
              </button>
              <Link to="/dashboard">
                <button className="auth-button">Dashboard</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
