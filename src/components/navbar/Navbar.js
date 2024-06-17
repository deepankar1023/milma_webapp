import React from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import "./Navbar.css"; // Import your CSS file for Navbar styling

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="navbar">
            <ul>
                <li className="options">
                    <IoPhonePortraitOutline />
                    <span>Get the App</span>
                </li>
                <li>Add Restaurant</li>
                {isLoggedIn ? (
                    <>
                        <li>Profile</li>
                        <li>Logout</li>
                    </>
                ) : (
                    <>
                        <li>LogIn</li>
                        <li>SignUp</li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
