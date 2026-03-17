import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import companyLogo from '../../assets/images/logo.jpeg';
import partner1 from '../../assets/images/partner1.jpeg';
import partner2 from '../../assets/images/partner2.jpeg';
import partner3 from '../../assets/images/partner3.jpeg';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo Section */}
        <Link to="/" className="brand-logo">
          <div className="partner-logos">
            <img src={partner1} alt="Partner 1" className="partner-img" />
            <img src={partner2} alt="Partner 2" className="partner-img" />
            <img src={partner3} alt="Partner 3" className="partner-img" />
          </div>
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
