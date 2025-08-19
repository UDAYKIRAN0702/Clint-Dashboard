import React from 'react';
import './Dashboard.css';
export default function Dashboard() {
  return (
    <>
      <h1>Welcome to the Staff Dashboard</h1>
      <div className="grid-container">
        <div className="grid-item">
          <h1>HMS</h1>
          <p>Count: 0</p>
          <p>Earning Payment : 4000</p>
        </div>
        <div className="grid-item">
          <h1>Billing</h1>
          <p>Count: 0</p>
          <p>Earning Payment : 3000</p>
        </div>
        <div className="grid-item">
          <h1>EMS</h1>
          <p>Count: 0</p>
          <p>Earning Payment : 3000</p>
        </div>
        <div className="grid-item">
          <h1>CRM</h1>
          <p>Count: 0</p>
          <p>Earning Payment : 2500</p>
        </div>
         <div className="activity-section">
            <h2>Recent Activity</h2>
            <ul>
              <li>Suresh updated project status</li>
              <li>New payment of $500 received</li>
              <li>Client ABC Corp added</li>
            </ul>
          </div>

          {/* Announcements */}
          <div className="announcements">
            <h2>Announcements</h2>
            <p>📢 Staff meeting scheduled for Friday at 10 AM.</p>
            <p>📢 New Project Added</p>
          </div>
      </div>
    </>
  );
}
