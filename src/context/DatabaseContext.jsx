import React, { createContext, useState, useEffect, useContext } from 'react';
import { SQLiteEngine } from '../data/SqlEngine';

const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }) => {
  const [sqlEngine, setSqlEngine] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [schema, setSchema] = useState([]);
  const [initializationError, setInitializationError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true); // Specific loading state for init

  useEffect(() => {
    const initializeDatabase = async () => {
      setIsInitializing(true);
      setInitializationError(null);
      try {
        console.log('Initializing SQL engine...');
        const engine = new SQLiteEngine();

        try {
          await engine.initialize();
        } catch (initErr) {
          console.error('Failed to initialize backend:', initErr);
          setInitializationError(`Failed to connect to backend: ${initErr.message}. Please check if the server is running.`);
          setIsInitializing(false);
          return;
        }

        setSqlEngine(engine);
        setIsInitialized(true);

        // getting the schema information to display
        try {
          const tableSchema = await engine.getSchema('orders');
          setSchema(tableSchema);
        } catch (schemaErr) {
          console.warn('Could not fetch schema:', schemaErr);
          setInitializationError('Could not fetch table schema.');
        }
      } catch (error) {
        console.error('Error initializing database context:', error);
        setInitializationError(`Failed to initialize application: ${error.message}`);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeDatabase();
    // needed to run once on mount
  }, []);

  const value = {
    sqlEngine,
    isInitialized,
    schema,
    initializationError,
    isInitializing,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

// Custom hook to use the context
export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === null) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}; 