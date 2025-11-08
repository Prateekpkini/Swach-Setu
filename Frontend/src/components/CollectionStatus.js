import React, { useState, useMemo } from 'react';

function CollectionStatus({ households, todayCollections }) {
  const [filter, setFilter] = useState('all');

  // Helper function to get field value from either format
  const getFieldValue = (item, field) => {
    return item[field] || item[field.toLowerCase()] || 
           item[field.charAt(0).toUpperCase() + field.slice(1)] ||
           item[field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')];
  };

  // Merge household data with today's collection status
  const householdsWithStatus = useMemo(() => {
    return households.map(household => {
      const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
      
      // Find today's collection log for this household
      const todayLog = todayCollections.find(log => {
        const logHouseholdId = getFieldValue(log, 'household_id') || getFieldValue(log, 'HouseholdID');
        return logHouseholdId === householdId;
      });
      
      const collectionStatus = todayLog 
        ? (getFieldValue(todayLog, 'status') || getFieldValue(todayLog, 'Status'))
        : 'pending';
      
      const collectedOn = todayLog 
        ? (getFieldValue(todayLog, 'collected_on') || getFieldValue(todayLog, 'CollectedOn'))
        : null;
      
      const collectorName = todayLog 
        ? (getFieldValue(todayLog, 'collector_name') || getFieldValue(todayLog, 'CollectorName'))
        : null;

      return {
        ...household,
        collectionStatus,
        collectedOn,
        collectorName
      };
    });
  }, [households, todayCollections]);

  // Filter households based on collection status
  const filteredHouseholds = householdsWithStatus.filter(household => {
    if (filter === 'all') return true;
    return household.collectionStatus === filter;
  });

  // Calculate statistics
  const stats = {
    total: households.length,
    collected: householdsWithStatus.filter(h => h.collectionStatus === 'collected').length,
    pending: householdsWithStatus.filter(h => h.collectionStatus === 'pending').length
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return '-';
    }
  };

  return (
    <div className="collection-status">
      <h2 style={{
        color: 'var(--ice-dark)',
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: '300',
        letterSpacing: '1px'
      }}>Today's Collection Status</h2>

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: 'var(--ice-dark)', fontSize: '2rem' }}>
            {stats.total}
          </h3>
          <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>Total Households</p>
        </div>

        <div style={{
          background: 'rgba(76, 175, 80, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(76, 175, 80, 0.3)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#4CAF50', fontSize: '2rem' }}>
            {stats.collected}
          </h3>
          <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>Collected</p>
        </div>

        <div style={{
          background: 'rgba(255, 152, 0, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(255, 152, 0, 0.3)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#FF9800', fontSize: '2rem' }}>
            {stats.pending}
          </h3>
          <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>Pending</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {['all', 'collected', 'pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              background: filter === f ? 'var(--ice-accent)' : 'rgba(255, 255, 255, 0.9)',
              color: filter === f ? 'white' : 'var(--ice-dark)',
              transition: 'all 0.3s ease',
              boxShadow: filter === f ? '0 4px 12px rgba(79, 195, 247, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && ` (${f === 'collected' ? stats.collected : stats.pending})`}
          </button>
        ))}
      </div>

      {/* Collection Status Table */}
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
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Collection Status</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Collected Time</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Collector</th>
              <th style={{ padding: '15px 10px', textAlign: 'left', color: 'var(--ice-dark)' }}>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {filteredHouseholds.map((household, index) => {
              const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
              const headOfHousehold = getFieldValue(household, 'head_of_household') || getFieldValue(household, 'HeadOfHousehold');
              const collectionFreq = getFieldValue(household, 'collection_frequency') || getFieldValue(household, 'CollectionFrequency');
              
              return (
                <tr key={householdId || index} style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease',
                  background: index % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.02)'
                }}>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-dark)', fontWeight: '500' }}>
                    {householdId}
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-text)' }}>
                    {headOfHousehold}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      background: household.collectionStatus === 'collected' 
                        ? 'rgba(76, 175, 80, 0.2)' 
                        : 'rgba(255, 152, 0, 0.2)',
                      color: household.collectionStatus === 'collected' 
                        ? '#4CAF50' 
                        : '#FF9800',
                      display: 'inline-block'
                    }}>
                      {household.collectionStatus === 'collected' ? '✓ Collected' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-text)' }}>
                    {formatDateTime(household.collectedOn)}
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-text)' }}>
                    {household.collectorName || '-'}
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--ice-text)' }}>
                    {collectionFreq}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredHouseholds.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--ice-text)',
            opacity: 0.7
          }}>
            No households found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionStatus;
