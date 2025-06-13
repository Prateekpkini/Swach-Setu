import React from 'react';

const IcePanel = ({ children, title, glowColor = '#4fc3f7' }) => {
  return (
    <div className="ice-panel" style={{
      '--glow-color': glowColor,
      position: 'relative'
    }}>
      {title && <h3 style={{
        color: 'var(--ice-dark)',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '2px solid rgba(0, 180, 255, 0.2)'
      }}>{title}</h3>}
      {children}
      <div className="ice-panel-glow" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, transparent, var(--glow-color), transparent)`,
        borderRadius: '16px 16px 0 0',
        opacity: 0.7
      }} />
    </div>
  );
};

export default IcePanel;