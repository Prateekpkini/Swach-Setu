import React, { useState } from "react";
import "./PaymentTracker.css"; // import the CSS file
import ApiService from "../../services/api.js";

function PaymentTracker({ households, onRefresh }) {
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState({});
  const [resetting, setResetting] = useState(false);

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

  const resetAllPayments = async () => {
    if (!window.confirm('Are you sure you want to reset ALL payments to unpaid? This action cannot be undone.')) {
      return;
    }

    try {
      setResetting(true);
      
      // Get all paid households
      const paidHouseholds = households.filter(h => {
        const feeStatus = getFieldValue(h, 'fee_status') || getFieldValue(h, 'FeeStatus');
        return feeStatus === 'paid';
      });

      // Reset each paid household to unpaid
      for (const household of paidHouseholds) {
        const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
        await ApiService.updatePaymentStatus(householdId, 'unpaid');
      }

      console.log(`✅ Reset ${paidHouseholds.length} households to unpaid`);
      
      // Refresh the data
      if (onRefresh) {
        await onRefresh();
      }
      
      alert(`Successfully reset ${paidHouseholds.length} payments to unpaid.`);
      
    } catch (error) {
      console.error('Error resetting payments:', error);
      alert('Failed to reset payments. Please try again.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="payment-tracker">
      <h2 className="title">Payment Tracking</h2>

      {/* Filters and Reset Button */}
      <div className="filters">
        <div style={{ display: 'flex', gap: '10px' }}>
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
        
        <button
          onClick={resetAllPayments}
          disabled={resetting}
          style={{
            padding: '8px 16px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: resetting ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            opacity: resetting ? 0.6 : 1
          }}
        >
          {resetting ? 'Resetting...' : '🔄 Reset All Payments'}
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Head of Household</th>
              <th>Status</th>
              <th>Payment Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHouseholds.map((household, idx) => {
              const householdId = getFieldValue(household, 'household_id') || getFieldValue(household, 'HouseholdID');
              const headOfHousehold = getFieldValue(household, 'head_of_household') || getFieldValue(household, 'HeadOfHousehold');
              const feeStatus = getFieldValue(household, 'fee_status') || getFieldValue(household, 'FeeStatus');
              const paymentDate = getFieldValue(household, 'payment_date') || getFieldValue(household, 'PaymentDate');
              
              // Format payment date
              const formatPaymentDate = (dateString) => {
                if (!dateString) return '-';
                try {
                  const date = new Date(dateString);
                  return date.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  });
                } catch (e) {
                  return '-';
                }
              };
              
              return (
                <tr key={householdId} className={idx % 2 === 0 ? "even" : "odd"}>
                  <td>{householdId}</td>
                  <td>{headOfHousehold}</td>
                  <td>
                    <span className={`status ${feeStatus}`}>
                      {feeStatus}
                    </span>
                  </td>
                  <td style={{ 
                    fontSize: '0.9rem',
                    color: paymentDate ? '#2e7d32' : '#999',
                    fontWeight: paymentDate ? '500' : 'normal'
                  }}>
                    {formatPaymentDate(paymentDate)}
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
