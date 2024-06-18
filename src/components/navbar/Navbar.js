import React from 'react';
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="navbar-container">
      <Link to="/">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>

      <nav>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="navbar-auth">
        {!isLoggedIn &&
          <Link to="/login">
            <button className="auth-button">
              Login
            </button>
          </Link>
        }
        {!isLoggedIn &&
          <Link to="/signup">
            <button className="auth-button">
              Sign Up
            </button>
          </Link>
        }
        {isLoggedIn &&
          <Link to="/">
            <button className="auth-button" onClick={() => {
              setIsLoggedIn(false);
              toast.success("Logged Out");
            }}>
              Log Out
            </button>
          </Link>
        }
        {isLoggedIn &&
          <Link to="/dashboard">
            <button className="auth-button">
              Dashboard
            </button>
          </Link>
        }
      </div>
    </div>
  );
}

export default Navbar;
