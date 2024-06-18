import React, { useState } from 'react';
import css from './App.module.css'
import { Route, Routes } from "react-router-dom";

import HomePageBanner from './components/homepage/HomePageBanner';






import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"


const App =() => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [city,setCity] = useState('Varanasi')

    

    return (
       <>
       
        {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> */}
        <Routes>
            <Route index element= {<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city}/>} />
            <Route path="/login" element = {<Login  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup  setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element = {<Dashboard/>} />
        </Routes>
        {/* <HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city}/> */}
        
        
    
       </>
    );
}

export default App;
