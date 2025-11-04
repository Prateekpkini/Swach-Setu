import React from 'react';
import PaymentCard from './PaymentCard';
import IcePanel from '../IcePanel';

const PaymentHistory = () => {
  // Mock payment data - in a real app, this would come from your backend
  const payments = [
    { id: 'P001', amount: 150, household: 'Household 12', date: '15 Jan 2023', method: 'Cash' },
    { id: 'P002', amount: 150, household: 'Household 23', date: '14 Jan 2023', method: 'UPI' },
    { id: 'P003', amount: 150, household: 'Household 30', date: '13 Jan 2023', method: 'Cash' },
    { id: 'P004', amount: 150, household: 'Household 45', date: '12 Jan 2023', method: 'Bank Transfer' },
    { id: 'P005', amount: 150, household: 'Household 51', date: '11 Jan 2023', method: 'UPI' },
    { id: 'P006', amount: 150, household: 'Household 66', date: '10 Jan 2023', method: 'Cash' },
  ];

  return (
    <IcePanel title="Payment History" glowColor="#00C853">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '15px',
        marginTop: '20px'
      }}>
        {payments.map(payment => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </IcePanel>
  );
};

export default PaymentHistory;