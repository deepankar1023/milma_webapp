import React from 'react';

const SideMenu = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-200 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className={`mb-2 ${activeCategory === category ? 'bg-gray-200' : ''}`}>
            <button
              onClick={() => setActiveCategory(category)}
              className="w-full text-left p-2"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
