import React from 'react';
import Product from '../Product/Product';
import SideMenu from '../Sidebar/Sidebar';
import data from '../../data';

const ProductList = ({ categories, activeCategory, setActiveCategory, cart, addToCart }) => {
  const filteredProducts = data.filter(product => product.category === activeCategory || activeCategory === 'Recommended');

  return (
    <div className="container mx-auto py-6 flex">
      <SideMenu categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="w-3/4 sidemenu-container ">
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
  );
};

export default ProductList;
