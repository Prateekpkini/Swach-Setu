import React, { useEffect } from 'react';
import '../../styles/animations.css';  // Fixed import path

const SnowfallEffect = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      // Random properties
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
      
      // Remove snowflake after it falls
      setTimeout(() => {
        snowflake.remove();
      }, duration * 1000);
    };
    
    // Create initial snowflakes
    for (let i = 0; i < 50; i++) {
      setTimeout(createSnowflake, i * 300);
    }
    
    // Continuous snowfall
    const interval = setInterval(createSnowflake, 300);
    
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SnowfallEffect;