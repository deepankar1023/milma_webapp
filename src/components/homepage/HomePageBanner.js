import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../navbar/Navbar"
import SearchBar from "../SearchBar/SearchBar";
import SmallCard from '../card1/SmallCard';
import Footer from "../Footer/Footer";
import OrderCard from '../ordercard/OrderCard';

import orderOnlineImg from '../assets/images/orderonline.jpg';
import diningoutImg from '../assets/images/diningout.jpg';
import proandproplusImg from '../assets/images/proandproplus.jpg';
import nightlifeandclubsImg from '../assets/images/nightlifeandclubs.jpg';

import css from './HomePageBanner.module.css';
import milma from "./milma.jpg";

const HomePageBanner = ({ isLoggedIn, setIsLoggedIn, city }) => {
    return (
        <div className={css.banner}>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <div className={css.bannerInner}>
                <img src={milma} alt="banner" className={css.bannerImg} />
                <div className={css.bannerTxt}>
                    <div className={css.title}>Milma</div>
                    <div className={css.tag}>Discover the best food & drinks in <span className={css.bld}>{city}</span></div>
                    <div className={css.searchbar}>
                        <SearchBar />
                    </div>
                </div>
            </div>

            <div className={css.chooseTypeCards}>
                <SmallCard imgSrc={orderOnlineImg} text="Order Online" />
                <SmallCard imgSrc={diningoutImg} text="Dining Out" />
                <SmallCard imgSrc={proandproplusImg} text="Pro and Pro Plus" />
                <Link to="/menu"><SmallCard imgSrc={nightlifeandclubsImg} text="Night Life and Clubs" /></Link>
            </div>

            <OrderCard />
            <div className="mt-10"> {/* Add margin at the top */}
                <Footer />
            </div>
        </div>
    );
};

export default HomePageBanner;
