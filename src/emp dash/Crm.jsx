import React, { useState } from 'react';
import './Crm.css';

function Crm() {
  const [clients, setClients] = useState([
    {
      id: 'C001',
      name: 'ABC Corp',
      contact: 'John Doe',
      email: 'john@abc.com',
      address: '123 Main Street',
      status: 'Active',
      action: 'Initial Call',
    },
    {
      id: 'C002',
      name: 'XYZ Ltd',
      contact: 'Jane Smith',
      email: 'jane@xyz.com',
      address: '456 Elm Street',
      status: 'Inactive',
      action: 'Follow-up',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    status: '',
    action: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientForm({ ...clientForm, [name]: value });
  };

  // Open modal for new client
  const openAddModal = () => {
    setClientForm({
      name: '',
      contact: '',
      email: '',
      address: '',
      status: '',
      action: '',
    });
    setEditingClientId(null);
    setShowModal(true);
  };

  // Open modal to edit existing client
  const openEditModal = (client) => {
    setClientForm(client);
    setEditingClientId(client.id);
    setShowModal(true);
  };

  // Save or update client
  const handleSave = () => {
    if (editingClientId) {
      const updatedClients = clients.map((client) =>
        client.id === editingClientId ? { ...clientForm, id: editingClientId } : client
      );
      setClients(updatedClients);
    } else {
      const existingIds = clients.map(c => parseInt(c.id.replace('C', '')) || 0);
      const nextIdNum = existingIds.length ? Math.max(...existingIds) + 1 : 1;
      const newId = `C${String(nextIdNum).padStart(3, '0')}`;

      const newClient = { id: newId, ...clientForm };
      setClients([...clients, newClient]);
    }

    setShowModal(false);
  };

  // Delete a client
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  // Filter clients by keyword
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="crm-container">
      <h1>Client Details</h1>

      {/* Search + Add Button */}
      <div className="crm-actions">
        <input
          type="text"
          placeholder="Enter any keyword"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={openAddModal} className="add-client-button">
          + Add Client
        </button>
      </div>

      {/* Client Table */}
      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.contact}</td>
                <td>{client.email}</td>
                <td>{client.address}</td>
                <td>{client.status}</td>
                <td>{client.action}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(client)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(client.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No clients found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingClientId ? 'Edit Client' : 'Add New Client'}</h2>
            <input
              type="text"
              name="name"
              placeholder="Client Name"
              value={clientForm.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Person"
              value={clientForm.contact}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={clientForm.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={clientForm.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="status"
              placeholder="Status (e.g., Active, Inactive)"
              value={clientForm.status}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="action"
              placeholder="Action (e.g., Follow-up, Meeting)"
              value={clientForm.action}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={handleSave}>{editingClientId ? 'Update' : 'Add'}</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Crm;
