import React from 'react';
import './Today_Business.css'; // Link your CSS

function TodayBusines() {
  return (
    <div className="today-business">
      <h1>Today Business</h1>

      <div className="business-grid">
        <div className="business-card">
          <h2>HMS</h2>
          <p>Leads Generated: 10</p>
          <p>Leads Closed: 3</p>
        </div>

        <div className="business-card">
          <h2>EMS</h2>
          <p>Leads Generated: 8</p>
          <p>Leads Closed: 2</p>
        </div>

        <div className="business-card">
          <h2>CRM</h2>
          <p>Leads Generated: 12</p>
          <p>Leads Closed: 5</p>
        </div>

        <div className="business-card">
          <h2>Billing</h2>
          <p>Leads Generated: 6</p>
          <p>Leads Closed: 1</p>
        </div>
      </div>
    </div>
  );
}

export default TodayBusines;
