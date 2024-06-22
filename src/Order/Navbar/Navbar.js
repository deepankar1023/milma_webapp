import React, { useState } from 'react';
import logo from "../../components/assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, totalCartValue, onAddressChange, cart }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  

  return (
    <header className="text-gray-600 body-font bg-gray-100">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="#" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <img src={logo} className="w-12 h-12" alt="Logo" />
          <span className="ml-3 text-xl">AlCheta</span>
        </a>
        <div className="flex-grow"></div>
        <div className="lg:w-2/5 inline-flex lg:justify-end items-center lg:ml-0">
          <button onClick={onAddressChange} className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-base mt-4 md:mt-0 mr-2">
            Change Address
          </button>
          <div className="relative">
            <button className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-base mt-4 md:mt-0 ml-2" onClick={toggleDropdown}>
              <i className="fas fa-shopping-cart text-white"></i>
              <span className="ml-2 text-white">{cartCount}</span>
              <span className="ml-2 text-white">Total: ${totalCartValue.toFixed(2)}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Shopping Cart</h3>
                {Object.keys(cart).length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  Object.keys(cart).map(productId => {
                    const item = cart[productId];
                    return (
                      <div key={productId} className="flex items-center mb-2">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="ml-2">
                          <p className="text-sm">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Total: ${item.quantity * parseFloat(item.product.price)}</p>
                        </div>
                      </div>
                    );
                  })
                )}
                <Link to="/cart" className="block text-center text-blue-500 mt-4">View All</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
