import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../utils/context'; // Adjust the import path as needed
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, TrendingUp, Minus, Plus, Truck } from 'lucide-react';
import RelatedProducts from '../RelatedProducts/RelatedProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 1 ? count - 1 : 1);

  const handleAddToCart = async () => {
    if (count > 0 && user) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/cart`, {
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
        setCount(1);
        toast.success("Added to cart successfully", {
          icon: '🛒',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast.error("Please log in again", {
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

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  if (!product) return <div className="text-center text-2xl mt-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <motion.div 
          className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </motion.div>
        <motion.div 
          className="lg:w-1/2 lg:pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-600">({product.numReviews} reviews)</span>
          </div>
          <p className="text-2xl font-semibold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <motion.button 
              onClick={decrementCount}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l hover:bg-gray-300 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <Minus size={20} />
            </motion.button>
            <span className="px-6 py-2 bg-gray-100 text-xl font-semibold">{count}</span>
            <motion.button 
              onClick={incrementCount}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r hover:bg-gray-300 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
            </motion.button>
          </div>
          <div className="flex space-x-4 mb-8">
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </motion.button>
            <motion.button
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="mr-2" size={20} />
              Buy Now
            </motion.button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <Truck className="mr-2" size={20} />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="text-sm text-gray-600">
              Estimated delivery: 3-5 business days
            </div>
          </div>
        </motion.div>
      </div>
      <RelatedProducts category={product.category} currentProductId={product._id} />
    </div>
  );
};

export default ProductDetail;

