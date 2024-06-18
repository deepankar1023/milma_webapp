import React from "react";
import Navbar from "../navbar/Navbar"

import SearchBar from "../SearchBar/SearchBar";







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
    </div>
    );
};

export default HomePageBanner;