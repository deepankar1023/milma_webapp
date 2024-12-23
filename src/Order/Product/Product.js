import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../utils/context'; // Adjust the import path as needed
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, ExternalLink } from 'lucide-react';

const Product = ({ product, quantity }) => {
  const { user } = useUser();
  const [count, setCount] = useState(quantity);
  const navigate = useNavigate();

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 0 ? count - 1 : 0);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (count > 0 && user) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/cart', {
          userId: user._id,
          product: {
            _id: product._id,
          },
          quantity: count,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log('Cart updated:', response.data);
        setCount(0);
        toast.success("Added Successfully", {
          icon: '🛒',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        window.location.reload();
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast.error("Log in Again", {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    }
  };

  const handleRedirect = () => {
    navigate(`/menu/${product._id}`);
  };

  return (
    <motion.div 
      className="bg-white p-6 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleRedirect}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="w-full h-64 relative overflow-hidden rounded-lg mb-4">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
      <p className="text-gray-600 mb-4 text-lg font-medium">${product.price.toFixed(2)}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <motion.button 
            onClick={(e) => { e.stopPropagation(); decrementCount(); }}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            <Minus size={16} />
          </motion.button>
          <span className="text-lg font-semibold w-8 text-center">{count}</span>
          <motion.button 
            onClick={(e) => { e.stopPropagation(); incrementCount(); }}
            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>
      <div className="flex space-x-2">
        <motion.button 
          onClick={handleAddToCart} 
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </motion.button>
        <motion.button 
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ExternalLink size={18} className="mr-2" />
          Buy Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Product;

