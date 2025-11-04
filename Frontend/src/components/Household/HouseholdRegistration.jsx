import React, { useState } from 'react';
import IcePanel from '../IcePanel';
import { FaUserPlus, FaMapMarkerAlt, FaTrashAlt } from 'react-icons/fa';

const HouseholdRegistration = () => {
  const [formData, setFormData] = useState({
    head_of_household: '',
    latitude: '',
    longitude: '',
    waste_type_preference: 'mixed',
    collection_frequency: 'daily'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <IcePanel title="Register New Household" glowColor="#00C853">
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: '1fr 1fr'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: 'var(--ice-dark)'
          }}>
            Head of Household
          </label>
          <div style={{ position: 'relative' }}>
            <FaUserPlus style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: 'var(--ice-accent)',
              opacity: 0.7
            }} />
            <input
              type="text"
              name="head_of_household"
              value={formData.head_of_household}
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
            Location
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <FaMapMarkerAlt style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: 'var(--ice-accent)',
                opacity: 0.7
              }} />
              <input
                type="number"
                name="latitude"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                step="any"
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                name="longitude"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                step="any"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}
              />
            </div>
          </div>
        </div>
        
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: 'var(--ice-dark)'
          }}>
            Waste Type
          </label>
          <div style={{ position: 'relative' }}>
            <FaTrashAlt style={{
              position: 'absolute',
              left: '12px',
              top: '12px',
              color: 'var(--ice-accent)',
              opacity: 0.7
            }} />
            <select
              name="waste_type_preference"
              value={formData.waste_type_preference}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)',
                appearance: 'none'
              }}
            >
              <option value="mixed">Mixed</option>
              <option value="dry">Dry</option>
              <option value="wet">Wet</option>
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
            Collection Frequency
          </label>
          <select
            name="collection_frequency"
            value={formData.collection_frequency}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.8)',
              appearance: 'none'
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="alternate">Alternate Days</option>
          </select>
        </div>
        
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="ice-button" style={{
            padding: '12px 24px',
            fontSize: '14px'
          }}>
            Register Household
          </button>
        </div>
      </form>
    </IcePanel>
  );
};

export default HouseholdRegistration;