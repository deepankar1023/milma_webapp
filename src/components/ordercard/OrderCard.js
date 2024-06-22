import React from 'react';

const OrderCard = () => {
    return (
        <div className="flex justify-between items-center w-3/4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md mx-auto mt-5">
            <div className="text-lg font-bold">
                <p>Order</p>
            </div>
            <div className="flex space-x-4">
                <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">Token History</button>
                <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75">Order History</button>
            </div>
        </div>
    );
}

export default OrderCard;
