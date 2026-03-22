import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../store/AuthContext';
import './Auth.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }
    
    // Default Schema Bypass for direct access
    if (phone === '7020359284') {
      setStep(2);
      return;
    }
    
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = `+91${phone}`;
      
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep(2);
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Try again.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 6) return;
    
    // Default Schema Bypass for direct access
    if (phone === '7020359284' && otp === '123456') {
      login({
        id: 'default-user-id',
        name: 'Sanildefault',
        phone: '7020359284',
        email: 'sanil.landge07@gmail.com',
        role: 'customer'
      });
      navigate('/');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      const idToken = await user.getIdToken();
      
      const res = await fetch('http://localhost:8000/api/cart/auth/phone/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken })
      });
      
      const data = await res.json();
      
      if (res.status === 200) {
        login(data.user);
        navigate('/');
      } else if (res.status === 202) {
        navigate('/complete-profile', { state: { idToken, phone: data.phone } });
      } else {
        setError(data.error || 'Login failed');
      }
      
    } catch (err) {
      console.error(err);
      setError('Invalid OTP code');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back to Krishi Vikas</h2>
        <p className="auth-subtitle">Log in or Sign up</p>
        
        {error && <p className="error-message" style={{color:'red', fontSize:'12px', marginBottom:'10px'}}>{error}</p>}
        
        {step === 1 ? (
          <form className="auth-form" onSubmit={handleSendOtp}>
            <div className="input-group">
              <span className="country-code">+91</span>
              <input 
                type="tel" 
                placeholder="Enter mobile number" 
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
              />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleVerifyOtp}>
            <p style={{fontSize:'12px', marginBottom:'10px'}}>OTP sent to +91 {phone}</p>
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                disabled={loading}
                style={{textAlign:'center', letterSpacing:'5px'}}
              />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        <div id="recaptcha-container"></div>

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
