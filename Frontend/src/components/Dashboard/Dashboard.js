// src/components/Dashboard/Dashboard.js
import React from 'react';
import CollectionStats from './CollectionStats';
import PaymentOverview from './PaymentOverview';
import RouteMap from './RouteMap';
// import SnowfallEffect from './SnowfallEffect';

const Dashboard = ({ households }) => {
  return (
    <div>
      {/* <SnowfallEffect /> */}
      <CollectionStats households={households} />
      <PaymentOverview households={households} />
      <RouteMap households={households} />
    </div>

    
  );
};


// Make sure this line exists:
export default Dashboard;