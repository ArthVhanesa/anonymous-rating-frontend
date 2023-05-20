import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacultyPage from './components/facultyPage';
import FacilityPage from './components/facilityPage';
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <Navbar />
      <FacultyPage />
      <FacilityPage />
      <Footer />
    </div>
  )
}

export default App;
