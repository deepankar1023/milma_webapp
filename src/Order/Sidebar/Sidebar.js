import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const SideMenu = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-between ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">{category}</span>
                {activeCategory === category && (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;

