import React from 'react';

const IcePanel = ({ children, title }) => {
  return (
    <div
      className="ice-panel m-5"
      style={{
        position: 'relative'
      }}
    >
      {title && (
        <h3
          style={{
            color: 'var(--ice-dark)',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid rgba(0, 180, 255, 0.2)'
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default IcePanel;
