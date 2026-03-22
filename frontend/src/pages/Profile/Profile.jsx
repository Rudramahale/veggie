import React, { useState } from 'react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="profile-page container">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-avatar">{getInitials(user.name)}</div>
            <div className="profile-info">
              <h3>{user.name || 'User'}</h3>
              <p>{user.phone ? `+91 ${user.phone}` : ''}</p>
            </div>
          </div>
          <nav className="profile-nav">
            <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><User size={20} /> My Profile <ChevronRight size={16} className="arrow" /></button>
            <button className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><Package size={20} /> My Orders <ChevronRight size={16} className="arrow" /></button>
            <button className={`nav-btn ${activeTab === 'addresses' ? 'active' : ''}`} onClick={() => setActiveTab('addresses')}><MapPin size={20} /> Saved Addresses <ChevronRight size={16} className="arrow" /></button>
            <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Settings <ChevronRight size={16} className="arrow" /></button>
            <button className="nav-btn logout-link" onClick={handleLogout}><LogOut size={20} /> Logout</button>
          </nav>
        </aside>

        <main className="profile-content">
          {activeTab === 'profile' && (
            <div className="tab-pane fade-in">
              <h2>My Profile</h2>
              <div className="profile-card">
                <div className="info-row">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.name || 'Not provided'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{user.phone ? `+91 ${user.phone}` : 'Not provided'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user.email || 'Not provided'}</span>
                </div>
                <button className="edit-btn">Edit Profile</button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="tab-pane fade-in">
              <h2>My Orders</h2>
              <div className="profile-card empty-state">
                <Package size={48} color="var(--text-muted)" style={{marginBottom: '15px'}} />
                <p style={{marginBottom: '15px', color: 'var(--text-secondary)'}}>You haven't placed any orders yet.</p>
                <button className="edit-btn" onClick={() => navigate('/products')}>Start Shopping</button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="tab-pane fade-in">
              <h2>Saved Addresses</h2>
              <div className="profile-card empty-state">
                <MapPin size={48} color="var(--text-muted)" style={{marginBottom: '15px'}} />
                <p style={{marginBottom: '15px', color: 'var(--text-secondary)'}}>No saved addresses found.</p>
                <button className="edit-btn">Add New Address</button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-pane fade-in">
              <h2>Settings</h2>
              <div className="profile-card">
                <p style={{color: 'var(--text-secondary)'}}>Account settings and preferences would go here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
