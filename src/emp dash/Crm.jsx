import React, { useState } from "react";
import "./Crm.css";

const  Crm= () =>{
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      client: "ABC Corp",
      projectValue: "$50,000",
      software: "BILLING",
      status: "Open",
      startDate: "2025-01-01T09:00",
    },
    {
      id: 2,
      name: "Jane Smith",
      client: "XYZ Ltd",
      projectValue: "$30,000",
      software: "HMS",
      status: "Follow-up",
      startDate: "2025-02-10T11:30",
    },
    {
      id: 3,
      name: "Michael Johnson",
      client: "Tech Solutions",
      projectValue: "$75,000",
      software: "CRM",
      status: "Long",
      startDate: "2025-03-01T15:00",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newClient, setNewClient] = useState({
    name: "",
    client: "",
    projectValue: "",
    software: "Billing",
    status: "Open",
    startDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = () => {
    setEmployees([...employees, { ...newClient, id: employees.length + 1 }]);
    setNewClient({
      name: "",
      client: "",
      projectValue: "",
      software: "Billing",
      status: "Open",
      startDate: "",
    });
    setShowForm(false);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.software.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crm-container">
      <h1 className="crm-title">CRM</h1>

      {/* Search + Add Button */}
      <div className="crm-actions">
        <input
          type="text"
          placeholder="Search by name, client, software..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="crm-add-btn" onClick={() => setShowForm(true)}>
          + Add Client
        </button>
      </div>

      {/* Add Client Popup Form */}
      {showForm && (
        <div className="crm-modal">
          <div className="crm-modal-content">
            <h2>Add Client</h2>

            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Employee Name"
              value={newClient.name}
              onChange={handleChange}
            />

            <label>Client Name</label>
            <input
              type="text"
              name="client"
              placeholder="Enter Client Name"
              value={newClient.client}
              onChange={handleChange}
            />

            <label>Project Value</label>
            <input
              type="text"
              name="projectValue"
              placeholder="Enter Project Value"
              value={newClient.projectValue}
              onChange={handleChange}
            />

            <label>Software</label>
            <select
              name="software"
              value={newClient.software}
              onChange={handleChange}
            >
              <option>Billing</option>
              <option>CRM</option>
              <option>HMS</option>
              <option>CRN</option>
              <option>Other</option>
            </select>

            <label>Status</label>
            <select
              name="status"
              value={newClient.status}
              onChange={handleChange}
            >
              <option>Open</option>
              <option>Follow-up</option>
              <option>Long</option>
              <option>Close</option>
            </select>

            <label>Start Date & Time:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={newClient.startDate}
              onChange={handleChange}
            />

            <div className="crm-modal-actions">
              <button onClick={handleAddClient}>Save</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Table */}
      <table className="crm-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Client</th>
            <th>Project Value</th>
            <th>Software</th>
            <th>Status</th>
            <th>Start Date & Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.client}</td>
              <td>{emp.projectValue}</td>
              <td>{emp.software}</td>
              <td>{emp.status}</td>
              <td>{emp.startDate}</td>
              <td>
                <button
                  onClick={() => setShowDetails(emp)}
                  className="color"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Popup in Table Format */}
      {showDetails && (
        <div className="crm-modal">
          <div className="crm-modal-content">
            <h2>Employee Details</h2>
            <table className="crm-details-table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{showDetails.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{showDetails.name}</td>
                </tr>
                <tr>
                  <th>Client</th>
                  <td>{showDetails.client}</td>
                </tr>
                <tr>
                  <th>Project Value</th>
                  <td>{showDetails.projectValue}</td>
                </tr>
                <tr>
                  <th>Software</th>
                  <td>{showDetails.software}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{showDetails.status}</td>
                </tr>
                <tr>
                  <th>Start Date & Time</th>
                  <td>{showDetails.startDate}</td>
                </tr>
              </tbody>
            </table>

            <div className="crm-modal-actions">
              <button onClick={() => setShowDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crm;