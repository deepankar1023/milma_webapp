import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePageBanner from './components/homepage/HomePageBanner';
import ProductList from './Order/ProductList.js/ProductList';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CartPage from './cart/Cartpage';
import MenuNavbar from "./Order/Navbar/Navbar";
import AddressForm from "./Order/Addressform/AddressForm";
import PaymentPage from './payment/PaymentPage';
import OrderConfirmPage from './payment/OrderConfirmPage';
import { AuthProvider } from './utils/auth';
import Logout from './components/logout/logout';
import ProductDetail from './Order/productdetail/ProductDetail';
import { UserProvider } from './utils/context';
import axios from 'axios';
// import Cookies from 'js-cookie';if using cookie from backend so,add cookie in res from bcknd then use
import { requestFirebaseNotificationPermission, onMessageListener } from './firebase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [city, setCity] = useState('Varanasi');
  const [cart, setCart] = useState({});
  const [address, setAddress] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const categories = ['Recommended', 'Biryanis', 'Indian', 'Tandoori', 'Chinese', 'Noodles & Fried Rice', 'Soups', 'Roti', 'Dessert'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // const [token, setToken] = useState(null);
  // const [notification, setNotification] = useState(null);
  //notification
  // useEffect(() => {
  //   requestFirebaseNotificationPermission()
  //     .then((firebaseToken) => {
  //       setToken(firebaseToken);
  //       console.log('Firebase token:', firebaseToken);
  //       // Save the token to your backend
  //     })
  //     .catch((err) => console.error(err));

  //   onMessageListener()
  //     .then((payload) => {
  //       setNotification({
  //         title: payload.notification.title,
  //         body: payload.notification.body,
  //       });
  //     })
  //     .catch((err) => console.error('Failed to receive message: ', err));
  // }, []);
  useEffect(() => {
    // Check if the token exists in cookies
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const items = response.data.items || [];
        const cartData = {};
        items.forEach(item => {
          cartData[item.productId._id] = {
            product: item.productId,
            quantity: item.quantity
          };
          
        });
        setCart(cartData);
        console.log('Cart fetched successfully');
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, []);

  const updateCartItem = async function updateCartItem(itemId, quantity) {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.put(
        '/api/cart/items/' + itemId, 
        { quantity }, 
        { headers: { Authorization: `Bearer ${token}` } } // Include token in headers
      );
      // Handle successful response
      console.log('Cart item updated:', response.data);
    } catch (error) { 
      console.error('Error updating cart item:', error);
      // Handle error (e.g., display error message to the user)
    }
  }

  const handleIncrement = (productId) => {
    const newQuantity = cart[productId].quantity + 1;
    updateCartItem(productId, newQuantity);
  };

  const handleDecrement = (productId) => {
    const newQuantity = cart[productId].quantity - 1;
    if (newQuantity > 0) {
      updateCartItem(productId, newQuantity);
    }
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        newCart[product.id].quantity += quantity;
      } else {
        newCart[product.id] = { product, quantity };
      }
      return newCart;
    });
  };

  const getTotalCartValue = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

  const handleAddressChange = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
    setIsFormVisible(false);
  };

  const location = useLocation();

  return (
    <AuthProvider>
      <UserProvider>
        

        {/* {notification && (
          <div>
            <h2>{notification.title}</h2>
            <p>{notification.body}</p>
          </div>
        )} */}

        {location.pathname === '/menu' && (
          <MenuNavbar
            cartCount={Object.keys(cart).length}
            getTotalCartValue={() => getTotalCartValue(cart)}
            onAddressChange={handleAddressChange}
            cart={cart}
          />
        )}
        {isFormVisible && <AddressForm onSave={handleSaveAddress} />}
        {address && (
          <div>
            <h2>Address Details</h2>
            <p>{address.name}</p>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.zip}</p>
          </div>
        )}
        <Routes>
          <Route index element={<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city} />} />
          <Route path="/" element={<HomePageBanner isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} city={city} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/menu"
            element={
              <ProductList
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/cart" element={<CartPage cart={cart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
          <Route path="/menu/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<PaymentPage cart={cart} />} />
          <Route path="/order-confirm" element={<OrderConfirmPage cart={cart} />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
