import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './Ticket Raise.css';

// Base API URL - replace with your actual API endpoint
const API_BASE_URL = 'http://127.0.0.1:8000/api';

function TicketRaise() {
  const [view, setView] = useState('raise'); // 'raise' or 'status'
  const [tickets, setTickets] = useState([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticket, setTicket] = useState({ subject: '', description: '', priority: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch tickets when component mounts and when view changes to 'status'
  useEffect(() => {
    if (view === 'status') {
      fetchTickets();
    }
  }, [view]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tickets/`);
      setTickets(response.data);
      console.log(response.data)
      setMessage('');
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setMessage('Failed to fetch tickets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB');
        setSelectedFile(null);
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only JPEG, PNG, PDF, and TXT files are allowed');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setFileError('');
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!ticket.subject.trim()) formErrors.subject = 'Subject is required';
    if (!ticket.description.trim()) formErrors.description = 'Description is required';
    if (!ticket.priority) formErrors.priority = 'Priority is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('subject', ticket.subject);
      formData.append('description', ticket.description);
      formData.append('priority', ticket.priority);
      
      if (selectedFile) {
        formData.append('file_attachment', selectedFile);
      }

      const response = await axios.post(`${API_BASE_URL}/tickets/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // If successful, add the new ticket to our local state
      const newTicket = { 
        ...ticket, 
        id: response.data.id, // Assuming the API returns the created ticket with an ID
        status: 'Pending',
        createdAt: new Date().toLocaleString(),
        attachment: selectedFile ? selectedFile.name : null
      };

      setTickets([newTicket, ...tickets]);
      setShowTicketForm(false);
      setTicket({ subject: '', description: '', priority: '' });
      setSelectedFile(null);
      setErrors({});
      setFileError('');
      setMessage('Ticket submitted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      setMessage('Failed to submit ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="business-analysis">
      <h1>Ticket Dashboard</h1>

      {/* Display messages */}
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {/* Navigation */}
      <div className="ticket-nav">
        <button className={view === 'raise' ? 'active' : ''} onClick={() => setView('raise')}>Raise Ticket</button>
        <button className={view === 'status' ? 'active' : ''} onClick={() => setView('status')}>Ticket Status</button>
      </div>

      {/* Raise Ticket */}
      {view === 'raise' && (
        <div className="analysis-cards">
          <div className="analysis-card">
            <FaTicketAlt className="icon" />
            <h2>Ticket Raise</h2>
            <p>Log customer issues and monitor their resolution status.</p>
            <button onClick={() => setShowTicketForm(true)} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Raise Ticket'}
            </button>

            {showTicketForm && (
              <div className="ticket-form">
                <div className="form-header">
                  <h3>Raise a New Ticket</h3>
                  <button 
                    className="close-btn"
                    onClick={() => {
                      setShowTicketForm(false);
                      setSelectedFile(null);
                      setFileError('');
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Ticket Subject"
                    value={ticket.subject}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}

                  <textarea
                    name="description"
                    placeholder="Describe the issue"
                    value={ticket.description}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  {errors.description && <span className="error-text">{errors.description}</span>}

                  {/* Priority Dropdown */}
                  <select
                    name="priority"
                    value={ticket.priority}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  >
                    <option value="">Select Priority</option>
                    <option value="Critical">Critical</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.priority && <span className="error-text">{errors.priority}</span>}

                  <div className="file-upload">
                    <label htmlFor="file-upload" className="file-upload-label">
                      Choose File
                    </label>
                    <input 
                      id="file-upload"
                      type="file" 
                      onChange={handleFileChange}
                      disabled={isLoading}
                      accept=".jpg,.jpeg,.png,.pdf,.txt"
                    />
                    <span className="file-upload-text">
                      {selectedFile ? selectedFile.name : 'No file chosen'}
                    </span>
                  </div>
                  {fileError && <span className="error-text">{fileError}</span>}

                  <div className="form-buttons">
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => {
                        setShowTicketForm(false);
                        setSelectedFile(null);
                        setFileError('');
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="submit-btn" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ticket Status */}
      {view === 'status' && (
        <div className="ticket-status-table">
          <div className="table-header">
            <h2>Ticket Status</h2>
            <button onClick={fetchTickets} disabled={isLoading}>
              Refresh
            </button>
          </div>
          
          {isLoading ? (
            <div className="loading">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <p>No tickets submitted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Attachment</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td>{t.subject}</td>
                    <td>{t.description}</td>
                    <td>{t.priority}</td>
                    <td>{t.status || 'open'}</td>
                    <td>{t.attachment || 'file'}</td>
                    <td>{new Date(t.created_at).toLocaleString()}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default TicketRaise;