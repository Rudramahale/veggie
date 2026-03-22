import React from 'react';
import { useCart } from '../../store/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, weight, price, originalPrice, image, discount } = product;
  const { getItemQuantity, addToCart, updateQuantity } = useCart();

  const quantity = getItemQuantity(id);

  const handleAdd = () => addToCart(id);
  const handleIncrement = () => updateQuantity(id, 'increment');
  const handleDecrement = () => updateQuantity(id, 'decrement');

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
          {quantity > 0 ? (
            <div className="cart-controls">
              <button className="qty-btn" onClick={handleDecrement}>-</button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-btn" onClick={handleIncrement}>+</button>
            </div>
          ) : (
            <button className="add-to-cart-btn" onClick={handleAdd}>ADD</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
