import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import './Cart.css';

const CART_ITEMS = [
  { id: 1, name: 'Amul Taaza Toned Fresh Milk', weight: '500 ml', price: 27, quantity: 2, image: '/src/assets/images/products/shoes1.jpg' },
  { id: 2, name: 'Britannia NutriChoice', weight: '1 kg', price: 150, quantity: 1, image: '/src/assets/images/products/tshirt1.jpg' },
];

const Cart = () => {
  const itemTotal = CART_ITEMS.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const grandTotal = itemTotal + deliveryFee;

  return (
    <div className="cart-page container">
      <div className="cart-layout">
        
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <h2>My Cart ({CART_ITEMS.length} Items)</h2>
          
          <div className="cart-items-list">
            {CART_ITEMS.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.weight}</p>
                  <span className="cart-item-price">₹{item.price}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button><Plus size={14} /></button>
                  </div>
                  <button className="remove-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="cart-summary-section">
          <h3>Bill Details</h3>
          
          <div className="bill-row">
            <span>Item Total</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          
          <div className="bill-divider"></div>
          
          <div className="bill-row grand-total">
            <span>To Pay</span>
            <span>₹{grandTotal}</span>
          </div>

          <a href="/checkout" className="checkout-btn">
            Proceed to Checkout
          </a>
        </div>

      </div>
    </div>
  );
};

export default Cart;
