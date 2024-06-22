import React, { useState } from 'react';
import Product from '../Product/Product';
import SideMenu from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import AddressForm from '../Addressform/AddressForm';
import data from '../../data';

const ProductList = ({ addToCart, cart }) => {
  const categories = ['Recommended', 'Biryanis', 'Indian', 'Tandoori', 'Chinese', 'Noodles & Fried Rice', 'Soups', 'Roti', 'Dessert'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = data.filter(product => product.category === activeCategory || activeCategory === 'Recommended');

  // navbar properties

  // const [cart, setCart] = useState({});

  // // Function to add to cart
  // const addToCart = (product, quantity) => {
  //   setCart((prevCart) => {
  //     const newCart = { ...prevCart };
  //     if (newCart[product.id]) {
  //       newCart[product.id].quantity += quantity;
  //     } else {
  //       newCart[product.id] = { product, quantity };
  //     }
  //     return newCart;
  //   });
  // };

  // // Function to calculate total cart value
  // const getTotalCartValue = () => {
  //   return Object.keys(cart).reduce((total, productId) => {
  //     const item = cart[productId];
  //     return total + (item.quantity * parseFloat(item.product.price));
  //   }, 0);
  // };

  // //address code

  // const [address, setAddress] = useState(null);
  // const [isFormVisible, setIsFormVisible] = useState(false);

  // const handleAddressChange = () => {
  //   setIsFormVisible(true);
  // };

  // const handleSaveAddress = (newAddress) => {
  //   setAddress(newAddress);
  //   setIsFormVisible(false);
  // };

  return (<>
  {/* <Navbar cartCount={Object.keys(cart).length} totalCartValue={getTotalCartValue()} onAddressChange={handleAddressChange} cart={cart} /> */}
    <div className="container mx-auto py-6 flex">
      <SideMenu categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-4">{activeCategory}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <Product
              key={product.id}
              product={product}
              addToCart={addToCart}
              quantity={cart[product.id] ? cart[product.id].quantity : 0}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductList;
