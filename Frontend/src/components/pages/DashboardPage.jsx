import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardPage = ({ households }) => {
  return (
    <div>
      <Dashboard households={households} />
    </div>
  );
};

export default DashboardPage;