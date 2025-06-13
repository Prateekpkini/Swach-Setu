import React from 'react';

function HouseholdList({ households }) {
  return (
    <div className="household-list">
      <h2>Household Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Head of Household</th>
            <th>Waste Type</th>
            <th>Payment Status</th>
            <th>Collection Frequency</th>
          </tr>
        </thead>
        <tbody>
          {households.map(household => (
            <tr key={household.household_id}>
              <td>{household.household_id}</td>
              <td>{household.head_of_household}</td>
              <td>{household.waste_type_preference}</td>
              <td className={household.fee_status}>{household.fee_status}</td>
              <td>{household.collection_frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HouseholdList;