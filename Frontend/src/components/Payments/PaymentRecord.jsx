import React, { useState } from 'react';
import IcePanel from '../IcePanel';
import { FaRupeeSign, FaUser, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

const PaymentRecord = ({ households }) => {
  const [formData, setFormData] = useState({
    householdId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    console.log('Payment recorded:', formData);
  };

  return (
    <IcePanel title="Record Payment" glowColor="#00C853">
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gap: '20px'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: 'var(--ice-dark)'
          }}>
            Household
          </label>
          <div style={{ position: 'relative' }}>
            <FaUser style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: 'var(--ice-accent)',
              opacity: 0.7
            }} />
            <select
              name="householdId"
              value={formData.householdId}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)',
                appearance: 'none'
              }}
            >
              <option value="">Select Household</option>
              {households.map(household => (
                <option key={household.household_id} value={household.household_id}>
                  {household.head_of_household} ({household.household_id})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: 'var(--ice-dark)'
          }}>
            Amount
          </label>
          <div style={{ position: 'relative' }}>
            <FaRupeeSign style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: 'var(--ice-accent)',
              opacity: 0.7
            }} />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: 'var(--ice-dark)'
          }}>
            Payment Date
          </label>
          <div style={{ position: 'relative' }}>
            <FaCalendarAlt style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: 'var(--ice-accent)',
              opacity: 0.7
            }} />
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: 'var(--ice-dark)'
          }}>
            Payment Method
          </label>
          <div style={{ position: 'relative' }}>
            <FaMoneyBillWave style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: 'var(--ice-accent)',
              opacity: 0.7
            }} />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)',
                appearance: 'none'
              }}
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="bank">Bank Transfer</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="ice-button" style={{
            padding: '12px 24px',
            fontSize: '14px'
          }}>
            Record Payment
          </button>
        </div>
      </form>
    </IcePanel>
  );
};

export default PaymentRecord;