import React from "react";
import Navbar from "../navbar/Navbar";
import "./styles.css";


const HomePageBanner = ({ isLoggedIn, setIsLoggedIn, city }) => {
    return (
        <div className="homepage-banner">
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="brandname">
                <p className="zomato-text">Zomato</p>
                <hr className="separator" />
            </div>
            <div className="banner">
                <p>Discover the best Foods and drinks in</p>
                <span>{city}</span>
                
            </div>
        </div>
    );
};

export default HomePageBanner;
