import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = ({ cart, address }) => {
  const [upiId, setUpiId] = useState('');
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const handleAddressConfirmChange = (e) => {
    setIsAddressConfirmed(e.target.checked);
  };

  const handleOrderConfirmChange = (e) => {
    setIsOrderConfirmed(e.target.checked);
  };

  const getTotalCartValue = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Payment Page</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <label htmlFor="upiId" className="block text-lg font-medium text-gray-700 mb-2">
          Enter your UPI ID:
        </label>
        <input
          type="text"
          id="upiId"
          value={upiId}
          onChange={handleUpiChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <label className="inline-flex items-center text-lg">
          <input
            type="checkbox"
            checked={isAddressConfirmed}
            onChange={handleAddressConfirmChange}
            className="form-checkbox h-6 w-6 text-indigo-600"
          />
          <span className="ml-3 text-gray-700">Confirm Address</span>
        </label>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <label className="inline-flex items-center text-lg">
          <input
            type="checkbox"
            checked={isOrderConfirmed}
            onChange={handleOrderConfirmChange}
            className="form-checkbox h-6 w-6 text-indigo-600"
          />
          <span className="ml-3 text-gray-700">Confirm Order</span>
        </label>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Details</h3>
        {Object.keys(cart).map(productId => {
          const item = cart[productId];
          return (
            <div key={productId} className="flex justify-between items-center mb-4">
              <div>
                <p className="text-lg">{item.product.name}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-gray-500">
                Total: ${(item.quantity * parseFloat(item.product.price)).toFixed(2)}
              </div>
            </div>
          );
        })}
        <div className="mt-4">
          <p className="text-2xl font-bold">Total Value: ${getTotalCartValue().toFixed(2)}</p>
        </div>
      </div>
      <Link to="/order-confirm">
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        disabled={!isAddressConfirmed || !isOrderConfirmed || upiId === ''}
      >
        Pay Now
      </button>
      </Link>
    </div>
  );
};

export default PaymentPage;
