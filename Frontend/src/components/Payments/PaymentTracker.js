import React, { useState } from "react";
import "./PaymentTracker.css"; // import the CSS file
import ApiService from "../../services/api.js";

function PaymentTracker({ households, onRefresh }) {
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState({});

  // Helper function to get field value from either format (Supabase PascalCase or snake_case)
  const getFieldValue = (household, field) => {
    return household[field] || household[field.toLowerCase()] || 
           household[field.charAt(0).toUpperCase() + field.slice(1)] ||
           household[field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')];
  };

  const filteredHouseholds = households.filter((household) => {
    if (filter === "all") return true;
    const feeStatus = getFieldValue(household, 'fee_status') || getFieldValue(household, 'FeeStatus');
    return feeStatus === filter;
  });

  const markAsPaid = async (id) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      
      const result = await ApiService.updatePaymentStatus(id, 'paid');
      
      if (result.success) {
        console.log(`✅ ${result.message}`);
        // Refresh the data to show updated status
        if (onRefresh) {
          await onRefresh();
        }
      }
    } catch (error) {
      console.error(`Error marking household ${id} as paid:`, error);
      alert(`Failed to update payment status. Please try again.`);
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="payment-tracker">
      <h2 className="title">Payment Tracking</h2>

      {/* Filters */}
      <div className="filters">
        {["all", "paid", "unpaid"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? "active" : ""}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-wrapper">
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
            {filteredHouseholds.map((household, idx) => {
              const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
              const headOfHousehold = getFieldValue(household, 'head_of_household') || getFieldValue(household, 'HeadOfHousehold');
              const feeStatus = getFieldValue(household, 'fee_status') || getFieldValue(household, 'FeeStatus');
              
              return (
                <tr key={householdId} className={idx % 2 === 0 ? "even" : "odd"}>
                  <td>{householdId}</td>
                  <td>{headOfHousehold}</td>
                  <td>
                    <span className={`status ${feeStatus}`}>
                      {feeStatus}
                    </span>
                  </td>
                  <td>
                    {feeStatus === "unpaid" && (
                      <button
                        className="mark-paid-btn"
                        onClick={() => markAsPaid(householdId)}
                        disabled={loading[householdId]}
                      >
                        {loading[householdId] ? 'Updating...' : 'Mark as Paid'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentTracker;
