import React from 'react';
import { FaMoneyBillWave, FaCalendar, FaUser } from 'react-icons/fa';

const PaymentCard = ({ payment }) => {
  return (
    <div className="igloo-card" style={{
      marginBottom: '15px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaMoneyBillWave color="#00C853" size={18} />
          <h4 style={{ margin: 0 }}>Payment #{payment.id}</h4>
        </div>
        <span style={{
          padding: '3px 8px',
          borderRadius: '12px',
          background: '#00C853',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          ₹{payment.amount}
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaUser color="#4fc3f7" size={14} />
          <span style={{ fontSize: '14px' }}>{payment.household}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaCalendar color="#4fc3f7" size={14} />
          <span style={{ fontSize: '14px' }}>{payment.date}</span>
        </div>
      </div>
      
      <div style={{
        paddingTop: '10px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '12px', opacity: 0.7 }}>Method: {payment.method}</span>
        <button style={{
          background: 'transparent',
          border: '1px solid var(--ice-accent)',
          color: 'var(--ice-accent)',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;