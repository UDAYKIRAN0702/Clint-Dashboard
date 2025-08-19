import React, { useEffect, useState } from "react";
import "./payment.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example fetch simulation (replace with API call)
  useEffect(() => {
    try {
      setLoading(true);
      // Simulate API fetch
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
                <th>Referral Amount</th>
                <th>My Commission</th>
                <th>My %</th>
                <th>Total Pay</th>
                <th>Withdraw Payment</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
