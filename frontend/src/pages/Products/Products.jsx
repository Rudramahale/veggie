import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const VEGETABLES = [
  { id: 1, name: 'Beetroot', weight: '500 g', price: 30, image: '/src/assets/images/Beetroot.jpg', category: 'VEGETABLES' },
  { id: 2, name: 'Brinjal', weight: '500 g', price: 20, image: '/src/assets/images/Brinjal.jpg', category: 'VEGETABLES' },
  { id: 3, name: 'Chilli', weight: '100 g', price: 15, image: '/src/assets/images/CHILLI.jpg', category: 'VEGETABLES' },
  { id: 4, name: 'Cabbage', weight: '1 pc', price: 40, image: '/src/assets/images/Cabbage.jpg', category: 'VEGETABLES' },
  { id: 5, name: 'Cucumber', weight: '500 g', price: 25, image: '/src/assets/images/Cucumber.jpg', category: 'VEGETABLES' },
  { id: 6, name: 'Okra', weight: '500 g', price: 40, image: '/src/assets/images/Okra.jpg', category: 'VEGETABLES' },
  { id: 7, name: 'Potato', weight: '1 kg', price: 30, image: '/src/assets/images/Potato.jpg', category: 'VEGETABLES' },
  { id: 8, name: 'Tomato', weight: '1 kg', price: 40, image: '/src/assets/images/Tomato.jpg', category: 'VEGETABLES' },
  { id: 9, name: 'Bhopla', weight: '1 kg', price: 60, image: '/src/assets/images/bhopla.jpg', category: 'VEGETABLES' },
  { id: 10, name: 'Capsicum', weight: '500 g', price: 45, image: '/src/assets/images/capsicum.jpg', category: 'VEGETABLES' },
  { id: 11, name: 'Carrot', weight: '500 g', price: 35, image: '/src/assets/images/carrot.jpg', category: 'VEGETABLES' },
  { id: 12, name: 'Cauliflower', weight: '1 pc', price: 50, image: '/src/assets/images/cauliflower.jpg', category: 'VEGETABLES' },
  { id: 13, name: 'Ginger', weight: '100 g', price: 20, image: '/src/assets/images/ginger.jpg', category: 'VEGETABLES' },
  { id: 14, name: 'Onion', weight: '1 kg', price: 30, image: '/src/assets/images/onion.jpg', category: 'VEGETABLES' },
  { id: 15, name: 'Tondali', weight: '250 g', price: 25, image: '/src/assets/images/tondali.jpg', category: 'VEGETABLES' },
];

const EXOTIC_VEGETABLES = [
  { id: 16, name: 'Broccoli', weight: '1 pc', price: 120, image: '/src/assets/images/broccoli.jpg', category: 'EXOTIC VEGETABLES' },
  { id: 17, name: 'English Cucumber', weight: '1 pc', price: 50, image: '/src/assets/images/englishcucumber.jpg', category: 'EXOTIC VEGETABLES' },
  { id: 18, name: 'Iceburg Lettuce', weight: '1 pc', price: 80, image: '/src/assets/images/iceburg.jpg', category: 'EXOTIC VEGETABLES' },
  { id: 19, name: 'Red Cabbage', weight: '1 pc', price: 100, image: '/src/assets/images/redcabbage.jpg', category: 'EXOTIC VEGETABLES' },
  { id: 20, name: 'Red & Yellow Capsicum', weight: '500 g', price: 150, image: '/src/assets/images/rednyellowcapsicum.jpg', category: 'EXOTIC VEGETABLES' },
  { id: 21, name: 'Zucchini', weight: '500 g', price: 90, image: '/src/assets/images/zucchini.jpg', category: 'EXOTIC VEGETABLES' },
];

const FRUITS = [
  { id: 22, name: 'Banana', weight: '1 dozen', price: 60, image: '/src/assets/images/banana.jpg', category: 'FRUITS' },
  { id: 23, name: 'Guava', weight: '500 g', price: 50, image: '/src/assets/images/guava.jpg', category: 'FRUITS' },
  { id: 24, name: 'Lemon', weight: '250 g', price: 30, image: '/src/assets/images/lemon.jpg', category: 'FRUITS' },
  { id: 25, name: 'Mosambi', weight: '1 kg', price: 80, image: '/src/assets/images/Mosambi.png', category: 'FRUITS' },
  { id: 26, name: 'Muskmelon', weight: '1 pc', price: 70, image: '/src/assets/images/Muskmelon.jpg', category: 'FRUITS' },
  { id: 27, name: 'Papaya', weight: '1 pc', price: 60, image: '/src/assets/images/papaya.jpg', category: 'FRUITS' },
  { id: 28, name: 'Pomegranate', weight: '500 g', price: 120, image: '/src/assets/images/pomegrante.jpg', category: 'FRUITS' },
  { id: 29, name: 'Watermelon', weight: '1 pc', price: 90, image: '/src/assets/images/Watermelon.jpg', category: 'FRUITS' },
];

const ALL_PRODUCTS = [...VEGETABLES, ...EXOTIC_VEGETABLES, ...FRUITS];
const CATEGORIES = ['All', 'VEGETABLES', 'EXOTIC VEGETABLES', 'FRUITS'];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="products-page container">
      {/* Sidebar Filters */}
      <aside className="products-sidebar hide-on-mobile">
        <h3>Categories</h3>
        <ul className="category-list">
          {CATEGORIES.map((cat, index) => (
            <li 
              key={index} 
              className={cat === activeCategory ? 'active' : ''}
              onClick={() => setActiveCategory(cat)}
              style={{cursor: 'pointer'}}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="products-main">
        <div className="products-header">
          <h2>{activeCategory === 'All' ? 'All Products' : activeCategory} <span>({filteredProducts.length} items)</span></h2>
          <select className="sort-dropdown">
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="grid-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
