import React, { useState } from "react";
import "./stafLogin.css";

const StaffLogin = () => {
  const [formData, setFormData] = useState({
    empId: "",
    username: "",
    password: "",
    role: "Marketing",
  });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert(`Logged in as ${formData.username} (${formData.role})`);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setMessage("Please enter your email.");
      return;
    }
    console.log("Sending reset link to:", forgotEmail);
    setMessage("Password reset link has been sent to your email.");
    setForgotEmail("");
  };

  return (
    <div className="login-container">
      {!showForgot ? (
        <>
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
            <p
              className="forgot-link"
              onClick={() => setShowForgot(true)}
              style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
            >
              Forgot Password?
            </p>
          </form>
        </>
      ) : (
        <>
          <h2>Forgot Password</h2>
          <form className="login-form" onSubmit={handleForgot}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
            <p
              className="back-link"
              onClick={() => setShowForgot(false)}
              style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
            >
              Back to Login
            </p>
          </form>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default StaffLogin;
