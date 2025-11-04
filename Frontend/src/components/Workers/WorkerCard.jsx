import React from 'react';
import { FaUser, FaCalendarAlt, FaTrashAlt, FaMapMarkerAlt } from 'react-icons/fa';

const WorkerCard = ({ worker }) => {
  return (
    <div className="igloo-card" style={{
      marginBottom: '15px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--ice-accent), var(--ice-dark))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
          {worker.name.charAt(0)}
        </div>
        
        <div>
          <h3 style={{ margin: 0 }}>{worker.name}</h3>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Worker ID: {worker.id}</p>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaCalendarAlt color="#4fc3f7" />
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Joined</p>
            <p style={{ margin: 0, fontWeight: '500' }}>{worker.joinDate}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTrashAlt color="#4fc3f7" />
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Collections</p>
            <p style={{ margin: 0, fontWeight: '500' }}>{worker.collections} today</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaMapMarkerAlt color="#4fc3f7" />
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Area</p>
            <p style={{ margin: 0, fontWeight: '500' }}>{worker.area}</p>
          </div>
        </div>
      </div>
      
      <div style={{
        paddingTop: '15px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '14px' }}>
          Status: <span style={{ 
            color: worker.status === 'active' ? '#00C853' : '#FF5252',
            fontWeight: '500'
          }}>{worker.status}</span>
        </span>
        <button style={{
          background: 'transparent',
          border: '1px solid var(--ice-accent)',
          color: 'var(--ice-accent)',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;