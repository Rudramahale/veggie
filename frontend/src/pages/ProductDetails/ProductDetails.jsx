import React from 'react';
import './ProductDetails.css';

const ProductDetails = () => {
  return (
    <div className="product-details-page container">
      <div className="product-details-layout">
        
        <div className="product-image-section">
          <div className="main-image-placeholder">
            <img src="/src/assets/images/products/shoes1.jpg" alt="Product" />
          </div>
        </div>

        <div className="product-info-section">
          <p className="product-brand">Amul</p>
          <h1 className="product-title">Amul Taaza Toned Fresh Milk</h1>
          <p className="product-weight-badge">500 ml</p>
          
          <div className="product-price-box">
            <div className="price-info">
              <span className="current-price">₹27</span>
              <span className="mrp text-muted">MRP <del>₹28</del></span>
              <span className="discount-tag">3% OFF</span>
            </div>
            <p className="tax-info text-muted">(Inclusive of all taxes)</p>
          </div>

          <button className="add-to-cart-large-btn">Add to Cart</button>

          <div className="product-description-box">
            <h3>Why shop from Blinkit?</h3>
            <ul className="perks-list">
              <li>
                <div className="perk-icon">⚡</div>
                <div className="perk-text">
                  <strong>Superfast Delivery</strong>
                  <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                </div>
              </li>
              <li>
                <div className="perk-icon">🛡️</div>
                <div className="perk-text">
                  <strong>Best Prices & Offers</strong>
                  <p>Cheaper prices than your local supermarket, great cashback offers to top it off.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
