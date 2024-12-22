import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import SmallCard from '../SmallCards/SmallCards';
import Footer from "../Footer/Footer";
import OrderCard from '../ordercard/OrderCard';

// Import all images at the top
import orderOnlineImg from './images/img1.jpg';
import diningoutImg from './images/img2.jpg';
import proandproplusImg from './images/img3.jpg';
import nightlifeandclubsImg from './images/img4.png';
import milmaBannerImg from "./milma1.jpeg";

import css from './HomePageBanner.module.css';

const HomePageBanner = ({ isLoggedIn, setIsLoggedIn, city }) => {
    return (
        <div className={css.banner}>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <div className={css.bannerInner}>
                <img src={milmaBannerImg} alt="banner" className={css.bannerImg} />
                <div className={css.bannerTxt}>
                    <div className={css.title}>Milma</div>
                    <div className={css.tag}>Discover the best food & drinks in <span className={css.bld}>{city}</span></div>
                    <div className={css.searchbar}>
                        <SearchBar />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center items-center py-12 bg-gray-100">
                <SmallCard imgSrc={orderOnlineImg} text="Order Online" />
                <SmallCard imgSrc={diningoutImg} text="Dining Out" />
                <SmallCard imgSrc={proandproplusImg} text="Pro and Pro Plus" />
                <SmallCard 
                  imgSrc={nightlifeandclubsImg}
                  text="Night Life and Clubs" 
                  link="/menu"
                />
            </div>

            <OrderCard />
            <div className="mt-10">
                <Footer />
            </div>
        </div>
    );
};

export default HomePageBanner;

