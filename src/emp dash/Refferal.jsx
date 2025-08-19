import React from 'react';
import './Refferal.css';

function Refferal() {
  const referralData = [
    { title: 'HMS', count: 0, earning: 4000 },
    { title: 'Billing', count: 0, earning: 3000 },
    { title: 'EMS', count: 0, earning: 3000 },
    { title: 'CRM', count: 0, earning: 2500 },
  ];

  return (
  
    <div className="refer">
      <h1>Refferal</h1>
      <div className="grid-container">
        {referralData.map((item, index) => (
          <div className="grid-item" key={index}>
            <h1>{item.title}</h1>
            <p>Count: {item.count}</p>
            <p>Earning Payment: {item.earning}</p>
            <h2>Referral</h2>
            <div className="referral-link">
              <label>
                Referral Link:
                <input
                  type="text"
                  placeholder="https://referral-link for this"
                  readOnly
                />
              </label>
              <button>Share Link</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Refferal;
