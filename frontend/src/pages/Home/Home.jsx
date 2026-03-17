import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

// Mock Data
const VEGETABLES = [
  { id: 1, name: 'Beetroot', weight: '500 g', price: 30, image: '/src/assets/images/Beetroot.jpg' },
  { id: 2, name: 'Brinjal', weight: '500 g', price: 20, image: '/src/assets/images/Brinjal.jpg' },
  { id: 3, name: 'Chilli', weight: '100 g', price: 15, image: '/src/assets/images/CHILLI.jpg' },
  { id: 4, name: 'Cabbage', weight: '1 pc', price: 40, image: '/src/assets/images/Cabbage.jpg' },
  { id: 5, name: 'Cucumber', weight: '500 g', price: 25, image: '/src/assets/images/Cucumber.jpg' },
  { id: 6, name: 'Okra', weight: '500 g', price: 40, image: '/src/assets/images/Okra.jpg' },
  { id: 7, name: 'Potato', weight: '1 kg', price: 30, image: '/src/assets/images/Potato.jpg' },
  { id: 8, name: 'Tomato', weight: '1 kg', price: 40, image: '/src/assets/images/Tomato.jpg' },
  { id: 9, name: 'Bhopla', weight: '1 kg', price: 60, image: '/src/assets/images/bhopla.jpg' },
  { id: 10, name: 'Capsicum', weight: '500 g', price: 45, image: '/src/assets/images/capsicum.jpg' },
  { id: 11, name: 'Carrot', weight: '500 g', price: 35, image: '/src/assets/images/carrot.jpg' },
  { id: 12, name: 'Cauliflower', weight: '1 pc', price: 50, image: '/src/assets/images/cauliflower.jpg' },
  { id: 13, name: 'Ginger', weight: '100 g', price: 20, image: '/src/assets/images/ginger.jpg' },
  { id: 14, name: 'Onion', weight: '1 kg', price: 30, image: '/src/assets/images/onion.jpg' },
  { id: 15, name: 'Tondali', weight: '250 g', price: 25, image: '/src/assets/images/tondali.jpg' },
];

const EXOTIC_VEGETABLES = [
  { id: 16, name: 'Broccoli', weight: '1 pc', price: 120, image: '/src/assets/images/broccoli.jpg' },
  { id: 17, name: 'English Cucumber', weight: '1 pc', price: 50, image: '/src/assets/images/englishcucumber.jpg' },
  { id: 18, name: 'Iceburg Lettuce', weight: '1 pc', price: 80, image: '/src/assets/images/iceburg.jpg' },
  { id: 19, name: 'Red Cabbage', weight: '1 pc', price: 100, image: '/src/assets/images/redcabbage.jpg' },
  { id: 20, name: 'Red & Yellow Capsicum', weight: '500 g', price: 150, image: '/src/assets/images/rednyellowcapsicum.jpg' },
  { id: 21, name: 'Zucchini', weight: '500 g', price: 90, image: '/src/assets/images/zucchini.jpg' },
];

const FRUITS = [
  { id: 22, name: 'Banana', weight: '1 dozen', price: 60, image: '/src/assets/images/banana.jpg' },
  { id: 23, name: 'Guava', weight: '500 g', price: 50, image: '/src/assets/images/guava.jpg' },
  { id: 24, name: 'Lemon', weight: '250 g', price: 30, image: '/src/assets/images/lemon.jpg' },
  { id: 25, name: 'Mosambi', weight: '1 kg', price: 80, image: '/src/assets/images/Mosambi.png' },
  { id: 26, name: 'Muskmelon', weight: '1 pc', price: 70, image: '/src/assets/images/Muskmelon.jpg' },
  { id: 27, name: 'Papaya', weight: '1 pc', price: 60, image: '/src/assets/images/papaya.jpg' },
  { id: 28, name: 'Pomegranate', weight: '500 g', price: 120, image: '/src/assets/images/pomegrante.jpg' },
  { id: 29, name: 'Watermelon', weight: '1 pc', price: 90, image: '/src/assets/images/Watermelon.jpg' },
];

const Home = () => {
  return (
    <div className="home container">
      <section className="product-row-section">
        <div className="section-header">
          <h2>VEGETABLES</h2>
          <a href="/products" className="see-all">See All</a>
        </div>
        <div className="product-scroll-container">
          {VEGETABLES.map(product => (
            <div className="product-card-wrapper" key={`veg-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="product-row-section">
        <div className="section-header">
          <h2>EXOTIC VEGETABLES</h2>
          <a href="/products" className="see-all">See All</a>
        </div>
        <div className="product-scroll-container">
          {EXOTIC_VEGETABLES.map(product => (
            <div className="product-card-wrapper" key={`exotic-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="product-row-section">
        <div className="section-header">
          <h2>FRUITS</h2>
          <a href="/products" className="see-all">See All</a>
        </div>
        <div className="product-scroll-container">
          {FRUITS.map(product => (
            <div className="product-card-wrapper" key={`fruit-${product.id}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
