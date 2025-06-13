import React, { useState, useEffect } from 'react';
import { FaSnowflake } from 'react-icons/fa';
import '../../../styles/animations.css';

const SnowToggle = () => {
  const [snowEnabled, setSnowEnabled] = useState(true);

  useEffect(() => {
    const toggleSnowfall = () => {
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakes.forEach(flake => {
        flake.style.display = snowEnabled ? 'block' : 'none';
      });
    };

    toggleSnowfall();
  }, [snowEnabled]);

  const createSnowflake = () => {
    if (!snowEnabled) return;

    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * window.innerWidth;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.7 + 0.3;
    
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${posX}px`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = opacity;
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
      snowflake.remove();
    }, duration * 1000);
  };

  useEffect(() => {
    if (snowEnabled) {
      for (let i = 0; i < 50; i++) {
        setTimeout(createSnowflake, i * 300);
      }
    }

    const interval = setInterval(createSnowflake, 300);
    return () => clearInterval(interval);
  }, [snowEnabled]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px'
    }}>
      {/* SwatchaPatha Branding */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 15px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <h3 style={{
          margin: 0,
          color: '#01579b',
          fontFamily: '"Arial", sans-serif',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #4fc3f7, #01579b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          SwatchaPatha
        </h3>
      </div>

      {/* Toggle Button */}
      <button 
        className="ice-button"
        onClick={() => setSnowEnabled(!snowEnabled)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 15px',
          borderRadius: '24px',
          background: snowEnabled 
            ? 'linear-gradient(135deg, #4fc3f7, #01579b)'
            : 'linear-gradient(135deg, #b3e5fc, #4fc3f7)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease'
        }}
      >
        <FaSnowflake 
          size={18} 
          style={{
            animation: snowEnabled ? 'pulse 2s infinite' : 'none',
            color: snowEnabled ? 'white' : '#e1f5fe'
          }} 
        />
        {snowEnabled ? 'Disable Snow' : 'Enable Snow'}
      </button>
    </div>
  );
};

export default SnowToggle;