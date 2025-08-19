import React, { useState } from 'react';
import './Ticket Raise.css';
import { FaComments, FaTicketAlt } from 'react-icons/fa';

function TicketRaise() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticket, setTicket] = useState({ subject: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!ticket.subject.trim()) formErrors.subject = 'Subject is required';
    if (!ticket.description.trim()) formErrors.description = 'Description is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Replace with API call
    console.log('Ticket submitted:', ticket);
    alert(`Ticket Raised!\nSubject: ${ticket.subject}\nDescription: ${ticket.description}`);

    setShowTicketForm(false);
    setTicket({ subject: '', description: '' });
    setErrors({});
  };

  return (
    <div className="business-analysis">
      <h1>Raise Your Ticket</h1>

      <div className="analysis-cards">

      
        {/* Ticket Raise Section */}
        <div className="analysis-card">
          <FaTicketAlt className="icon" />
          <h2>Ticket Raise</h2>
          <p>Log customer issues, assign tickets, and monitor their resolution status.</p>
          <button onClick={() => setShowTicketForm((prev) => !prev)}>
            {showTicketForm ? 'Close Form' : 'Raise Ticket'}
          </button>

          {/* Ticket Form */}
          {showTicketForm && (
            <div className="ticket-form">
              <h3>Raise a New Ticket</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Ticket Subject"
                  value={ticket.subject}
                  onChange={handleInputChange}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}

                <textarea
                  name="description"
                  placeholder="Describe the issue"
                  value={ticket.description}
                  onChange={handleInputChange}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
<input type='file' placeholder='upload photo'/>
                <div className="form-buttons">
                  <button type="submit" className="submit-btn">Submit Ticket</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowTicketForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TicketRaise;
