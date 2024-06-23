import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmPage = ({ cart }) => {
  return (
    <>
        <div className="container mx-auto py-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Here are the details of your order:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.keys(cart).map(productId => {
            const item = cart[productId];
            return (
              <div key={productId} className="flex items-center border p-4 rounded-lg shadow-sm">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="text-lg font-medium">{item.product.name}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/">
        <button
          type="button"
          className="mt-8 inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to HomePage
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default OrderConfirmPage;
