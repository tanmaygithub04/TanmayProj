import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import QueryInput from './components/QueryInput';
import ResultsTable from './components/ResultsTable';
import QuerySelector from './components/QuerySelector';
import { predefinedQueries } from './data/queries';
import { SQLiteEngine } from './data/csvParser';
import './App.css';

function App() {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [customQuery, setCustomQuery] = useState('');
  const [isCustomQuery, setIsCustomQuery] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadTime, setLoadTime] = useState(null);
  const [error, setError] = useState(null);
  const [sqlEngine, setSqlEngine] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [schema, setSchema] = useState([]);
  
  const currentQuery = useMemo(() => {
    return isCustomQuery 
      ? customQuery 
      : predefinedQueries[selectedQueryIndex].query;
  }, [isCustomQuery, customQuery, selectedQueryIndex]);

  // Initialize SQL engine and load data
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Initializing SQL engine...');
        const engine = new SQLiteEngine();
        
        try {
          await engine.initialize();
        } catch (initErr) {
          console.error('Failed to initialize backend:', initErr);
          setError(`Failed to initialize backend: ${initErr.message}. Make sure the backend server is running.`);
          setIsLoading(false);
          return;
        }
        
        setSqlEngine(engine);
        setIsInitialized(true);
        
        // Get schema information
        try {
          const tableSchema = await engine.getSchema('orders');
          setSchema(tableSchema);
        } catch (schemaErr) {
          console.warn('Could not fetch schema:', schemaErr);
        }
        
        // Execute the default query
        const result = await engine.executeQuery(predefinedQueries[selectedQueryIndex].query);
        if (result.success) {
          setResults(result.data);
          setLoadTime(result.executionTime);
        } else {
          setError(result.message);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setError(`Failed to initialize application: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeDatabase();
  }, []);

  const executeQuery = async (query) => {
    if (!sqlEngine || !isInitialized) {
      setError('SQL engine not initialized');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await sqlEngine.executeQuery(query);
      
      if (result.success) {
        setResults(result.data);
        setLoadTime(result.executionTime);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(`Error executing query: ${error.message}`);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (query) => {
    setCustomQuery(query);
    setIsCustomQuery(true);
  };

  const handleQuerySelect = (index) => {
    setSelectedQueryIndex(index);
    setIsCustomQuery(false);
    executeQuery(predefinedQueries[index].query);
  };

  const handleRunQuery = () => {
    executeQuery(currentQuery);
  };

  return (
    <div className="app-container">
      <header>
        <h1>SQL Query Runner</h1>
      </header>
      
      <main>
        <div className="query-section">
          <QuerySelector 
            queries={predefinedQueries} 
            selectedIndex={selectedQueryIndex}
            onSelect={handleQuerySelect}
          />
          
          {schema.length > 0 && (
            <div className="schema-info">
              <h3>Available Columns:</h3>
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
            disabled={isLoading || !isInitialized}
          >
            {isLoading ? 'Running...' : 'Run Query'}
          </button>
          
          {loadTime && (
            <div className="performance-stats">
              Query executed in {loadTime.toFixed(2)} ms
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {!isInitialized && !error && (
            <div className="loading-message">
              Initializing SQL engine and connecting to backend...
            </div>
          )}
        </div>
        
        <div className="results-section">
          <h2>Query Results</h2>
          {isLoading ? (
            <div className="loading-indicator">Loading results...</div>
          ) : (
            <ResultsTable data={results} />
          )}
        </div>
      </main>
      
      <footer>
        <p>SQL Query Runner with Express/SQLite Backend</p>
      </footer>
    </div>
  );
}

export default App;