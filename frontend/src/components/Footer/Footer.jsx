import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="contact-us" style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
          <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Contact Us</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '0' }}>
            <li style={{ marginBottom: '15px' }}>
              <strong>Mr. Santosh Hase</strong><br />
              CHAIRMAN<br />
              Farmer Producer Company<br />
              Contact No: 9850119046
            </li>
            <li>
              <strong>Mr. Chetan Waghulade</strong><br />
              PROGRAM MANAGER<br />
              Yuva Mitra, Sinnar<br />
              Contact No: 8275270439
            </li>
          </ul>
        </div>
        <div style={{ width: '100%', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
          <p style={{ textAlign: 'center', margin: '0' }}>&copy; 2026 Farmer Producer Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
