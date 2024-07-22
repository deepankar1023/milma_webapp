import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../utils/context'; // Adjust the import path as needed
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { productId } = useParams();
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

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
        setCount(1);
        toast.success("Added Successfully");
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast.error("Log in Again");
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
      </div>
      <div className="lg:w-1/2 lg:pl-4">
        <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-500 mb-2">${product.price}</p>
        <div className="flex items-center mb-4">
          <button onClick={decrementCount} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l">
            -
          </button>
          <span className="px-3">{count}</span>
          <button onClick={incrementCount} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r">
            +
          </button>
        </div>
        <div className="flex">
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
            Add to Cart
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
