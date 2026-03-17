import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>India's last minute app</h2>
        <p className="auth-subtitle">Log in or Sign up</p>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <span className="country-code">+91</span>
            <input type="tel" placeholder="Enter mobile number" maxLength="10" />
          </div>
          
          <button type="submit" className="auth-submit-btn">Continue</button>
        </form>

        <p className="auth-terms">
          By continuing, you agree to our <a href="#">Terms of service</a> & <a href="#">Privacy policy</a>
        </p>

        <div className="auth-footer">
          New here? <Link to="/signup">Sign up instead</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
