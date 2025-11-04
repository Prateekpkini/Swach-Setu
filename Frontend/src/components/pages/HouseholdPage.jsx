import React from 'react';
import HouseholdList from '../components/Household/HouseholdList';
import HouseholdRegistration from '../components/Household/HouseholdRegistration';

const HouseholdPage = ({ households }) => {
  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      <HouseholdRegistration />
      <HouseholdList households={households} />
    </div>
  );
};

export default HouseholdPage;