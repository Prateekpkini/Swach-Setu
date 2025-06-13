import React from 'react';
import IcePanel from '../IcePanel';
import { FaTrash, FaMoneyBillWave, FaRecycle } from 'react-icons/fa';

function Dashboard({ households }) {
  const totalHouseholds = households.length;
  const paidHouseholds = households.filter(h => h.fee_status === 'paid').length;
  const paymentRate = ((paidHouseholds / totalHouseholds) * 100).toFixed(1);
  
  const wasteTypes = {
    mixed: households.filter(h => h.waste_type_preference === 'mixed').length,
    dry: households.filter(h => h.waste_type_preference === 'dry').length,
    wet: households.filter(h => h.waste_type_preference === 'wet').length
  };

  return (
    <div className="dashboard">
      <h2 style={{
        color: 'var(--ice-dark)',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: '300',
        letterSpacing: '1px'
      }}>Waste Collection Overview</h2>
      
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

        <IcePanel title="Payment Rate" glowColor="#00C853">
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
              <FaMoneyBillWave style={{ color: '#00C853', fontSize: '24px' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--ice-dark)' }}>{paymentRate}%</h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>Collection Rate</p>
            </div>
          </div>
        </IcePanel>

        <IcePanel title="Waste Types" glowColor="#FF9100">
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
              <FaRecycle style={{ color: '#FF9100', fontSize: '24px' }} />
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