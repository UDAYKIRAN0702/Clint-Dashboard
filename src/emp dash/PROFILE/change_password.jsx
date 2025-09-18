import React, { useState } from 'react';
import axios from 'axios';
import './change_password.css'; // optional CSS file

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

       const token = localStorage.getItem("access_token");
        // if (!token) {
        //   navigate("/login");
        //   return;
        // }

    try {
      // API call to change password
      const response = await axios.post('http://127.0.0.1:8000/api/change-password/', {
        new_password:newPassword,
        old_password:oldPassword
      },{  headers: {
            Authorization: `Bearer ${token}`,
          },}); 

      // Handle success
      setMessage(response.data.message || 'Password updated successfully!');
      setMessageType('success');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error)
      // Handle error
      if (error.response) {
        // Server responded with an error status
        setMessage(error.response.data.message || 'Failed to update password. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        setMessage('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setMessage('An unexpected error occurred. Please try again.');
      }
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength="6"
          />
        </div>

        <button 
          type="submit" 
          className={`btn ${isLoading ? 'btn-loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {message && (
        <p className={`message ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ChangePassword;