// src/App.js

import React, { useState, useEffect } from 'react';
import './styles/main.css';
import './styles/ice-theme.css';
import './styles/animations.css';
import './styles/responsive.css';

// Component Imports
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import HouseholdList from './components/Household/HouseholdList';
import MapView from './components/MapView';
import PaymentTracker from './components/Payments/PaymentTracker';
import SnowfallEffect from './components/Dashboard/SnowfallEffect';
import Chatbot from './components/Chatbot'; // <-- 1. Import the new Chatbot component
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [households, setHouseholds] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [snowEnabled, setSnowEnabled] = useState(true); // You can keep this for the effect

  useEffect(() => {
    fetch('http://localhost:5000/api/households')
      .then(res => res.json())
      .then(data => setHouseholds(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <ThemeProvider>
      <div className="app" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--ice-primary), var(--ice-secondary))',
        paddingBottom: '50px'
      }}>
        {snowEnabled && <SnowfallEffect />}

        {/* SwatchaPatha Brand Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px 0',
          textAlign: 'center',
          backdropFilter: 'blur(5px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #4fc3f7, #01579b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            fontFamily: '"Arial", sans-serif'
          }}>
            SwatchaPatha
          </h1>
          <p style={{
            margin: '5px 0 0',
            color: 'var(--ice-dark)',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            Rural Waste Management System
          </p>
        </div>

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="content" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px'
        }}>
          {activeTab === 'dashboard' && <Dashboard households={households} />}
          {activeTab === 'households' && <HouseholdList households={households} />}
          {activeTab === 'map' && <MapView households={households} />}
          {activeTab === 'payments' && <PaymentTracker households={households} />}
        </div>

        {/* <-- 2. The old snow toggle button div is removed from here. */}

        {/* 3. Add the Chatbot component. It will render its own floating button. */}
        <Chatbot />

      </div>
    </ThemeProvider>
  );
}

export default App;