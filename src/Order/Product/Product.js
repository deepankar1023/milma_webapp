import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from '../../utils/context'; // Adjust the import path as needed
import toast from 'react-hot-toast';

const Product = ({ product, quantity }) => {
  const { user } = useUser();
  const [count, setCount] = useState(quantity);
  const navigate = useNavigate();

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 0 ? count - 1 : 0);

  const handleAddToCart = async () => {
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
        toast.success("Added Successfully");
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast.error("Log in Again");
      }
    }
  };

  const handleRedirect = () => {
    navigate(`/menu/${product._id}`);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg" onClick={handleRedirect}>
      <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-500 mb-2">${product.price}</p>
      <div className="flex items-center mb-4">
        <button onClick={(e) => { e.stopPropagation(); decrementCount(); }} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l">
          -
        </button>
        <span className="px-3">{count}</span>
        <button onClick={(e) => { e.stopPropagation(); incrementCount(); }} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r">
          +
        </button>
      </div>
      <div className="flex">
        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
          Add to Cart
        </button>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;
