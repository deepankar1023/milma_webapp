import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [city, setCity] = useState('Varanasi');
  const [cart, setCart] = useState({});
  const [address, setAddress] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const categories = ['Recommended', 'Shake', 'Fries', 'Tandoori', 'Chinese', 'Noodles & Fried Rice', 'Soups', 'Roti', 'Dessert'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [pToken, setpToken] = useState(0);

  useEffect(() => {
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
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cart`, {
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

  useEffect(() => {
    const calculatePlasticToken = () => {
      const totalPlasticToken = Object.keys(cart).reduce((pToken, productId) => {
        const item = cart[productId];
        return pToken + (item.product.plastic * item.quantity);
      }, 0);
      setpToken(totalPlasticToken);
      console.log(pToken)
    };

    calculatePlasticToken();
  }, [cart]); // Run this effect when cart changes

  const getTotalCartValue = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const item = cart[productId];
      return total + (item.quantity * parseFloat(item.product.price));
    }, 0);
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/cart/items/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(prevCart => ({
        ...prevCart,
        [itemId]: {
          ...prevCart[itemId],
          quantity: quantity
        }
      }));
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: {
        ...prevCart[productId],
        quantity: newQuantity
      }
    }));
    updateCartItem(productId, newQuantity);
  };

  const handleAddressChange = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
    setIsFormVisible(false);
  };

  const addToCart = (productId, product, quantity = 1) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: {
        product,
        quantity: prevCart[productId] ? prevCart[productId].quantity + quantity : quantity
      }
      
    }));
  };
  
  const location = useLocation();

  return (
    <AuthProvider>
      <Toaster />
      <UserProvider>
        {location.pathname === '/menu' && (
          <MenuNavbar
            cartCount={Object.keys(cart).length}
            getTotalCartValue={getTotalCartValue}
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
          <Route path="/cart" element={<CartPage cart={cart} handleUpdateQuantity={handleUpdateQuantity} setCart={setCart} pToken={pToken} setpToken={setpToken} />} />
          <Route path="/menu/:productId" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={<PaymentPage cart={cart} />} />
          <Route path="/order-confirm" element={<OrderConfirmPage cart={cart} />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
