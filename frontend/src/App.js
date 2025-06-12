import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CollectorInterface from './pages/CollectorInterface';
import SupervisorInterface from './pages/SupervisorInterface';
import ResidentInterface from './pages/ResidentInterface';
import Login from './pages/Login';
import Households from './pages/Households';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collector" element={<CollectorInterface />} />
        <Route path="/supervisor" element={<SupervisorInterface />} />
        <Route path="/resident" element={<ResidentInterface />} />
        <Route path="/households" element={<Households />} />
      </Routes>
    </Router>
  );
}

export default App;
