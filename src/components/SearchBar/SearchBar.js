import React from 'react';
import css from './SearchBar.module.css';

import searchIcon from '../assets/icons/search.png';

const SearchBar = () => {
    return (
        <div className={css.srch2}>
            <div className={css.iconBox}>
                <img className={css.icon} src={searchIcon} alt="search icon" />
            </div>
            <input type="text" placeholder="Search for restaurant, cuisine or a dish" className={css.inpt} />
        </div>
    );
}

export default SearchBar;
