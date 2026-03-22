import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, ChevronDown, LogOut } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import companyLogo from '../../assets/images/logo.jpeg';
import partner1 from '../../assets/images/partner1.jpeg';
import partner2 from '../../assets/images/partner2.jpeg';
import partner3 from '../../assets/images/partner3.jpeg';
import { useCart } from '../../store/CartContext';
import { useAuth } from '../../store/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

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
          {user ? (
            <div 
              className="user-dropdown-container" 
              onMouseEnter={() => setDropdownOpen(true)} 
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="user-dropdown-btn" style={{display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', color: 'var(--text-primary)'}}>
                Hey, {user.name ? user.name.split(' ')[0] : 'User'} <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="user-dropdown-menu" style={{position: 'absolute', top: '100%', right: '0', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', minWidth: '150px', zIndex: 1000, padding: '10px 0', display: 'flex', flexDirection: 'column'}}>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', textDecoration: 'none', color: 'var(--text-primary)', transition: 'background-color 0.2s'}}>
                    <User size={16} /> My Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-item" style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', textDecoration: 'none', color: '#ff4d4f', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'background-color 0.2s'}}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn hide-on-mobile">Login</Link>
          )}
          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={20} />
            <div className="cart-details">
              <span className="cart-items">
                {cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0} items
              </span>
              <span className="cart-price">
                ₹{cart.bill_details ? cart.bill_details.items_total || 0 : 0}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
