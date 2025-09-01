import React, { useState } from "react";
import "./Fieldwork.css";

function Fieldwork() {
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState({
    fieldName: "",
    timestamp: "",
    location: "",
    purpose: "",
    leadStatus: "",
    projectValue: "",
    photos: null,
    bills: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Fieldwork data submitted!");
  };

  return (
    <div className="fieldwork-container">
      {/* Navigation Tabs */}
      <div className="tab-nav">
        <button
          className={activeTab === "form" ? "active" : ""}
          onClick={() => setActiveTab("form")}
        >
          Fieldwork Form
        </button>
        <button
          className={activeTab === "bills" ? "active" : ""}
          onClick={() => setActiveTab("bills")}
        >
          Bills Upload
        </button>
      </div>

      {/* Fieldwork Form */}
      {activeTab === "form" && (
        <div className="form-section">
          <h2>Fieldwork Form</h2>
          <form onSubmit={handleSubmit}>
            <label>Field Name:</label>
            <input
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleChange}
              required
            />

            <label>Timestamp:</label>
            <input
              type="datetime-local"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              required
            />

            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Purpose:</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />

            <label>Upload Photos:</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handleChange}
            />

            <label>Lead Status:</label>
            <select
              name="leadStatus"
              value={formData.leadStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            <label>Project Value:</label>
            <input
              type="number"
              name="projectValue"
              value={formData.projectValue}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Bills Upload */}
      {activeTab === "bills" && (
        <div className="bills-section">
          <h2>Bills Upload</h2>
          <label>Upload All Bills:</label>
          <input
            type="file"
            name="bills"
            accept="application/pdf,image/*"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default Fieldwork;
