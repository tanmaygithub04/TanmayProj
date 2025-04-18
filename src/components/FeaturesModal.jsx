import React from 'react';
import './FeaturesModal.css'; // We'll create this CSS file next

const Component = ({hello , jhello1}) => {

}

const FeaturesModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // stop clicks inside the modal from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // list of features shown in the modal
  const features = [
    "Choose from a selection Predefined SQL queries which show actual result",
    "Write and execute your own SQL querie which show actual result",
    "Sort the columns by clicking on the column name",
    "View query results with sorting and filtering capabilities",
    "View available columns and their data types",
    "See execution time for each query",
    "See the history of queries,their execution status and times"
  ];

  return (
    // the overlay closes the modal when clicked
    <div className="modal-overlay" onClick={onClose}>
      {/* the content area prevents clicks from bubbling up */}
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-button" onClick={onClose}>
          &times; {/* just an 'X' symbol */}
        </button>
        <h2>Features Implemented</h2>
        <ul className="features-list">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturesModal; 