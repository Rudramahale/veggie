import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, weight, price, originalPrice, image, discount } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        {discount && <div className="discount-badge">{discount}% OFF</div>}
        <img src={image} alt={name} className="product-image" loading="lazy" />
      </div>
      
      <div className="product-info">
        <h3 className="product-name text-truncate-2">{name}</h3>
        <p className="product-weight">{weight}</p>
        
        <div className="product-price-section">
          <div className="price-details">
            <span className="current-price">₹{price}</span>
            {originalPrice && <span className="original-price">₹{originalPrice}</span>}
          </div>
          <button className="add-to-cart-btn">ADD</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
