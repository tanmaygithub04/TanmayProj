import React, { createContext, useReducer, useContext, useCallback, useEffect } from 'react';
import { useDatabase } from './DatabaseContext'; // Import useDatabase to access the engine
import { predefinedQueries } from '../data/queries';

const QueryContext = createContext(null);

const initialState = {
  results: [],
  isExecuting: false,
  loadTime: null,
  error: null,
  queryHistory: [],
  viewMode: 'results', // 'results' or 'history'
};

const actionTypes = {
  QUERY_START: 'QUERY_START',
  QUERY_SUCCESS: 'QUERY_SUCCESS',
  QUERY_ERROR: 'QUERY_ERROR',
  ADD_HISTORY: 'ADD_HISTORY', 
  TOGGLE_VIEW: 'TOGGLE_VIEW',
};

function queryReducer(state, action) {
  switch (action.type) {
    case actionTypes.QUERY_START:
      return {
        ...state,
        isExecuting: true,
        error: null,
        loadTime: null,
      };
    case actionTypes.QUERY_SUCCESS:
      return {
        ...state,
        isExecuting: false,
        results: action.payload.data,
        loadTime: action.payload.executionTime,
        error: null,
        viewMode: 'results', // Switch back to results view on success
      };
    case actionTypes.QUERY_ERROR:
      return {
        ...state,
        isExecuting: false,
        error: action.payload.message,
        results: [], // Clear results on error
        loadTime: null,
      };
    case actionTypes.ADD_HISTORY:
      // Add to beginning, limit size
      const newHistory = [action.payload.entry, ...state.queryHistory.slice(0, 49)];
      return {
        ...state,
        queryHistory: newHistory,
      };
    case actionTypes.TOGGLE_VIEW:
      return {
        ...state,
        viewMode: state.viewMode === 'results' ? 'history' : 'results',
      };
    case actionTypes.CLEAR_ERROR:
       return {
         ...state,
         error: null,
       };
    default:
      return state;
  }
}

export const QueryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, initialState);
  const { sqlEngine, isInitialized } = useDatabase(); // Get engine from DatabaseContext

  const executeQuery = useCallback(async (query) => {
    if (!sqlEngine || !isInitialized) {
       // Dispatch error or handle appropriately
       dispatch({ type: actionTypes.QUERY_ERROR, payload: { message: 'SQL engine not ready.' } });
       return;
    }

    dispatch({ type: actionTypes.QUERY_START });

    let historyEntry = {
      query: query,
      timestamp: new Date(),
      executionTime: 0,
      success: false,
      message: null,
    };

    try {
      const result = await sqlEngine.executeQuery(query);
      historyEntry.executionTime = result.executionTime; // Capture time even on failure

      if (result.success) {
        dispatch({ type: actionTypes.QUERY_SUCCESS, payload: result });
        historyEntry.success = true;
      } else {
        dispatch({ type: actionTypes.QUERY_ERROR, payload: { message: result.message } });
        historyEntry.message = result.message;
      }
    } catch (error) {
      console.error("Error during executeQuery dispatch:", error);
      const errorMessage = `Error executing query: ${error.message}`;
      dispatch({ type: actionTypes.QUERY_ERROR, payload: { message: errorMessage } });
      historyEntry.message = errorMessage;
    } finally {
       // Add history entry regardless of success/failure
       dispatch({ type: actionTypes.ADD_HISTORY, payload: { entry: historyEntry } });
    }
  }, [sqlEngine, isInitialized, dispatch]); // Include dispatch in dependencies

  const toggleViewMode = useCallback(() => {
    dispatch({ type: actionTypes.TOGGLE_VIEW });
  }, [dispatch]);

 
  // Execute initial query after initialization
  useEffect(() => {
    if (isInitialized && sqlEngine && state.queryHistory.length === 0) { // Only run once after init
       console.log("Executing initial default query...");
       // Assuming predefinedQueries is accessible or passed down/imported
       // Import predefinedQueries if needed here or pass via props
       const initialQuery = predefinedQueries[0].query; // Example: Get first predefined query
       executeQuery(initialQuery);
    }
  }, [isInitialized, sqlEngine, executeQuery, state.queryHistory.length]);


  const value = {
    ...state, // Expose all state values (results, isExecuting, etc.)
    executeQuery,
    toggleViewMode,
  };

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};

// Custom hook to use the context
export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (context === null) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};