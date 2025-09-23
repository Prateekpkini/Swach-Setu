import React, { useState } from "react";
import "./PaymentTracker.css"; // import the CSS file

function PaymentTracker({ households }) {
  const [filter, setFilter] = useState("all");

  const filteredHouseholds = households.filter((household) => {
    if (filter === "all") return true;
    return household.fee_status === filter;
  });

  const markAsPaid = (id) => {
    console.log(`Marked household ${id} as paid`);
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
            {filteredHouseholds.map((household, idx) => (
              <tr key={household.household_id} className={idx % 2 === 0 ? "even" : "odd"}>
                <td>{household.household_id}</td>
                <td>{household.head_of_household}</td>
                <td>
                  <span className={`status ${household.fee_status}`}>
                    {household.fee_status}
                  </span>
                </td>
                <td>
                  {household.fee_status === "unpaid" && (
                    <button
                      className="mark-paid-btn"
                      onClick={() => markAsPaid(household.household_id)}
                    >
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentTracker;
