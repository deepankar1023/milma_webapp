import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

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
    const navigate = useNavigate();

    const fetchResults = async (searchQuery) => {
        if (searchQuery.length > 2) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/search?q=${searchQuery}`);
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
        navigate(`/menu/${productId}`);
    };

    return (
        <div className="relative">
            <div className="flex items-center bg-white rounded-full shadow-lg">
                <div className="pl-4">
                    <FaSearch className="text-gray-500" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search for restaurant, cuisine or a dish"
                    className="w-full py-3 px-4 rounded-full focus:outline-none"
                />
            </div>
            {results.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10">
                    {results.map(result => (
                        <div
                            key={result._id}
                            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleResultClick(result._id)}
                        >
                            <img src={result.image} alt={result.name} className="w-12 h-12 object-cover rounded-full mr-4" />
                            <div>
                                <div className="font-semibold">{result.name}</div>
                                <div className="text-gray-600">${result.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

