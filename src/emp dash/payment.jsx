import React, { useEffect, useState } from "react";
import "./payment.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Example fetch simulation (replace with API call)
  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        setPayments([
          {
            id: "C001",
            clientName: "ABC Pvt Ltd",
            contactPerson: "John Doe",
            referralAmount: 5000,
            myCommission: 500,
            myPercent: "10%",
            totalPay: 5500,
            withdrawPayment: "Pending",
          },
          {
            id: "C002",
            clientName: "XYZ Solutions",
            contactPerson: "Jane Smith",
            referralAmount: 8000,
            myCommission: 800,
            myPercent: "10%",
            totalPay: 8800,
            withdrawPayment: "Paid",
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const filteredPayments = payments.filter((p) =>
    [p.id, p.clientName, p.contactPerson]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Open modal for editing
  const handleEdit = (payment) => {
    setEditData(payment);
    setShowModal(true);
  };

  // Save changes
  const handleSave = () => {
    setPayments(
      payments.map((p) => (p.id === editData.id ? { ...editData } : p))
    );
    setShowModal(false);
  };

  // Handle form input change
  const handleChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  return (
    <div className="payments-container">
      <div className="payments-header">
        <h1>Payments</h1>
        <input
          type="text"
          placeholder="Search by ID, Client Name, Contact Person..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="payments-search"
        />
      </div>

      {loading && <p className="loading-text">Loading payments...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {!loading && !error && filteredPayments.length === 0 && (
        <p className="no-data">No matching payments found.</p>
      )}

      {!loading && !error && filteredPayments.length > 0 && (
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
                <th>Withdraw Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.clientName}</td>
                  <td>{payment.contactPerson}</td>
                  <td>{payment.referralAmount}</td>
                  <td>{payment.myCommission}</td>
                  <td>{payment.myPercent}</td>
                  <td>{payment.totalPay}</td>
                  <td>{payment.withdrawPayment}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(payment)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Payment</h2>
            <form>
              <label>
                Client Name:
                <input
                  type="text"
                  value={editData.clientName}
                  onChange={(e) => handleChange(e, "clientName")}
                />
              </label>
              <label>
                Contact Person:
                <input
                  type="text"
                  value={editData.contactPerson}
                  onChange={(e) => handleChange(e, "contactPerson")}
                />
              </label>
              <label>
                Project Amount:
                <input
                  type="number"
                  value={editData.referralAmount}
                  onChange={(e) => handleChange(e, "referralAmount")}
                />
              </label>
              <label>
                My Commission:
                <input
                  type="number"
                  value={editData.myCommission}
                  onChange={(e) => handleChange(e, "myCommission")}
                />
              </label>
              <label>
                My Percentage:
                <input
                  type="text"
                  value={editData.myPercent}
                  onChange={(e) => handleChange(e, "myPercent")}
                />
              </label>
              <label>
                Total Pay:
                <input
                  type="number"
                  value={editData.totalPay}
                  onChange={(e) => handleChange(e, "totalPay")}
                />
              </label>
              <label>
                Withdraw Payment:
                <select
                  value={editData.withdrawPayment}
                  onChange={(e) => handleChange(e, "withdrawPayment")}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </label>
            </form>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
