import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../Product/Product';
import SideMenu from '../Sidebar/Sidebar';

const ProductList = ({ categories, activeCategory, setActiveCategory, cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/getitems'); // Replace with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => product.category === activeCategory || activeCategory === 'Recommended');

  return (
    <div className="container mx-auto py-6 flex">
      <SideMenu categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="w-3/4 sidemenu-container">
        <h2 className="text-2xl font-bold mb-4">{activeCategory}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <Product
              key={product.id}
              product={product}
              quantity={cart[product.id] ? cart[product.id].quantity : 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
