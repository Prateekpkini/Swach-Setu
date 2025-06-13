import React from 'react';
import HouseholdCard from './HouseholdCard';
import IcePanel from '../IcePanel';

const HouseholdList = ({ households }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <IcePanel title="Household Management" glowColor="#4fc3f7">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {households.map(household => (
            <HouseholdCard key={household.household_id} household={household} />
          ))}
        </div>
      </IcePanel>
    </div>
  );
};

export default HouseholdList;