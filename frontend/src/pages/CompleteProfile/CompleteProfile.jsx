import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import '../Login/Auth.css';

const CompleteProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  if (!location.state || !location.state.idToken) {
    navigate('/login');
    return null;
  }
  
  const { idToken } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Both fields are required');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/cart/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken, name, email })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.user);
        navigate('/');
      } else {
        setError(data.error || 'Failed to complete profile');
      }
    } catch (err) {
      setError('An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Almost there!</h2>
        <p className="auth-subtitle">Finish setting up your profile</p>
        
        {error && <p className="error-message" style={{color:'red', fontSize:'12px', marginBottom:'10px'}}>{error}</p>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group" style={{marginBottom: '15px'}}>
            <input 
              type="text" 
              placeholder="Your Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              style={{width: '100%', padding: '10px 15px', border: 'none', outline: 'none'}}
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Your Email ID" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{width: '100%', padding: '10px 15px', border: 'none', outline: 'none'}}
            />
          </div>
          <button type="submit" className="auth-submit-btn" disabled={loading} style={{marginTop: '20px'}}>
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
