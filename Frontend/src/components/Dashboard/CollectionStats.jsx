import React from 'react';
import { FaTrashAlt, FaRecycle, FaChartLine } from 'react-icons/fa';
import IcePanel from '../IcePanel';

const CollectionStats = ({ households }) => {
  // Calculate statistics
  const totalHouseholds = households.length;
  const paidHouseholds = households.filter(h => h.fee_status === 'paid').length;
  const paymentRate = ((paidHouseholds / totalHouseholds) * 100).toFixed(1);
  
  const wasteTypes = {
    mixed: households.filter(h => h.waste_type_preference === 'mixed').length,
    dry: households.filter(h => h.waste_type_preference === 'dry').length,
    wet: households.filter(h => h.waste_type_preference === 'wet').length
  };

  return (
    <IcePanel title="Collection Statistics" glowColor="#4fc3f7">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '15px'
      }}>
        {/* Total Households Card */}
        <div className="igloo-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(79, 195, 247, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaTrashAlt size={24} color="#4fc3f7" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--ice-dark)' }}>
                {totalHouseholds}
              </h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>
                Total Households
              </p>
            </div>
          </div>
        </div>

        {/* Payment Rate Card */}
        <div className="igloo-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(0, 200, 83, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaChartLine size={24} color="#00C853" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--ice-dark)' }}>
                {paymentRate}%
              </h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>
                Payment Rate
              </p>
            </div>
          </div>
        </div>

        {/* Waste Distribution Card */}
        <div className="igloo-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 145, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaRecycle size={24} color="#FF9100" />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', opacity: 0.8 }}>Mixed</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{wasteTypes.mixed}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', opacity: 0.8 }}>Dry</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{wasteTypes.dry}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', opacity: 0.8 }}>Wet</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{wasteTypes.wet}</p>
                </div>
              </div>
              <p style={{ margin: '10px 0 0 0', color: 'var(--ice-text)', opacity: 0.8 }}>
                Waste Distribution
              </p>
            </div>
          </div>
        </div>
      </div>
    </IcePanel>
  );
};

export default CollectionStats;