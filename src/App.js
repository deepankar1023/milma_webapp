import React, { useState } from 'react';

import HomePageBanner from './components/homepage/HomePageBanner';
import SmallCard from './components/SmallCards/SmallCards';
import Footer from './components/footer/Footer';
const App =() => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [city,setCity] = useState('Varanasi')

    

    return (
       <>
        <HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city}/>
        <SmallCard/>
        <Footer/>
       </>
    );
}

export default App;
