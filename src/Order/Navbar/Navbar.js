import React, { useState, useEffect } from 'react';
import logo from "../../components/assets/logo.png";
import { Link } from 'react-router-dom';


const MenuNavbar = ({ cart, getTotalCartValue, onAddressChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const items = Object.values(cart);
    setCartItems(items);
    
  }, [cart]);

  return (
    <header className="text-gray-600 body-font bg-gray-100">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <img src={logo} className="w-12 h-12" alt="Logo" />
          <span className="ml-3 text-xl">AlCheta</span>
        </Link>
        <div className="flex-grow"></div>
        <div className="lg:w-2/5 inline-flex lg:justify-end items-center lg:ml-0">
          <button onClick={onAddressChange} className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-base mt-4 md:mt-0 mr-2">
            Change Address
          </button>
          <div className="relative">
            <button className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-base mt-4 md:mt-0 ml-2" onClick={toggleDropdown}>
              <i className="fas fa-shopping-cart text-white"></i>
              <span className="ml-2 text-white">{cartItems.length}</span>
              <span className="ml-2 text-white">Total: ${getTotalCartValue().toFixed(2)}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
                <h3 className="text-lg font-semibold mb-2">Shopping Cart</h3>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.product.id} className="flex items-center mb-2">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="ml-2">
                        <p className="text-sm">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Total: ${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                )}
                <Link to="/cart" className="block text-center text-blue-500 mt-4">View All
                
                </Link>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuNavbar;
