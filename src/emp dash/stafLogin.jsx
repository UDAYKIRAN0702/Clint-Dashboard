import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./StafLogin.css";

const StafLogin = () => {
  // State management
  const [formData, setFormData] = useState({
    employee_id: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    identifier: "",
    new_password: "",
    confirm_password: "",
  });
  const [changePasswordData, setChangePasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use navigate hook for redirection
  const navigate = useNavigate();

  // API base URL - update with your actual API URL
  const API_BASE_URL = "http://127.0.0.1:8000/api";

  // Handle login form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle forgot password form input changes
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change password form input changes
  const handleChangePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Login API call
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, formData);
      
      // Store tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      
      // Set user info
      setUserInfo({
        employee_id: response.data.employee_id,
        name: response.data.name,
        role: response.data.role,
      });
      
      setMessage("Login successful!");
      setIsError(false);
      
      // Navigate to dashboard after successful login
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.error || "Login failed. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password API call
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (forgotPasswordData.new_password !== forgotPasswordData.confirm_password) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = {
        identifier: forgotPasswordData.identifier,
        password: forgotPasswordData.new_password
      };
      
      await axios.post(`${API_BASE_URL}/forgot-password/`, payload);
      
      setMessage("Password reset successfully. You can now login with your new password.");
      setIsError(false);
      setShowForgotPassword(false);
      setForgotPasswordData({
        identifier: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage(error.response?.data?.error || "Password reset failed. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Change password API call
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (changePasswordData.new_password !== changePasswordData.confirm_password) {
      setMessage("New passwords do not match");
      setIsError(true);
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = {
        old_password: changePasswordData.old_password,
        new_password: changePasswordData.new_password
      };
      
      const token = localStorage.getItem("access_token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      await axios.post(`${API_BASE_URL}/change-password/`, payload, config);
      
      setMessage("Password changed successfully.");
      setIsError(false);
      setShowChangePassword(false);
      setChangePasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Change password error:", error);
      setMessage(error.response?.data?.error || "Password change failed. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUserInfo(null);
    setMessage("Logged out successfully.");
    setIsError(false);
  };

  return (
    <div className="login-container">
      {userInfo ? (
        // Dashboard after login
        <div className="dashboard">
          <h2>Welcome, {userInfo.name}!</h2>
          <p>Employee ID: {userInfo.employee_id}</p>
          <p>Role: {userInfo.role}</p>
          
          <div className="dashboard-actions">
            <button 
              onClick={() => setShowChangePassword(true)}
              className="change-password-btn"
            >
              Change Password
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      ) : (
        // Login form
        <>
          <h2>Employee Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label>Employee ID</label>
            <input
              type="text"
              name="employee_id"
              placeholder="Enter Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            
            <p
              className="forgot-link"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </p>
          </form>
        </>
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reset Password</h2>
            <form onSubmit={handleForgotPassword}>
              <label>Employee ID or Email</label>
              <input
                type="text"
                name="identifier"
                placeholder="Enter your Employee ID or Email"
                value={forgotPasswordData.identifier}
                onChange={handleForgotPasswordChange}
                required
              />
              
              <label>New Password</label>
              <input
                type="password"
                name="new_password"
                placeholder="Enter new password"
                value={forgotPasswordData.new_password}
                onChange={handleForgotPasswordChange}
                required
              />
              
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
                value={forgotPasswordData.confirm_password}
                onChange={handleForgotPasswordChange}
                required
              />
              
              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <label>Current Password</label>
              <input
                type="password"
                name="old_password"
                placeholder="Enter current password"
                value={changePasswordData.old_password}
                onChange={handleChangePasswordChange}
                required
              />
              
              <label>New Password</label>
              <input
                type="password"
                name="new_password"
                placeholder="Enter new password"
                value={changePasswordData.new_password}
                onChange={handleChangePasswordChange}
                required
              />
              
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
                value={changePasswordData.confirm_password}
                onChange={handleChangePasswordChange}
                required
              />
              
              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Changing..." : "Change Password"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowChangePassword(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message display */}
      {message && (
        <div className={`message ${isError ? "error" : "success"}`}>
          {message}
          <button onClick={() => setMessage("")} className="close-btn">
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default StafLogin;