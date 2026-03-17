import React from 'react';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="export-btn">Export Report</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue"><ShoppingBag size={24} /></div>
          <div className="stat-info">
            <p className="stat-title">Total Orders</p>
            <h3 className="stat-value">1,248</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green"><DollarSign size={24} /></div>
          <div className="stat-info">
            <p className="stat-title">Total Revenue</p>
            <h3 className="stat-value">₹8,45,200</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple"><Users size={24} /></div>
          <div className="stat-info">
            <p className="stat-title">New Users</p>
            <h3 className="stat-value">342</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange"><Activity size={24} /></div>
          <div className="stat-info">
            <p className="stat-title">Active Sessions</p>
            <h3 className="stat-value">86</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-8492</td>
                  <td>Surya</td>
                  <td>Oct 24, 2026</td>
                  <td>₹450</td>
                  <td><span className="status-badge status-delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td>#ORD-8491</td>
                  <td>Priya</td>
                  <td>Oct 24, 2026</td>
                  <td>₹1,200</td>
                  <td><span className="status-badge status-processing">Processing</span></td>
                </tr>
                <tr>
                  <td>#ORD-8490</td>
                  <td>Rahul</td>
                  <td>Oct 24, 2026</td>
                  <td>₹80</td>
                  <td><span className="status-badge status-shipped">Shipped</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
