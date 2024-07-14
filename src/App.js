import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePageBanner from './components/homepage/HomePageBanner';
import ProductList from './Order/ProductList.js/ProductList';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CartPage from './cart/Cartpage';
import MenuNavbar from "./Order/Navbar/Navbar";
import AddressForm from "./Order/Addressform/AddressForm";
import data from './data'; // Adjust the import path as necessary
import PaymentPage from './payment/PaymentPage';
import OrderConfirmPage from './payment/OrderConfirmPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [city, setCity] = useState('Varanasi');

  // State and functions for cart and address management
  const categories = ['Recommended', 'Biryanis', 'Indian', 'Tandoori', 'Chinese', 'Noodles & Fried Rice', 'Soups', 'Roti', 'Dessert'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState({});
  const [address, setAddress] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        newCart[product.id].quantity += quantity;
      } else {
        newCart[product.id] = { product, quantity };
      }
      return newCart;
    });
  };

  const getTotalCartValue = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

  const handleAddressChange = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
    setIsFormVisible(false);
  };

  const location = useLocation(); // Get the current location

  return (
    <>
    <Toaster position="top" reverseOrder={false} />
      {location.pathname === '/menu' && (
        <MenuNavbar
          cartCount={Object.keys(cart).length}
          totalCartValue={getTotalCartValue()}
          onAddressChange={handleAddressChange}
          cart={cart}
        />
      )}
      {isFormVisible && <AddressForm onSave={handleSaveAddress} />}
      {address && (
        <div>
          <h2>Address Details</h2>
          <p>{address.name}</p>
          <p>{address.street}</p>
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.zip}</p>
        </div>
      )}
      <Routes>
        <Route index element={<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city} />} />
        <Route path="/" element={<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/menu"
          element={
            <ProductList
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              cart={cart}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/checkout" element={<PaymentPage cart={cart}/>} />
        <Route path="/order-confirm" element={<OrderConfirmPage cart={cart} />} />
      </Routes>
    </>
  );
};

export default App;
