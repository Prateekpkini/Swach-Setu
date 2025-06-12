import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/households">View Households</Link></li>
        <li><Link to="/collector">Collector Interface</Link></li>
        <li><Link to="/supervisor">Supervisor Interface</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;