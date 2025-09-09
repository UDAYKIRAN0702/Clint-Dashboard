import React, { useState, useEffect } from "react";
import "./Crm.css";

// API service functions
const apiService = {
  // GET all clients
  getClients: async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/crm/");
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
    }
  },

  // POST a new client
  addClient: async (clientData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/crm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        throw new Error("Failed to add client");
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding client:", error);
      throw error;
    }
  },
};

const Crm = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newClient, setNewClient] = useState({
    name: "",
    client_name: "",
    project_value: "",
    software: "BILLING",
    status: "Open",
    start_date_time: "",
  });

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await apiService.getClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch clients. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async () => {
    try {
      const addedClient = await apiService.addClient(newClient);
      setClients([...clients, addedClient]);
      setNewClient({
        name: "",
        client_name: "",
        project_value: "",
        software: "BILLING",
        status: "Open",
        start_date_time: "",
      });
      setShowForm(false);
    } catch (err) {
      setError("Failed to add client. Please try again.");
      console.error(err);
    }
  };

  // Filtering clients
  const filteredClients = clients.filter((client) =>
    [client.name, client.client_name, client.software]
      .filter(Boolean) // removes null/undefined
      .some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="crm-container">
      <h1 className="crm-title">CRM</h1>

      {/* Error message */}
      {error && <div className="crm-error">{error}</div>}

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
              name="client_name"
              placeholder="Enter Client Name"
              value={newClient.client_name}
              onChange={handleChange}
            />

            <label>Project Value</label>
            <input
              type="text"
              name="project_value"
              placeholder="Enter Project Value"
              value={newClient.project_value}
              onChange={handleChange}
            />

            <label>Software</label>
            <select
              name="software"
              value={newClient.software}
              onChange={handleChange}
            >
              <option>BILLING</option>
              <option>CRM</option>
              <option>HMS</option>
              <option>EMS</option>
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
              name="start_date_time"
              value={newClient.start_date_time}
              onChange={handleChange}
            />

            <div className="crm-modal-actions">
              <button onClick={handleAddClient}>Save</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && <div className="crm-loading">Loading clients...</div>}

      {/* Clients Table */}
      {!loading && filteredClients.length > 0 && (
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
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.client_name}</td>
                <td>{client.project_value}</td>
                <td>{client.software}</td>
                <td>{client.status}</td>
                <td>{client.start_date_time}</td>
                <td>
                  <button
                    onClick={() => setShowDetails(client)}
                    className="color"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No results message */}
      {!loading && filteredClients.length === 0 && searchQuery && (
        <div className="crm-no-results">No clients match your search.</div>
      )}

      {/* Details Popup in Table Format */}
      {showDetails && (
        <div className="crm-modal">
          <div className="crm-modal-content">
            <h2>Client Details</h2>
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
                  <td>{showDetails.client_name}</td>
                </tr>
                <tr>
                  <th>Project Value</th>
                  <td>{showDetails.project_value}</td>
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
                  <td>{showDetails.start_date_time}</td>
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
