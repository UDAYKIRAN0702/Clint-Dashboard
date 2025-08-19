import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Info.css";

export default function Info({ data, onSave }) {
  const [formData, setFormData] = useState(
    data || { name: "", email: "", phone: "", department: "", profileImage: "" }
  );
  const [preview, setPreview] = useState(data?.profileImage || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <div className="info-container">
      <h2 className="info-title">Personal Info</h2>
      <form onSubmit={handleSubmit} className="info-form">
        {/* Profile Image Upload */}
        <div className="profile-upload">
          {preview ? (
            <img src={preview} alt="Profile Preview" className="profile-preview" />
          ) : (
            <div className="profile-placeholder">No Image</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </label>

        <label>
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
          />
        </label>

        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
}

Info.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    department: PropTypes.string,
    profileImage: PropTypes.string,
  }),
  onSave: PropTypes.func,
};
