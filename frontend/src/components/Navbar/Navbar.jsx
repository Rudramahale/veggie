import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import companyLogo from '../../assets/images/logo.jpeg';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo Section */}
        <Link to="/" className="brand-logo">
          <img src={companyLogo} alt="Krishi Vikas Logo" className="logo-img" />
          <div className="brand-title">
            FARMER PRODUCER<br/>COMPANY
          </div>
        </Link>

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
