import React, { useState } from 'react';

function PaymentTracker({ households }) {
  const [filter, setFilter] = useState('all');
  
  const filteredHouseholds = households.filter(household => {
    if (filter === 'all') return true;
    return household.fee_status === filter;
  });

  const markAsPaid = (id) => {
    // In a real app, this would update the backend
    console.log(`Marked household ${id} as paid`);
  };

  return (
    <div className="payment-tracker">
      <h2>Payment Tracking</h2>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('paid')}>Paid</button>
        <button onClick={() => setFilter('unpaid')}>Unpaid</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Head of Household</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredHouseholds.map(household => (
            <tr key={household.household_id}>
              <td>{household.household_id}</td>
              <td>{household.head_of_household}</td>
              <td className={household.fee_status}>{household.fee_status}</td>
              <td>
                {household.fee_status === 'unpaid' && (
                  <button onClick={() => markAsPaid(household.household_id)}>
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTracker;