import React, { useState } from 'react';
import './Bank Details.css';

function BankDetails() {
  const [formData, setFormData] = useState({
    employeeName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifscCode: '',
    mobileNumber: '',
    paymentType: 'Savings',
    upiNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bank Details Submitted:', formData);
    alert('Bank details saved successfully!');
  };

  return (
    <div className="bank-details-container">
      <h2>Bank Details</h2>
      <form onSubmit={handleSubmit} className="bank-details-form">
        <div className="form-grid">
          <label>
            Name:
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Branch Name:
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            IFSC Code:
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Linked Mobile Number:
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Payment Type:
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </label>

          <label>
            UPI ID:
            <input
              type="text"
              name="upiNumber"
              value={formData.upiNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">Save</button>
      </form>
    </div>
  );
}

export default BankDetails;
