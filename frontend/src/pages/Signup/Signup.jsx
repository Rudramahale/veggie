import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Auth.css'; // Reusing auth styles

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Join BlinkitClone</h2>
        <p className="auth-subtitle">Create an account to continue</p>
        
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <span className="country-code">+91</span>
            <input type="tel" placeholder="Enter mobile number" maxLength="10" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email Address (Optional)" />
          </div>
          
          <button type="submit" className="auth-submit-btn">Sign Up</button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
