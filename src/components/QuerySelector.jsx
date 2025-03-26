import React from 'react';
import './QuerySelector.css';

const QuerySelector = ({ queries, selectedIndex, onSelect }) => {
  const selectedQuery = queries[selectedIndex];
  
  return (
    <div className="query-selector">
      <label htmlFor="query-select">Select a predefined query:</label>
      <select 
        id="query-select"
        value={selectedIndex}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        {queries.map((query, index) => (
          <option key={index} value={index}>
            {query.name}
          </option>
        ))}
      </select>
      
      {selectedQuery && selectedQuery.description && (
        <div className="query-description">
          {selectedQuery.description}
        </div>
      )}
    </div>
  );
};

export default QuerySelector; 