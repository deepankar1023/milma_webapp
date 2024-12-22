import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import axios from 'axios';
import { useUser } from '../utils/context';
import toast from 'react-hot-toast';

const CartPage = ({ cart, handleUpdateQuantity, setCart,pToken,setpToken }) => { // Added setCart prop
  const { user } = useUser();
  const navigate = useNavigate();
  // console.log("catpage token value:",pToken)
  const getTotalCartValue = () => {
    
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

  const handleChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    handleUpdateQuantity(productId, newQuantity);
  };

  const handleRemove = async (productId) => {
    
    try {
      await axios.delete(`/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` }, // Include auth token if needed
      });
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
      toast.success("Item removed from cart");
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/payment', {
        userId: user._id,
        cart
      });
      const { orderId } = response.data;

      // Redirect to Razorpay payment gateway
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: getTotalCartValue() * 100, // in paise
        currency: 'INR',
        name: 'Your App Name', // Update with your app's name
        description: 'Test Transaction',
        order_id: orderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          await axios.post('/api/payment/verify', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            userId: user._id,
            cart,
            ptoken: pToken
          });
          toast.success("Payment Successful!");
          navigate('/order-confirm');
        },
        prefill: {
          name: user.name,
          email: user.email,
          // contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log(pToken)
      setpToken(0);
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Checkout failed. Please try again.");
    }
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
                  <div className="relative group ml-8">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-48 h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="ml-8 flex flex-col justify-center">
                    <p className="text-lg font-medium">{item.product.name}</p>
                    <div className="flex items-center mt-2">
                      <select 
                        value={item.quantity} 
                        onChange={(e) => handleChange(productId, e)}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={() => handleRemove(productId) } // Add onClick handler for Remove button
                      className="text-sm text-red-500 mt-2"
                    >
                      Remove
                    </button>
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
            <button onClick={handleCheckout} className="w-full bg-black text-white py-2 mt-4">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
