import React from 'react';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page container">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-header">
            <div className="profile-avatar">S</div>
            <div className="profile-info">
              <h3>Surya</h3>
              <p>+91 9876543210</p>
            </div>
          </div>
          <nav className="profile-nav">
            <a href="#" className="active"><User size={20} /> My Profile</a>
            <a href="#"><Package size={20} /> Orders</a>
            <a href="#"><MapPin size={20} /> Addresses</a>
            <a href="#"><Settings size={20} /> Settings</a>
            <a href="#" className="logout-link"><LogOut size={20} /> Logout</a>
          </nav>
        </aside>

        <main className="profile-content">
          <h2>My Profile</h2>
          <div className="profile-card">
            <div className="info-row">
              <span className="info-label">Name</span>
              <span className="info-value">Surya Developer</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">+91 9876543210</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">surya@example.com</span>
            </div>
            <button className="edit-btn">Edit Profile</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
