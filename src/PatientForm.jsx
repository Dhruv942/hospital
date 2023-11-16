import React, { useState } from 'react';
import './PatientForm.css';

function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodgroup: '',
    admittedDate: '',
    mobileNumber: '',
    address: '',
    status: '', // New field for patient status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // You can perform any actions with the form data here
    // For example, send the form data to the server

    let response = await fetch('http://localhost:8081/addpatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, age: parseInt(formData.age) }),
    });

    console.log(response);

    // Show an alert after form submission
    alert('Form submitted successfully');
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <h2>Patient Information</h2>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodgroup"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Admitted Date:</label>
          <input
            type="date"
            name="admittedDate"
            value={formData.admittedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel" // Changed to "tel" for phone number input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Regular Check">Regular Check</option>
            <option value="Admit">Admit</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;
