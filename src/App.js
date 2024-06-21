import React, { useState } from 'react';
import css from './App.module.css'
import { Route, Routes } from "react-router-dom";

import HomePageBanner from './components/homepage/HomePageBanner';




import Contact from './components/Contact/Contact';
import About from "./components/About/About";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"


const App =() => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [city,setCity] = useState('Varanasi')

    

    return (
       <>
       
        
        <Routes>
            <Route index element= {<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city}/>} />
            <Route path="/about" element = {<About/>} />
            <Route path="/contact" element = {<Contact/>} />
            <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path="/menu" element = {<Product/>} />
        </Routes>
       
        
        
    
       </>
    );
}

export default App;
