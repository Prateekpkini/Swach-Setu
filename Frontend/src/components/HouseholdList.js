import React from 'react';

function HouseholdList({ households }) {
  // Helper function to get field value from either format
  const getFieldValue = (household, field) => {
    return household[field] || household[field.toLowerCase()] || 
           household[field.charAt(0).toUpperCase() + field.slice(1)] ||
           household[field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')];
  };

  return (
    <div className="household-list">
      <h2 style={{
        color: 'var(--ice-dark)',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: '300',
        letterSpacing: '1px'
      }}>Household Management</h2>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.25)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9rem'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--ice-accent)' }}>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>ID</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Head of Household</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Waste Type</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Payment Status</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Collection Frequency</th>
            </tr>
          </thead>
          <tbody>
            {households.map((household, index) => {
              const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
              const headOfHousehold = getFieldValue(household, 'head_of_household') || getFieldValue(household, 'HeadOfHousehold');
              const wasteType = getFieldValue(household, 'waste_type_preference') || getFieldValue(household, 'WasteTypePreference');
              const feeStatus = getFieldValue(household, 'fee_status') || getFieldValue(household, 'FeeStatus');
              const collectionFreq = getFieldValue(household, 'collection_frequency') || getFieldValue(household, 'CollectionFrequency');
              
              return (
                <tr key={householdId || index} style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease'
                }}>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-dark)' }}>{householdId}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-text)' }}>{headOfHousehold}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      background: wasteType === 'mixed' ? 'rgba(255, 145, 0, 0.2)' :
                                 wasteType === 'dry' ? 'rgba(33, 150, 243, 0.2)' :
                                 'rgba(76, 175, 80, 0.2)',
                      color: wasteType === 'mixed' ? '#FF9100' :
                             wasteType === 'dry' ? '#2196F3' :
                             '#4CAF50'
                    }}>
                      {wasteType}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      background: feeStatus === 'paid' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                      color: feeStatus === 'paid' ? '#4CAF50' : '#F44336'
                    }}>
                      {feeStatus}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-text)' }}>{collectionFreq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {households.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--ice-text)',
            opacity: 0.7
          }}>
            No household data available. Please check your backend connection.
          </div>
        )}
      </div>
    </div>
  );
}

export default HouseholdList;