import React from 'react';
import './HistoryDisplay.css';

const HistoryDisplay = ({ history, onRerunQuery }) => {
  if (!history || history.length === 0) {
    return <div className="no-history">No query history yet.</div>;
  }

  const formatTimestamp = (date) => {
    return date.toLocaleString(); // simple locale-based formatting
  };

  return (
    <div className="history-container">
      <ul className="history-list">
        {history.map((entry, index) => (
          <li key={index} className={`history-item ${entry.success ? '' : 'failed'}`}>
            <div className="history-item-header">
              <span className={`status-indicator ${entry.success ? 'success' : 'failure'}`}>
                {entry.success ? 'Success' : 'Failed'}
              </span>
              <span className="timestamp">{formatTimestamp(entry.timestamp)}</span>
              {entry.success && (
                 <span className="execution-time">({entry.executionTime.toFixed(2)} ms)</span>
              )}
               <button 
                 className="rerun-button" 
                 onClick={() => onRerunQuery(entry.query)}
                 title="Rerun this query"
               >
                Rerun
               </button>
            </div>
            <pre className="query-text">{entry.query}</pre>
            {!entry.success && entry.message && (
              <div className="error-details">Error: {entry.message}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryDisplay; 