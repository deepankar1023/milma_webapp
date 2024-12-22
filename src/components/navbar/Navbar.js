import React from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from '../../utils/auth';
import logo from "../assets/logo.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { clearToken } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="AlCheta Logo" className="w-10 h-10" width={40} height={40} />
            <span className="text-xl font-bold text-gray-900">Chowk</span>
          </Link>
          <nav className="hidden md:flex space-x-12">
            <Link to="/" className="text-lg font-semibold text-red-800 hover:text-gray-900">Home</Link>
            <Link to="/about" className="text-lg font-semibold text-gray-500 hover:text-gray-900">About</Link>
            <Link to="/contact" className="text-lg font-semibold text-gray-500 hover:text-gray-900">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => {
                    setIsLoggedIn(false);
                    clearToken();
                    toast.success("Logged Out");
                  }}
                >
                  Log Out
                </button>
                <Link to="/dashboard">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Dashboard
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

