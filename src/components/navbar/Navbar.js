import React from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import "./Navbar.css"; // Import your CSS file for Navbar styling

const Navbar = ({ isLoggedIn,setIsLoggedIn }) => {
    return (
        <nav className="navbar">
            <ul>
                <li className="left">
                    <IoPhonePortraitOutline />
                    <span>Get the App</span>
                </li>
                <li className="right">Add Restaurant</li>
                {isLoggedIn ? (
                    <>
                        <li className="right">Profile</li>
                        <li className="right">Logout</li>
                    </>
                ) : (
                    <>
                        <li className="right">LogIn</li>
                        <li className="right">SignUp</li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
