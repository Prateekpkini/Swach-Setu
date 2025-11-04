import React, { useState } from 'react';
import IcePanel from '../IcePanel';
import { FaRoute, FaSearch, FaMapMarkedAlt } from 'react-icons/fa';

const RouteOptimizer = ({ households }) => {
  const [routeType, setRouteType] = useState('all');
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  // Mock optimization function - in a real app, this would use a proper algorithm
  const optimizeRoute = () => {
    const filtered = households.filter(h => {
      if (routeType === 'all') return true;
      if (routeType === 'unpaid') return h.fee_status === 'unpaid';
      return h.fee_status === 'paid';
    });
    
    // Simple "optimization" by sorting by latitude (real app would use proper routing)
    const sorted = [...filtered].sort((a, b) => a.latitude - b.latitude);
    setOptimizedRoute(sorted);
  };

  return (
    <IcePanel title="Route Optimization" glowColor="#FF9100">
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '15px'
        }}>
          <FaRoute color="#FF9100" size={20} />
          <h3 style={{ margin: 0 }}>Generate Optimized Collection Route</h3>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--ice-dark)'
            }}>
              Route Type
            </label>
            <select
              value={routeType}
              onChange={(e) => setRouteType(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)',
                appearance: 'none'
              }}
            >
              <option value="all">All Households</option>
              <option value="paid">Paid Households Only</option>
              <option value="unpaid">Unpaid Households Only</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button 
              onClick={optimizeRoute}
              className="ice-button"
              style={{
                background: 'linear-gradient(135deg, #FF9100, #FF5252)',
                padding: '10px 20px'
              }}
            >
              <FaSearch style={{ marginRight: '8px' }} />
              Optimize Route
            </button>
          </div>
        </div>
      </div>
      
      {optimizedRoute.length > 0 && (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '15px'
          }}>
            <FaMapMarkedAlt color="#FF9100" size={20} />
            <h3 style={{ margin: 0 }}>Optimized Route</h3>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            padding: '15px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            <ol style={{ paddingLeft: '20px', margin: 0 }}>
              {optimizedRoute.map((household, index) => (
                <li key={household.household_id} style={{ 
                  marginBottom: '10px',
                  padding: '10px',
                  background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontWeight: '500' }}>{household.head_of_household}</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>
                    {household.household_id} | {household.waste_type_preference} | {household.collection_frequency}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </IcePanel>
  );
};

export default RouteOptimizer;