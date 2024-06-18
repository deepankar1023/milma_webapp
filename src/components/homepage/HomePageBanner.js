import React from "react";
import Navbar from "../navbar/Navbar"

import SearchBar from "../SearchBar/SearchBar";
import SmallCard from '../card1/SmallCard';
import Footer from "../Footer/Footer";
import OrderCard from '../ordercard/OrderCard';


import orderOnlineImg from '../assets/images/orderonline.jpg';
import diningoutImg from '../assets/images/diningout.jpg';
import proandproplusImg from '../assets/images/proandproplus.jpg';
import nightlifeandclubsImg from '../assets/images/nightlifeandclubs.jpg';




import css from './HomePageBanner.module.css'
import milma from "./milma.jpg"
// import banner from '../assets/banners/banner1.jpg'


const HomePageBanner = ({ isLoggedIn, setIsLoggedIn, city }) => {
    return (
        <div className={css.banner}>
        <Navbar isLoggedIn={isLoggedIn}/>
        <div className={css.bannerInner}>
            <img src={milma} alt="banner" className={css.bannerImg} />
            <div className={css.bannerTxt}>
                <div className={css.title}>Milma</div>
                    <div className={css.tag}>Discover the best food & drinks in <span className={css.bld}>{city}</span></div>
                <div className={css.searchbar}>
                    <SearchBar/>
                </div>
            </div>
        </div>

        <div className={css.chooseTypeCards}>
            <SmallCard imgSrc={orderOnlineImg} text="Order Online"  />
            <SmallCard imgSrc={diningoutImg} text="Dining Out"  />
            <SmallCard imgSrc={proandproplusImg} text="Pro and Pro Plus"  />
            <SmallCard imgSrc={nightlifeandclubsImg} text="Night Life and Clubs" />
        </div>

        <OrderCard/>
        <Footer/>
    </div>
    );
};

export default HomePageBanner;