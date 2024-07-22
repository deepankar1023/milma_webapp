import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import css from './SearchBar.module.css';
import searchIcon from '../assets/icons/search.png';

// Debounce function to limit the rate of function calls
const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    }
}

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchResults = async (searchQuery) => {
        if (searchQuery.length > 2) {
            try {
                const response = await axios.get(`/api/products/search?q=${searchQuery}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setResults([]);
        }
    };

    const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);
        debouncedFetchResults(searchQuery);
    };

    const handleResultClick = (productId) => {
        // Navigate to the product detail page
        navigate(`/menu/${productId}`);
    };

    return (
        <div className={css.srch2}>
            <div className={css.iconBox}>
                <img className={css.icon} src={searchIcon} alt="search icon" />
            </div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search for restaurant, cuisine or a dish"
                className={css.inpt}
            />
            {results.length > 0 && (
                <div className={css.results}>
                    {results.map(result => (
                        <div
                            key={result._id}
                            className={css.resultItem}
                            onClick={() => handleResultClick(result._id)} // Add onClick handler
                        >
                            <img src={result.image} alt={result.name} className={css.resultImage} />
                            <div>
                                <div className={css.resultName}>{result.name}</div>
                                <div className={css.resultPrice}>${result.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
