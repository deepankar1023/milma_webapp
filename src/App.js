import React, { useState } from 'react';
import css from './App.module.css'

import HomePageBanner from './components/homepage/HomePageBanner';
import SmallCard from './components/card1/SmallCard';
import Footer from "./components/Footer/Footer";
import OrderCard from './components/ordercard/OrderCard';

import orderOnlineImg from './components/assets/images/orderonline.jpg';
import diningoutImg from './components/assets/images/diningout.jpg';
import proandproplusImg from './components/assets/images/proandproplus.jpg';
import nightlifeandclubsImg from './components/assets/images/nightlifeandclubs.jpg';


const App =() => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [city,setCity] = useState('Varanasi')

    

    return (
       <>
       <HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city}/>
        
        <div className={css.chooseTypeCards}>
        <SmallCard imgSrc={orderOnlineImg} text="Order Online"  />
        <SmallCard imgSrc={diningoutImg} text="Dining Out"  />
        <SmallCard imgSrc={proandproplusImg} text="Pro and Pro Plus"  />
        <SmallCard imgSrc={nightlifeandclubsImg} text="Night Life and Clubs" />
      </div>
        <OrderCard/>
        <Footer/>
       </>
    );
}

export default App;
