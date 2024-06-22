import React, { useState } from 'react';

const Product = ({ product, addToCart, quantity }) => {
  const [count, setCount] = useState(quantity);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 0 ? count - 1 : 0);

  const handleAddToCart = () => {
    if (count > 0) {
      addToCart(product, count);
      setCount(0);  // Reset count after adding to cart
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="w-full h-48 relative overflow-hidden rounded-lg mb-4">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
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
  );
};

export default Product;
