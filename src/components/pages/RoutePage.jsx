import React from 'react';
import RouteOptimizer from '../components/Routes/RouteOptimizer';
import RouteViewer from '../components/Routes/RouteViewer';

const RoutePage = ({ households }) => {
  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      <RouteOptimizer households={households} />
      <RouteViewer households={households} />
    </div>
  );
};

export default RoutePage;