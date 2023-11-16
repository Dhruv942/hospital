// Temperature.jsx

import React, { useState } from 'react';
import Modal from 'react-modal';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler, TimeScale } from 'chart.js';
import './Temperature.css';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler, TimeScale
);

Modal.setAppElement('#root'); // Set the root element for the modal

const Temperature = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '6AM',
    temperature: '',
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    });
  };

  const handleTimeSlotChange = (e) => {
    setFormData({
      ...formData,
      timeSlot: e.target.value,
    });
  };

  const handleTemperatureChange = (e) => {
    setFormData({
      ...formData,
      temperature: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check for missing time slots and show a message
    checkAndNotifyMissingTimeSlots();

    const newData = { ...formData };
    setSubmittedData((prevData) => [...prevData, newData]);
    setSelectedDates((prevDates) => [...prevDates, formData.date]);
    setSelectedDate(formData.date);
    console.log('Form submitted:', formData);
    handleCloseForm();
  };

  const checkAndNotifyMissingTimeSlots = () => {
    const selectedTimeSlotIndex = timeSlots.indexOf(formData.timeSlot);
    if (selectedTimeSlotIndex > 0) {
      const previousTimeSlot = timeSlots[selectedTimeSlotIndex - 1];
      if (!submittedData.find((data) => data.timeSlot === previousTimeSlot)) {
        // Missing time slot detected, show a notification with music
        const message = `Patient ${formData.patientName} (ID: ${formData.patientId}): You missed selecting a time slot between two available time slots. Please choose a time slot.`;

        // Show a browser notification (if supported)
        if ('Notification' in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              const notification = new Notification('Missing Time Slot', {
                body: message,
              });

              // Play music using the Web Audio API
              playNotificationMusic();
            }
          });
        } else {
          // Fallback to alert if browser notifications are not supported
          alert(message);
        }
      }
    }
  };

  const playNotificationMusic = () => {
    // Create an audio element and play music
    const audio = new Audio('/C:\Users\dhruv\Saved Games\OneDrive\Desktop\sneh final\admin\music.mp3');
    audio.play();
  };
  const handleSave = () => {
    // Placeholder function for saving data
    console.log("Save button clicked. Implement your save logic here.");
  };
  

  // Concatenate date and time for chart labels
  const generateLineChartData = () => {
    const datasets = selectedDates.map((selectedDate, index) => {
      const dataForDate = submittedData
        .filter((data) => data.date === selectedDate)
        .map((data) => ({ x: `${data.date} ${data.timeSlot}`, y: data.temperature }));

      return {
        label: `Temperature Data - ${selectedDate}`,
        data: dataForDate,
        borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
        tension: 0.3,
        fill: false,
        pointStyle: 'rect',
        pointBorderColor: 'blue',
        pointBackgroundColor: '#fff',
        showLine: true,
      };
    });

    return {
      labels: submittedData.map((data) => data.timeSlot),
      datasets,
    };
  };

  // Specify width and height for the chart
  const chartSize = {
    width: 200,
    height: 200,
  };

  const timeSlots = [
    "12MN", "2AM", "4AM", "6AM", "8AM", "10AM",
    "12Noon", "2PM", "4PM", "6PM", "8PM", "10PM"
  ];

  return (
    <div className="main-container">
      <div>
        <h1>Temperature App</h1>
        <h2>Patient Name: Dhruv</h2>
        <h3>Patient ID: 1</h3>
        <button onClick={handleButtonClick}>Open Form</button>

        <Modal
          isOpen={showForm}
          onRequestClose={handleCloseForm}
          contentLabel="Temperature Form"
          className="modal-content" // Apply custom styling
        >
          <div className="form-container">
            <form onSubmit={handleFormSubmit}>
              <label>Date:</label>
              <input type="date" value={formData.date} onChange={handleDateChange} />

              <label>Time Slot:</label>
              <select value={formData.timeSlot} onChange={handleTimeSlotChange}>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>

              <label>Temperature:</label>
              <input type="text" value={formData.temperature} onChange={handleTemperatureChange} />

              <div className="button-container">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCloseForm}>
                  Close Form
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <div>
          <h2>Line Chart</h2>
          <Line data={generateLineChartData()} options={{ ...chartSize }} />
        </div>

        <h2>Submitted Data</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.timeSlot}</td>
                <td>{data.temperature}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
      </div>
    </div>
  );
};

export default Temperature;
