import React from 'react';
import { Minus, Plus, Trash2, Info } from 'lucide-react';
import { useCart } from '../../store/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity } = useCart();
  const items = cart.items || [];
  const bill = cart.bill_details || {};

  if (items.length === 0) {
    return (
      <div className="cart-page container empty-cart">
        <h2>Your Cart is empty</h2>
        <a href="/" className="continue-shopping">Start Shopping</a>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-layout">
        
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <div className="cart-items-list">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                
                <div className="cart-item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-weight">1 pc</p>
                  <span className="cart-item-price">₹{item.price}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.product_id, 'decrement')}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.product_id, 'increment')}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="cart-summary-section">
          <h3>Bill details</h3>
          
          <div className="bill-row">
            <span>Items total</span>
            <span>₹{bill.items_total}</span>
          </div>
          <div className="bill-row">
            <span>Delivery charge <Info size={12} className="info-icon" /></span>
            <span>₹{bill.delivery_charge}</span>
          </div>
          <div className="bill-row">
            <span>Handling charge <Info size={12} className="info-icon" /></span>
            <span>₹{bill.handling_charge}</span>
          </div>
          {bill.small_cart_charge > 0 && (
            <div className="bill-row">
              <span>Small cart charge <Info size={12} className="info-icon" /></span>
              <span>₹{bill.small_cart_charge}</span>
            </div>
          )}
          
          <div className="bill-row grand-total">
            <span>Grand total <Info size={12} className="info-icon" /></span>
            <span>₹{bill.grand_total}</span>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="cancellation-policy">
          <h4>Cancellation Policy</h4>
          <p>Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
        </div>

      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed-bottom-bar">
        <div className="bottom-total-box">
          <div className="total-left">
            <span className="total-amount">₹{bill.grand_total}</span>
            <span className="total-label">TOTAL</span>
          </div>
          <a href="/login" className="login-proceed-btn">
            Login to Proceed <span className="arrow-right">›</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
