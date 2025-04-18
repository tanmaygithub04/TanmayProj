import React from 'react';
import { useState, useMemo } from 'react';
import QueryInput from './components/QueryInput';
import ResultsTable from './components/ResultsTable';
import QuerySelector from './components/QuerySelector';
import BackendStatus from './components/BackendStatus';
import HistoryDisplay from './components/HistoryDisplay';
import FeaturesModal from './components/FeaturesModal';
import { predefinedQueries } from './data/queries';
import { useDatabase } from './context/DatabaseContext';
import { useQueryContext } from './context/QueryContext';
import './App.css';

function App() {
  // get state from database context and query context
  const { isInitialized, 
          schema,
          initializationError,
          isInitializing
        } = useDatabase();

  const {
          results,
          isExecuting,
          loadTime,
          error: queryError,
          queryHistory,
          viewMode, 
          executeQuery,
          toggleViewMode,
  } = useQueryContext();

  // state for the selected predefined query
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  // state for the user's custom query
  const [customQuery, setCustomQuery] = useState('');
  // track if we should use the custom query or a predefined one
  const [isCustomQuery, setIsCustomQuery] = useState(false);

  // state for the features modal visibility
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);

  // figure out which query string to use (custom or predefined)
  const currentQuery = useMemo(() => {
    return isCustomQuery
      ? customQuery
      : predefinedQueries[selectedQueryIndex]?.query || '';
  }, [isCustomQuery, customQuery, selectedQueryIndex]);

  // update state when the user types in the query input
  const handleQueryChange = (query) => {
    setCustomQuery(query);
    setIsCustomQuery(true); // switch to custom mode
  };

  // update state when a predefined query is selected
  const handleQuerySelect = (index) => {
    setSelectedQueryIndex(index);
    setIsCustomQuery(false); // switch back to predefined mode
    const selectedPredefinedQuery = predefinedQueries[index]?.query;
    if (selectedPredefinedQuery) {
       executeQuery(selectedPredefinedQuery); // run the selected query immediately
    } else {
       console.error("Selected predefined query not found at index:", index);
    }
  };

  // run the currently active query (custom or predefined)
  const handleRunQuery = () => {
    executeQuery(currentQuery);
  };

  // functions to control the features modal
  const openFeaturesModal = () => setIsFeaturesModalOpen(true);
  const closeFeaturesModal = () => setIsFeaturesModalOpen(false);

  // combine the errors for display
  const displayError = initializationError || queryError;

  // flags for showing loading indicators
  const showInitializingIndicator = isInitializing;
  const showExecutingIndicator = isExecuting && viewMode === 'results';

  return (
    <div className="app-container">
      <header>
        <div className="header-title-group">
          <h1>SQL Query Runner</h1>
          <button onClick={openFeaturesModal} className="features-button">
            Features Implemented
          </button>
        </div>
        <BackendStatus isConnected={isInitialized} url={'https://tanmayprojbackend.onrender.com'} />
      </header>

      <main>

        <div className="query-section">
          <QuerySelector
            queries={predefinedQueries}
            selectedIndex={selectedQueryIndex}
            onSelect={handleQuerySelect}
            disabled={isInitializing || isExecuting}
          />

          {/* schema info  */}
          {isInitialized && schema.length > 0 && (
            <div className="schema-info">
              <h3>Available Columns (orders):</h3>
              <ul className="schema-list">
                {schema.map((col, index) => (
                  <li key={index}>
                    <strong>{col.name}</strong> ({col.type})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <QueryInput
            value={currentQuery}
            onChange={handleQueryChange}
          />

          <button
            className="run-button"
            onClick={handleRunQuery}
            disabled={!isInitialized || isExecuting}
          >
            {isExecuting ? 'Running...' : 'Run Query'}
          </button>


          {displayError && (
            <div className="error-message">
              {displayError}
            </div>
          )}

          {isInitializing && (
            <div className="loading-message">
              Initializing SQL engine and connecting to backend...
            </div>
          )}
        </div>

        {/* results or history */}
        <div className="results-section">
          <div className="results-header">
            <h2>{viewMode === 'results' ? 'Query Results' : 'Query History'}</h2>
            {/* show execution time only in results view when not executing */}
            {viewMode === 'results' && loadTime !== null && !isExecuting && (
              <span className="performance-stats-inline">
                (executed in {loadTime} ms)
              </span>
            )}
            <button
              onClick={toggleViewMode}
              className="view-toggle-button"
              disabled={isInitializing}
            >
              {viewMode === 'results' ? 'View History' : 'View Results'}
            </button>
          </div>
          {/*  selecting what should be shown on main area*/}
          {showInitializingIndicator ? (
            <div className="loading-indicator">
              Initializing...
              <span style={{ display: 'block', fontSize: '13px', marginTop: '5px', color: '#888' }}>
                (Free tier backend may take a moment to wake up)
              </span>
            </div>
          ) : showExecutingIndicator ? (
            <div className="loading-indicator">Loading results...</div>
          ) : viewMode === 'results' ? (
            <ResultsTable data={results} />
          ) : (
            <HistoryDisplay history={queryHistory} onRerunQuery={executeQuery} />
          )}
        </div>
      </main>

      <footer>
        <p>SQL Query Runner with Express/SQLite Backend</p>
        <p>
          <a href="https://github.com/tanmaygithub04/TanmayProj" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>

      <FeaturesModal isOpen={isFeaturesModalOpen} onClose={closeFeaturesModal} />
    </div>
  );
}

export default App;