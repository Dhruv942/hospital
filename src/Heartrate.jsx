// Heartrate.jsx

import React, { useState } from 'react';

const Heartrate = () => {
  const [heartRate, setHeartRate] = useState('');
  const [urineOutput, setUrineOutput] = useState('');
  const [spo2, setSpo2] = useState('');
  const [vomiting, setVomiting] = useState('');
  const [inputOutput, setInputOutput] = useState('');
  const [mbp, setMbp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to store the data or send it to an API
    console.log('Data submitted:', {
      heartRate,
      urineOutput,
      spo2,
      vomiting,
      inputOutput,
      mbp,
    });
  };

  return (
    <div>
      <h2>Heartrate and Medical Data Input</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Heart Rate:
          <input
            type="text"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
          />
        </label>
        <label>
          Urine Output:
          <input
            type="text"
            value={urineOutput}
            onChange={(e) => setUrineOutput(e.target.value)}
          />
        </label>
        <label>
          SpO2:
          <input
            type="text"
            value={spo2}
            onChange={(e) => setSpo2(e.target.value)}
          />
        </label>
        <label>
          Vomiting:
          <input
            type="text"
            value={vomiting}
            onChange={(e) => setVomiting(e.target.value)}
          />
        </label>
        <label>
          Input/Output:
          <input
            type="text"
            value={inputOutput}
            onChange={(e) => setInputOutput(e.target.value)}
          />
        </label>
        <label>
          MBP:
          <input
            type="text"
            value={mbp}
            onChange={(e) => setMbp(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Heartrate;
