import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart, handleDecrement, handleIncrement }) => {
  const getTotalCartValue = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 custom-scrollbar">
          {Object.keys(cart).map(productId => {
            const item = cart[productId];
            return (
              <div key={productId} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-4 w-6 h-6" />
                  <div className="relative group ml-8">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-48 h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="ml-8 flex flex-col justify-center">
                    <p className="text-lg font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => handleDecrement(productId)} className="px-2 py-1 bg-gray-200 text-gray-700 rounded">-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => handleIncrement(productId)} className="px-2 py-1 bg-gray-200 text-gray-700 rounded">+</button>
                    </div>
                    <button className="text-sm text-blue-500 mt-2">Move to Favorites</button>
                  </div>
                </div>
                <div className="text-lg font-bold">${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</div>
              </div>
            );
          })}
        </div>
        <div className="w-full lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
          <div className="border p-4 rounded-lg sticky top-1/2 transform -translate-y-1/2">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${getTotalCartValue().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between mb-2 font-bold">
              <span>Total</span>
              <span>${getTotalCartValue().toFixed(2)}</span>
            </div>
            <Link to="/checkout"><button className="w-full bg-black text-white py-2 mt-4">CHECKOUT</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
