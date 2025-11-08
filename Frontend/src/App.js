// src/App.js

import React, { useState, useEffect } from 'react';
import './styles/main.css';
import './styles/ice-theme.css';
import './styles/animations.css';
import './styles/responsive.css';

// Component Imports
import Navbar from './components/Navbar.js';
import Dashboard from './components/Dashboard.js';
import HouseholdList from './components/HouseholdList.js';
import MapView from './components/MapView.js';
import CollectionStatus from './components/CollectionStatus.js';
import PaymentTracker from './components/Payments/PaymentTracker.js';
import Chatbot from './components/Chatbot.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import ApiService from './services/api.js';

function App() {
  const [households, setHouseholds] = useState([]);
  const [collectionLogs, setCollectionLogs] = useState([]);
  const [todayCollections, setTodayCollections] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all data in parallel
      const [householdsData, logsData, todayData] = await Promise.all([
        ApiService.fetchHouseholds(),
        ApiService.fetchCollectionLogs(),
        ApiService.fetchTodayCollections()
      ]);
      
      console.log('Fetched data:', { householdsData, logsData, todayData });
      
      setHouseholds(householdsData);
      setCollectionLogs(logsData);
      setTodayCollections(todayData);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider>
      <div className="app" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--ice-primary), var(--ice-secondary))',
        paddingBottom: '50px'
      }}>

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
            SwatchaSetu
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
          {loading && (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Loading data...</p>
            </div>
          )}
          
          {error && (
            <div style={{ 
              textAlign: 'center', 
              padding: '50px', 
              color: 'red',
              background: 'rgba(255, 0, 0, 0.1)',
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  padding: '10px 20px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}
          
          {!loading && !error && (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard 
                  households={households} 
                  collectionLogs={collectionLogs}
                  todayCollections={todayCollections}
                  onRefresh={handleRefresh}
                />
              )}
              {activeTab === 'households' && <HouseholdList households={households} />}
              {activeTab === 'map' && <MapView households={households} />}
              {activeTab === 'collections' && (
                <CollectionStatus 
                  households={households} 
                  todayCollections={todayCollections}
                />
              )}
              {activeTab === 'payments' && <PaymentTracker households={households} onRefresh={handleRefresh} />}
            </>
          )}
        </div>


        {/* 3. Add the Chatbot component. It will render its own floating button. */}
        <Chatbot />

      </div>
    </ThemeProvider>
  );
}

export default App;