import React, { useState } from 'react';
import css from './App.module.css'
import { Route, Routes } from "react-router-dom";

import HomePageBanner from './components/homepage/HomePageBanner';



import ProductList from './Order/ProductList.js/ProductList';
import Contact from './components/Contact/Contact';
import About from "./components/About/About";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./components/Dashboard/Dashboard"


const App =() => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [city,setCity] = useState('Varanasi')

    const [cart, setCart] = useState({});

  // Function to add to cart
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

  // Function to calculate total cart value
  const getTotalCartValue = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

    return (
       <>
       
        
        <Routes>
            <Route index element= {<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city}/>} />
            <Route path="/about" element = {<About/>} />
            <Route path="/contact" element = {<Contact/>} />
            <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path="/menu" element = {<ProductList addToCart={addToCart} cart={cart} />} />
        </Routes>
       
        
        
    
       </>
    );
}

export default App;
