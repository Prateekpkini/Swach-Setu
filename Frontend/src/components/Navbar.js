import React from 'react';
import { FaHome, FaUsers, FaMapMarkedAlt, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="ice-nav" style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '15px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        gap: '10px',
        maxWidth: '800px',
        width: '100%',
        justifyContent: 'space-around'
      }}>
        <button 
          onClick={() => setActiveTab('dashboard')}
          style={{
            background: activeTab === 'dashboard' ? 'rgba(79, 195, 247, 0.2)' : 'transparent',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: activeTab === 'dashboard' ? 'var(--ice-dark)' : 'var(--ice-text)'
          }}
        >
          <FaHome size={20} />
          <span style={{ marginTop: '5px', fontSize: '12px' }}>Dashboard</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('households')}
          style={{
            background: activeTab === 'households' ? 'rgba(79, 195, 247, 0.2)' : 'transparent',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: activeTab === 'households' ? 'var(--ice-dark)' : 'var(--ice-text)'
          }}
        >
          <FaUsers size={20} />
          <span style={{ marginTop: '5px', fontSize: '12px' }}>Households</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('map')}
          style={{
            background: activeTab === 'map' ? 'rgba(79, 195, 247, 0.2)' : 'transparent',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: activeTab === 'map' ? 'var(--ice-dark)' : 'var(--ice-text)'
          }}
        >
          <FaMapMarkedAlt size={20} />
          <span style={{ marginTop: '5px', fontSize: '12px' }}>Map</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('collections')}
          style={{
            background: activeTab === 'collections' ? 'rgba(79, 195, 247, 0.2)' : 'transparent',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: activeTab === 'collections' ? 'var(--ice-dark)' : 'var(--ice-text)'
          }}
        >
          <FaClipboardList size={20} />
          <span style={{ marginTop: '5px', fontSize: '12px' }}>Collections</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('payments')}
          style={{
            background: activeTab === 'payments' ? 'rgba(79, 195, 247, 0.2)' : 'transparent',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            color: activeTab === 'payments' ? 'var(--ice-dark)' : 'var(--ice-text)'
          }}
        >
          <FaMoneyBillWave size={20} />
          <span style={{ marginTop: '5px', fontSize: '12px' }}>Payments</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;