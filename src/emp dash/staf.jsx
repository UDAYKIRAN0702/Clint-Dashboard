import React, { useState } from 'react';
import './staf.css';
import { Link } from 'react-router-dom';

const StaffLogin = () => {
  const [formData, setFormData] = useState({
    empId: '',
    username: '',
    password: '',
    role: 'Marketing',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert(`Logged in as ${formData.username} (${formData.role})`);
  };

  return (
    <div className="login-container">
      <h2>Employee Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option>Marketing</option>
          <option>Developer</option>
          <option>Admin</option>
          <option>Intern</option>
        </select>

        <label>Employee ID</label>
        <input
          type="text"
          name="empId"
          placeholder="Enter Employee ID"
          value={formData.empId}
          onChange={handleChange}
          required
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
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

        <button type="submit">Login</button>
        <Link to="pass">Forgot Password</Link>
      </form>
    </div>
  );
};

export default StaffLogin;
