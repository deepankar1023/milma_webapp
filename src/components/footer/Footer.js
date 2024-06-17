import React from "react";
import "./Footer.css"; // Import your CSS file for Footer styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>ABOUT TOMATO</h3>
                <ul>
                    <li>Who We Are</li>
                    <li>Blog</li>
                    <li>Work With Us</li>
                    <li>Investor Relations</li>
                    <li>Report Fraud</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>TOMAVERSE</h3>
                <ul>
                    <li>Tomato</li>
                    <li>Feeding India</li>
                    <li>Hyperpure</li>
                    <li>Tomaland</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>FOR RESTAURANTS</h3>
                <ul>
                    <li>Partner With Us</li>
                    <li>Apps For You</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>FOR ENTERPRISES</h3>
                <ul>
                    <li>Tomato For Work</li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>LEARN MORE</h3>
                <ul>
                    <li>Privacy</li>
                    <li>Security</li>
                    <li>Terms</li>
                    <li>Sitemap</li>
                </ul>
            </div>
            <div className="footer-section social-media">
                <h3>Follow Us</h3>
                <ul>
                    <li>Privacy</li>
                    <li>Security</li>
                    <li>Terms</li>
                    <li>Sitemap</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
