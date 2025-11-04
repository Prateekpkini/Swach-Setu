import React from 'react';
import { FaMoneyBillWave, FaRupeeSign, FaChartPie } from 'react-icons/fa';
import IcePanel from '../IcePanel';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const PaymentOverview = ({ households }) => {
  // Payment data calculations
  const paidCount = households.filter(h => h.fee_status === 'paid').length;
  const unpaidCount = households.length - paidCount;
  const paymentRate = ((paidCount / households.length) * 100).toFixed(1);

  // Chart data
  const paymentData = {
    labels: ['Paid', 'Unpaid'],
    datasets: [{
      data: [paidCount, unpaidCount],
      backgroundColor: ['#00C853', '#FF5252'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 2
    }]
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '70%',
    maintainAspectRatio: false
  };

  return (
    <IcePanel title="Payment Overview" glowColor="#00C853" style={{ marginTop: '20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {/* Payment Rate Card */}
        <div className="igloo-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(0, 200, 83, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaMoneyBillWave size={24} color="#00C853" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--ice-dark)' }}>
                {paymentRate}%
              </h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>
                Payment Rate
              </p>
            </div>
          </div>
        </div>

        {/* Total Paid Card */}
        <div className="igloo-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(0, 200, 83, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaRupeeSign size={24} color="#00C853" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--ice-dark)' }}>
                {paidCount}
              </h3>
              <p style={{ margin: 0, color: 'var(--ice-text)', opacity: 0.8 }}>
                Paid Households
              </p>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="igloo-card" style={{ gridColumn: '1 / -1', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <FaChartPie size={20} color="#4fc3f7" />
            <h3 style={{ margin: 0 }}>Payment Distribution</h3>
          </div>
          <div style={{ height: '250px' }}>
            <Doughnut data={paymentData} options={chartOptions} />
          </div>
        </div>
      </div>
    </IcePanel>
  );
};

export default PaymentOverview;