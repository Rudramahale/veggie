import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

// Mock Data
const MOCK_CATEGORIES = [
  { id: 1, name: 'Vegetables & Fruits', color: '#eefde8' },
  { id: 2, name: 'Dairy & Breakfast', color: '#fef3e5' },
  { id: 3, name: 'Munchies', color: '#fdeaee' },
  { id: 4, name: 'Cold Drinks', color: '#e5f6fd' },
  { id: 5, name: 'Instant & Frozen', color: '#feedec' },
  { id: 6, name: 'Tea, Coffee & Health', color: '#f3eef9' },
  { id: 7, name: 'Bakery & Biscuits', color: '#fcf2ea' },
  { id: 8, name: 'Sweet Tooth', color: '#fbeef5' },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Amul Taaza Toned Fresh Milk',
    weight: '500 ml',
    price: 27,
    originalPrice: 28,
    discount: 3,
    image: '/src/assets/images/products/shoes1.jpg' // Using available placeholders
  },
  {
    id: 2,
    name: 'Britannia NutriChoice Digestive',
    weight: '1 kg',
    price: 150,
    originalPrice: 200,
    discount: 25,
    image: '/src/assets/images/products/tshirt1.jpg'
  },
  {
    id: 3,
    name: 'Haldiram\'s Bhujia Sev',
    weight: '400 g',
    price: 105,
    image: '/src/assets/images/products/watch1.jpg'
  },
  {
    id: 4,
    name: 'Fresh Onion',
    weight: '1 kg',
    price: 45,
    originalPrice: 60,
    discount: 25,
    image: '/src/assets/images/products/shoes1.jpg'
  },
  {
    id: 5,
    name: 'Coca-Cola Can',
    weight: '300 ml',
    price: 40,
    image: '/src/assets/images/products/tshirt1.jpg'
  }
];

const Home = () => {
  return (
    <div className="home container">
      {/* Hero Banners */}
      <section className="banner-section">
        <div className="banner main-banner">
          <h2>Get 20% OFF on your first order</h2>
          <p>Use code WELCOME20</p>
          <button className="banner-btn">Shop Now</button>
        </div>
        <div className="banner secondary-banner">
          <h3>Pharmacy at your doorstep</h3>
          <button className="banner-btn secondary">Order Medicines</button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {MOCK_CATEGORIES.map(category => (
            <div 
              key={category.id} 
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <div className="category-img-placeholder"></div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Product List 1 */}
      <section className="product-row-section">
        <div className="section-header">
          <h2>Dairy, Bread & Eggs</h2>
          <a href="/products" className="see-all">See All</a>
        </div>
        <div className="product-scroll-container">
          {MOCK_PRODUCTS.map(product => (
            <div className="product-card-wrapper" key={`dairy-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Product List 2 */}
      <section className="product-row-section">
        <div className="section-header">
          <h2>Snacks & Munchies</h2>
          <a href="/products" className="see-all">See All</a>
        </div>
        <div className="product-scroll-container">
          {/* Reusing mock products but reversed for visual difference */}
          {[...MOCK_PRODUCTS].reverse().map(product => (
            <div className="product-card-wrapper" key={`snacks-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
