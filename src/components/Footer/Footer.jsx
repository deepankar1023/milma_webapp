import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between items-center mb-8">
                    <div className="text-3xl font-bold text-red-600 mb-4 sm:mb-0">Chowk</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    <div>
                        <h3 className="font-semibold text-red-600 mb-3">ABOUT Chowk</h3>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Who We Are</a>
                    </div>

                    <div>
                        <h3 className="font-semibold text-red-600 mb-3">TOMAVERSE</h3>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Tomato</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Feeding India</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Hyperpure</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Tomaland</a>
                    </div>

                    <div>
                        <h3 className="font-semibold text-red-600 mb-3">FOR RESTAURANTS</h3>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Partner With Us</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Apps For You</a>

                        <h3 className="font-semibold text-red-600 mt-6 mb-3">FOR ENTERPRISES</h3>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Tomato For Work</a>
                    </div>

                    <div>
                        <h3 className="font-semibold text-red-600 mb-3">LEARN MORE</h3>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Privacy</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Security</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Terms</a>
                        <a href="#" className="block text-black hover:text-red-600 mb-2">Sitemap</a>
                    </div>

                    <div>
                        <h3 className="font-semibold text-red-600 mb-3">SOCIAL LINKS</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="text-black hover:text-red-600">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="#" className="text-black hover:text-red-600">
                                <FaLinkedinIn size={24} />
                            </a>
                            <a href="#" className="text-black hover:text-red-600">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-black hover:text-red-600">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-black hover:text-red-600">
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-300" />

                <p className="text-sm text-black text-justify">
                    By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2022 © Tomato™ Ltd. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;

