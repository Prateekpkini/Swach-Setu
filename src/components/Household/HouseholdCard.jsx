import React from 'react';
import { FaHome, FaTrash, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const HouseholdCard = ({ household }) => {
  return (
    <div className="igloo-card" style={{
      marginBottom: '20px',
      transition: 'transform 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaHome color="#4fc3f7" /> {household.head_of_household}
        </h3>
        <span style={{
          padding: '5px 10px',
          borderRadius: '20px',
          background: household.fee_status === 'paid' ? 'rgba(0, 200, 83, 0.2)' : 'rgba(255, 82, 82, 0.2)',
          color: household.fee_status === 'paid' ? '#00C853' : '#FF5252',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {household.fee_status.toUpperCase()}
        </span>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTrash color="#4fc3f7" />
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Waste Type</p>
            <p style={{ margin: 0, fontWeight: '500' }}>{household.waste_type_preference}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaCalendarAlt color="#4fc3f7" />
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Collection</p>
            <p style={{ margin: 0, fontWeight: '500' }}>{household.collection_frequency}</p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default HouseholdCard;