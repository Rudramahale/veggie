import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const ALL_PRODUCTS = [
  { id: 1, name: 'Amul Taaza Toned Fresh Milk', weight: '500 ml', price: 27, discount: 3, image: '/src/assets/images/products/shoes1.jpg' },
  { id: 2, name: 'Britannia NutriChoice', weight: '1 kg', price: 150, originalPrice: 200, discount: 25, image: '/src/assets/images/products/tshirt1.jpg' },
  { id: 3, name: 'Haldiram\'s Bhujia Sev', weight: '400 g', price: 105, image: '/src/assets/images/products/watch1.jpg' },
  { id: 4, name: 'Fresh Onion', weight: '1 kg', price: 45, originalPrice: 60, discount: 25, image: '/src/assets/images/products/shoes1.jpg' },
  { id: 5, name: 'Coca-Cola Can', weight: '300 ml', price: 40, image: '/src/assets/images/products/tshirt1.jpg' },
  { id: 6, name: 'Lays India\'s Magic Masala', weight: '50 g', price: 20, image: '/src/assets/images/products/watch1.jpg' },
  { id: 7, name: 'Maggi 2-Minute Noodles', weight: '70 g', price: 14, image: '/src/assets/images/products/shoes1.jpg' },
  { id: 8, name: 'Aashirvaad Whole Wheat Atta', weight: '5 kg', price: 240, originalPrice: 280, discount: 14, image: '/src/assets/images/products/tshirt1.jpg' },
];

const CATEGORIES = [
  'All', 'Vegetables & Fruits', 'Dairy & Breakfast', 'Munchies', 
  'Cold Drinks', 'Instant & Frozen', 'Bakery & Biscuits'
];

const Products = () => {
  return (
    <div className="products-page container">
      {/* Sidebar Filters */}
      <aside className="products-sidebar hide-on-mobile">
        <h3>Categories</h3>
        <ul className="category-list">
          {CATEGORIES.map((cat, index) => (
            <li key={index} className={index === 0 ? 'active' : ''}>
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="products-main">
        <div className="products-header">
          <h2>All Products <span>({ALL_PRODUCTS.length} items)</span></h2>
          <select className="sort-dropdown">
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Discount</option>
          </select>
        </div>

        <div className="products-grid">
          {ALL_PRODUCTS.map(product => (
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
