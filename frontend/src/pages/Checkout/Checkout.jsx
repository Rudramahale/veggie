import React from 'react';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkout-page container">
      <h2>Checkout Securely</h2>
      
      <div className="checkout-layout">
        <div className="checkout-form-section">
          <div className="checkout-step">
            <h3>1. Delivery Address</h3>
            <div className="address-form">
              <input type="text" placeholder="House / Flat / Block No." />
              <input type="text" placeholder="Apartment / Road / Area" />
              <input type="text" placeholder="Landmark (Optional)" />
              <div className="row-inputs">
                <input type="text" placeholder="Pin Code" />
                <input type="text" placeholder="City" />
              </div>
              <button className="btn-save-address">Save Address</button>
            </div>
          </div>

          <div className="checkout-step disable-step">
            <h3>2. Payment options</h3>
            <p className="text-muted">Please save address to proceed to payment</p>
          </div>
        </div>

        <div className="checkout-summary-section">
          <h3>Order Summary</h3>
          <p className="text-muted">3 items in cart</p>
          <div className="bill-row grand-total">
            <span>To Pay</span>
            <span>₹297</span>
          </div>
          <button className="place-order-btn disabled" disabled>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
