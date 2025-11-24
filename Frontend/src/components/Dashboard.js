import React from 'react';
import IcePanel from './IcePanel.jsx';
import { FaTrash, FaMoneyBillWave, FaRecycle } from 'react-icons/fa';

function Dashboard({ households, collectionLogs, todayCollections, onRefresh }) {
  const totalHouseholds = households.length;
  
  // Handle both static data format and Supabase format
  const getFieldValue = (household, field) => {
    // Check for Supabase format (PascalCase) first, then static format (snake_case)
    return household[field] || household[field.toLowerCase()] || 
           household[field.charAt(0).toUpperCase() + field.slice(1)] ||
           household[field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')];
  };
  
  const paidHouseholds = households.filter(h => 
    getFieldValue(h, 'fee_status') === 'paid' || 
    getFieldValue(h, 'FeeStatus') === 'paid'
  ).length;
  
  const paymentRate = totalHouseholds > 0 ? ((paidHouseholds / totalHouseholds) * 100).toFixed(1) : '0.0';
  
  const wasteTypes = {
    mixed: households.filter(h => 
      getFieldValue(h, 'waste_preference') === 'mixed' || 
      getFieldValue(h, 'WastePreference') === 'mixed'
    ).length,
    dry: households.filter(h => 
      getFieldValue(h, 'waste_preference') === 'dry' || 
      getFieldValue(h, 'WastePreference') === 'dry'
    ).length,
    wet: households.filter(h => 
      getFieldValue(h, 'waste_preference') === 'wet' || 
      getFieldValue(h, 'WastePreference') === 'wet'
    ).length
  };

  // Collection statistics
  const todayCollected = todayCollections ? todayCollections.filter(log => 
    log.Status === 'collected' || log.status === 'collected'
  ).length : 0;
  
  const todayPending = todayCollections ? todayCollections.filter(log => 
    log.Status === 'pending' || log.status === 'pending'
  ).length : 0;
  
  const collectionRate = totalHouseholds > 0 ? ((todayCollected / totalHouseholds) * 100).toFixed(1) : '0.0';

  return (
    <div className="dashboard">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px' 
      }}>
        <h2 style={{
          color: 'var(--ice-dark)',
          fontSize: '2rem',
          fontWeight: '300',
          letterSpacing: '1px',
          margin: 0
        }}>Waste Collection Overview</h2>
        
        {onRefresh && (
          <button
            onClick={onRefresh}
            style={{
              padding: '10px 20px',
              background: 'var(--ice-accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            🔄 Refresh Data
          </button>
        )}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <IcePanel title="Total Households" glowColor="#4fc3f7">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(79, 195, 247, 0.2)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaTrash style={{ color: 'var(--ice-accent)', fontSize: '24px' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--ice-dark)' }}>{totalHouseholds}</h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>Registered</p>
            </div>
          </div>
        </IcePanel>

        <IcePanel title="Today's Collections" glowColor="#00C853">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(0, 200, 83, 0.2)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaTrash style={{ color: '#00C853', fontSize: '24px' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--ice-dark)' }}>{collectionRate}%</h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>
                {todayCollected} collected, {todayPending} pending
              </p>
            </div>
          </div>
        </IcePanel>

        <IcePanel title="Payment Rate" glowColor="#FF9100">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 145, 0, 0.2)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaMoneyBillWave style={{ color: '#FF9100', fontSize: '24px' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--ice-dark)' }}>{paymentRate}%</h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>
                {paidHouseholds} of {totalHouseholds} paid
              </p>
            </div>
          </div>
        </IcePanel>

        <IcePanel title="Waste Types" glowColor="#9C27B0">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(156, 39, 176, 0.2)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaRecycle style={{ color: '#9C27B0', fontSize: '24px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div>
                  <h4 style={{ margin: '5px 0', color: 'var(--ice-text)' }}>Mixed</h4>
                  <p style={{ margin: 0, fontSize: '1.2rem' }}>{wasteTypes.mixed}</p>
                </div>
                <div>
                  <h4 style={{ margin: '5px 0', color: 'var(--ice-text)' }}>Dry</h4>
                  <p style={{ margin: 0, fontSize: '1.2rem' }}>{wasteTypes.dry}</p>
                </div>
                <div>
                  <h4 style={{ margin: '5px 0', color: 'var(--ice-text)' }}>Wet</h4>
                  <p style={{ margin: 0, fontSize: '1.2rem' }}>{wasteTypes.wet}</p>
                </div>
              </div>
            </div>
          </div>
        </IcePanel>
      </div>

      {/* Additional dashboard components would go here */}
    </div>
  );
}

export default Dashboard;