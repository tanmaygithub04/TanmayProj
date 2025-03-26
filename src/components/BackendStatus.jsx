import React from 'react';

const BackendStatus = ({ isConnected, url }) => {
  return (
    <div className="backend-status">
      <span className="status-indicator">
        <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
      </span>
      <span className="status-text">
        Backend: {isConnected ? 'Connected to' : 'Connecting to'} 
        <a href={url} target="_blank" rel="noopener noreferrer"> {url.replace('https://', '')}</a>
      </span>
    </div>
  );
};

export default BackendStatus; 