import React from 'react';
import { useState, useEffect } from 'react';
import './QueryInput.css';

const QueryInput = ({ value, onChange }) => {
  // const [query, setQuery] = useState(value);
  
  // useEffect(() => {
  //   setQuery(value);
  // }, [value]);
  
  const handleChange = (e) => {
    // setQuery(e.target.value);
    onChange(e.target.value);
  };
  
  return (
    <div className="query-input-container">
      <textarea
        className="query-textarea"
        value={value}
        onChange={handleChange}
        placeholder="Enter your SQL query here..."
        rows={8}
        spellCheck={false}
      />
    </div>
  );
};

export default QueryInput; 