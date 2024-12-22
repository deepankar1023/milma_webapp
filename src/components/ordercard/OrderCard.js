import React from 'react';
import { motion } from 'framer-motion';

const OrderCard = () => {
    return (
        <motion.div 
            className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-2xl font-bold text-gray-800">
                    <h2>Your Order</h2>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <motion.button 
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Token History
                    </motion.button>
                    <motion.button 
                        className="px-6 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Order History
                    </motion.button>
                </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No active orders. Place an order to get started!</p>
            </div>
        </motion.div>
    );
}

export default OrderCard;

