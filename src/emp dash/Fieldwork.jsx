import React, { useState } from "react";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files : value,
    });
  };

  // API call for Fieldwork Form
  const submitFieldworkForm = async (data) => {
    setLoading(true);
    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append("fieldName", data.fieldName);
      formDataToSend.append("timestamp", data.timestamp);
      formDataToSend.append("location", data.location);
      formDataToSend.append("purpose", data.purpose);
      formDataToSend.append("leadStatus", data.leadStatus);
      formDataToSend.append("projectValue", data.projectValue);
      
      // Append photos if available
      if (data.photos) {
        for (let i = 0; i < data.photos.length; i++) {
          formDataToSend.append("photos", data.photos[i]);
        }
      }
      
      const response = await axios.post(
        "http://127.0.0.1:8000/api/fieldwork/", // Replace with your API endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setMessage("Fieldwork data submitted successfully!");
      console.log("API Response:", response.data);
      
      // Reset form after successful submission
      setFormData({
        fieldName: "",
        timestamp: "",
        location: "",
        purpose: "",
        leadStatus: "",
        projectValue: "",
        photos: null,
        bills: null,
      });
    } catch (error) {
      console.error("Error submitting fieldwork form:", error);
      setMessage("Error submitting fieldwork data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // API call for Bills Upload
  const uploadBills = async (bills) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      
      // Append bills if available
      if (bills) {
        for (let i = 0; i < bills.length; i++) {
          formDataToSend.append("bills", bills[i]);
        }
      }
      
      const response = await axios.post(
        "http://127.0.0.1:8000/api/billsupload/", // Replace with your API endpoint
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setMessage("Bills uploaded successfully!");
      console.log("API Response:", response.data);
      
      // Clear bills after successful upload
      setFormData({
        ...formData,
        bills: null,
      });
    } catch (error) {
      console.error("Error uploading bills:", error);
      setMessage("Error uploading bills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFieldworkForm(formData);
  };

  const handleBillsSubmit = () => {
    if (formData.bills) {
      uploadBills(formData.bills);
    } else {
      setMessage("Please select bills to upload.");
    }
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

      {message && <div className="message">{message}</div>}
      {loading && <div className="loading">Submitting...</div>}

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

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
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
            multiple
            onChange={handleChange}
          />
          <button 
            onClick={handleBillsSubmit} 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Bills"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Fieldwork;