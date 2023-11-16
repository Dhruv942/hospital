// App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PatientForm from './PatientForm';
import Temperature from './Tempurature';
import UserTable from './UserTable';
import Patient from './patient';
import BillingSystem from './BillingSystem';
import Heartrate from './heartrate';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/addnew" element={<PatientForm />} />
          <Route exact path="/patient" element={<Patient/>} />
          <Route exact path="/Admitted Pateint" element={<UserTable/>} />
          <Route exact path="/bill" element={<BillingSystem/>} />
          <Route exact path="/temperature" element={<Temperature/>} />
          <Route exact path="/heartrate" element={<Heartrate/>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
