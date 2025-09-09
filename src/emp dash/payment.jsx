import React, { useEffect, useState } from "react";
import axios from "axios";
import "./payment.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    client_name: "",
    Contact_person: "",
    project_amount: "",
    my_percentage: "",
    withdraw_payment: "Pending"
  });

  // API base URL - replace with your actual Django API endpoint
  const API_BASE_URL = "http://127.0.0.1:8000/api/adminpayments/";

  // API configuration
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      // Add authentication headers if needed
      // "Authorization": `Bearer ${token}`
    }
  });

  // Add a request interceptor to handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      setError(`API Error: ${error.message}`);
      return Promise.reject(error);
    }
  );

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/");
      
      // Check if response data is in the expected format
      if (response.data && Array.isArray(response.data)) {
        setPayments(response.data);
      } else if (response.data && response.data.results) {
        // Handle case where API returns paginated results
        setPayments(response.data.results);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (err) {
      setError(`Failed to fetch payments: ${err.message}`);
      console.error("Fetch error:", err);
      
      // Fallback to sample data if API is not available
      if (err.code === "ERR_NETWORK" || err.response?.status === 404) {
        setPayments([
          {
            id: 1,
            client_name: "ABC Pvt Ltd",
            Contact_person: "John Doe",
            project_amount: "5000",
            my_commission: "500",
            my_percentage: "10%",
            total_pay: "5500",
            withdraw_payment: "Pending",
          },
          {
            id: 2,
            client_name: "XYZ Solutions",
            Contact_person: "Jane Smith",
            project_amount: "8000",
            my_commission: "800",
            my_percentage: "10%",
            total_pay: "8800",
            withdraw_payment: "Paid",
          },
        ]);
        setError("Using sample data (API not available)");
      }
    } finally {
      setLoading(false);
    }
  };

  // Create a new payment
  const createPayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Ensure data matches Django model field names exactly
      const formattedData = {
        client_name: paymentData.client_name,
        Contact_person: paymentData.Contact_person,
        project_amount: paymentData.project_amount,
        my_percentage: paymentData.my_percentage,
        withdraw_payment: paymentData.withdraw_payment,
        // These will be calculated by the backend or frontend
        my_commission: paymentData.my_commission,
        total_pay: paymentData.total_pay
      };
      
      const response = await api.post("/", formattedData);
      setPayments([...payments, response.data]);
      setShowAddForm(false);
      setFormData({
        client_name: "",
        Contact_person: "",
        project_amount: "",
        my_percentage: "",
        withdraw_payment: "Pending"
      });
      return response.data;
    } catch (err) {
      setError(`Failed to create payment: ${err.message}`);
      console.error("Create error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a payment
  const updatePayment = async (id, paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const formattedData = {
        client_name: paymentData.client_name,
        Contact_person: paymentData.Contact_person,
        project_amount: paymentData.project_amount,
        my_percentage: paymentData.my_percentage,
        withdraw_payment: paymentData.withdraw_payment,
        my_commission: paymentData.my_commission,
        total_pay: paymentData.total_pay
      };
      
      const response = await api.put(`/${id}/`, formattedData);
      setPayments(payments.map(payment => 
        payment.id === id ? response.data : payment
      ));
      setEditingPayment(null);
      return response.data;
    } catch (err) {
      setError(`Failed to update payment: ${err.message}`);
      console.error("Update error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a payment
  const deletePayment = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/${id}/`);
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (err) {
      setError(`Failed to delete payment: ${err.message}`);
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate derived values based on project amount and percentage
  const calculateValues = (projectAmount, percentage) => {
    const amount = parseFloat(projectAmount) || 0;
    const percent = parseFloat(percentage) || 0;
    const commission = (amount * percent) / 100;
    const total = amount + commission;
    
    return {
      my_commission: commission.toFixed(2),
      total_pay: total.toFixed(2),
      my_percentage: `${percent}%`
    };
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...formData,
      [name]: value
    };
    
    // Recalculate values if project amount or percentage changes
    if (name === "project_amount" || name === "my_percentage") {
      const calculated = calculateValues(
        name === "project_amount" ? value : updatedForm.project_amount,
        name === "my_percentage" ? value : updatedForm.my_percentage
      );
      setFormData({
        ...updatedForm,
        ...calculated
      });
    } else {
      setFormData(updatedForm);
    }
  };

  // Handle form submission for new payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPayment(formData);
    } catch (err) {
      // Error is already handled in createPayment
    }
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const calculated = calculateValues(
        editingPayment.project_amount,
        editingPayment.my_percentage.replace('%', '')
      );
      const paymentData = {
        ...editingPayment,
        ...calculated
      };
      await updatePayment(editingPayment.id, paymentData);
    } catch (err) {
      // Error is already handled in updatePayment
    }
  };

  // Start editing a payment
  const startEditing = (payment) => {
    setEditingPayment({
      ...payment,
      my_percentage: payment.my_percentage.replace('%', '')
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingPayment(null);
  };

  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((p) =>
    [p.id, p.client_name, p.Contact_person]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="payments-container">
      <div className="payments-header">
        <h1>Payment Management</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search by ID, Client Name, Contact Person..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="payments-search"
          />
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
            disabled={loading}
          >
            Add New Payment
          </button>
          <button 
            className="btn btn-secondary"
            onClick={fetchPayments}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className={`error-alert ${error.includes("sample data") ? "warning" : ""}`}>
          <span>{error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {loading && <div className="loading-spinner">Loading payments...</div>}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Payment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Client Name:</label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Person:</label>
                <input
                  type="text"
                  name="Contact_person"
                  value={formData.Contact_person}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Amount:</label>
                <input
                  type="number"
                  name="project_amount"
                  value={formData.project_amount}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>My Percentage:</label>
                <input
                  type="number"
                  name="my_percentage"
                  value={formData.my_percentage}
                  onChange={handleInputChange}
                  required
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>My Commission:</label>
                <input
                  type="text"
                  value={formData.my_commission || ""}
                  disabled
                  className="disabled-input"
                />
              </div>
              <div className="form-group">
                <label>Total Pay:</label>
                <input
                  type="text"
                  value={formData.total_pay || ""}
                  disabled
                  className="disabled-input"
                />
              </div>
              <div className="form-group">
                <label>Payment Status:</label>
                <select
                  name="withdraw_payment"
                  value={formData.withdraw_payment}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Create Payment
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowAddForm(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingPayment && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Payment</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Client Name:</label>
                <input
                  type="text"
                  name="client_name"
                  value={editingPayment.client_name}
                  onChange={(e) => setEditingPayment({...editingPayment, client_name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Person:</label>
                <input
                  type="text"
                  name="Contact_person"
                  value={editingPayment.Contact_person}
                  onChange={(e) => setEditingPayment({...editingPayment, Contact_person: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Amount:</label>
                <input
                  type="number"
                  name="project_amount"
                  value={editingPayment.project_amount}
                  onChange={(e) => setEditingPayment({...editingPayment, project_amount: e.target.value})}
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>My Percentage:</label>
                <input
                  type="number"
                  name="my_percentage"
                  value={editingPayment.my_percentage}
                  onChange={(e) => setEditingPayment({...editingPayment, my_percentage: e.target.value})}
                  required
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>My Commission:</label>
                <input
                  type="text"
                  value={calculateValues(
                    editingPayment.project_amount, 
                    editingPayment.my_percentage
                  ).my_commission}
                  disabled
                  className="disabled-input"
                />
              </div>
              <div className="form-group">
                <label>Total Pay:</label>
                <input
                  type="text"
                  value={calculateValues(
                    editingPayment.project_amount, 
                    editingPayment.my_percentage
                  ).total_pay}
                  disabled
                  className="disabled-input"
                />
              </div>
              <div className="form-group">
                <label>Payment Status:</label>
                <select
                  name="withdraw_payment"
                  value={editingPayment.withdraw_payment}
                  onChange={(e) => setEditingPayment({...editingPayment, withdraw_payment: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Update Payment
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={cancelEditing}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!loading && !error && filteredPayments.length === 0 && (
        <div className="no-data">
          <p>No payments found.</p>
        </div>
      )}

      {!loading && filteredPayments.length > 0 && (
        <div className="table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client Name</th>
                <th>Contact Person</th>
                <th>Project Amount</th>
                <th>My Commission</th>
                <th>My Percentage</th>
                <th>Total Pay</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.client_name}</td>
                  <td>{payment.Contact_person}</td>
                  <td>${parseFloat(payment.project_amount).toLocaleString()}</td>
                  <td>${parseFloat(payment.my_commission).toLocaleString()}</td>
                  <td>{payment.my_percentage}</td>
                  <td>${parseFloat(payment.total_pay).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${payment.withdraw_payment.toLowerCase()}`}>
                      {payment.withdraw_payment}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon edit"
                        onClick={() => startEditing(payment)}
                        title="Edit"
                        disabled={loading}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this payment?')) {
                            deletePayment(payment.id);
                          }
                        }}
                        title="Delete"
                        disabled={loading}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}