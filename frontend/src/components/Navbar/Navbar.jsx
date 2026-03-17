import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Search } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo Section */}
        <Link to="/" className="brand-logo">
          <h1>Blinkit<span className="clone-tag">Clone</span></h1>
        </Link>

        {/* Location Section */}
        <div className="location-box hide-on-mobile">
          <MapPin size={24} className="location-icon" />
          <div className="location-text">
            <h4>Delivery in 10 minutes</h4>
            <p className="text-truncate">Select your location to see availability</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <SearchBar />
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          <Link to="/login" className="login-btn hide-on-mobile">Login</Link>
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            <div className="cart-details">
              <span className="cart-items">0 items</span>
              <span className="cart-price">₹0</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
