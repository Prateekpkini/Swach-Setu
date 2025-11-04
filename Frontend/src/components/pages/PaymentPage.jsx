import React from 'react';
import PaymentHistory from '../components/Payments/PaymentHistory';
import PaymentRecord from '../components/Payments/PaymentRecord';

const PaymentPage = ({ households }) => {
  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      <PaymentRecord households={households} />
      <PaymentHistory />
    </div>
  );
};

export default PaymentPage;