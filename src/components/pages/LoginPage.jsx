import React, { useState } from 'react';
import IcePanel from '../components/IcePanel';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic would go here
    console.log('Login attempted:', credentials);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--ice-primary), var(--ice-secondary))',
      padding: '20px'
    }}>
      <IcePanel glowColor="#4fc3f7" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 style={{
          textAlign: 'center',
          color: 'var(--ice-dark)',
          marginBottom: '30px'
        }}>Waste Management Portal</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--ice-dark)'
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <FaUser style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: 'var(--ice-accent)',
                opacity: 0.7
              }} />
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: 'var(--ice-dark)'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: 'var(--ice-accent)',
                opacity: 0.7
              }} />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}
              />
            </div>
          </div>
          
          <button type="submit" className="ice-button" style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <FaSignInAlt /> Login
          </button>
        </form>
      </IcePanel>
    </div>
  );
};

export default LoginPage;