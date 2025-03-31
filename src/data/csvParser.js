// src/data/csvParser.js




// Basic SQL syntax validator
export const validateSQLSyntax = (query) => {
  // Basic validation rules
  const errors = [];
  
  // Check for required elements
  if (!query.toLowerCase().includes('select')) {
    errors.push('Query must include SELECT statement');
  }
  
  if (!query.toLowerCase().includes('from')) {
    errors.push('Query must include FROM clause');
  }
  
  // Check for balanced parentheses
  const openParens = (query.match(/\(/g) || []).length;
  const closeParens = (query.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push('Unbalanced parentheses');
  }
  
  // Check for unclosed quotes
  const singleQuotes = (query.match(/'/g) || []).length;
  if (singleQuotes % 2 !== 0) {
    errors.push('Unclosed single quote');
  }
  
  const doubleQuotes = (query.match(/"/g) || []).length;
  if (doubleQuotes % 2 !== 0) {
    errors.push('Unclosed double quote');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// API-based SQL engine
export class SQLiteEngine {
  constructor() {
    this.initialized = false;
    this.apiBaseUrl = 'https://tanmayprojbackend.onrender.com/api';
  }
  
  async initialize() {
    if (!this.initialized) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/init`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message);
        }
        
        console.log('Backend SQL engine initialized');
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize backend:', error);
        throw new Error(`Backend initialization failed: ${error.message}`);
      }
    }
    return this;
  }
  
  async executeQuery(query) {
    try {
      // Validate query syntax first
      const validation = validateSQLSyntax(query);
      if (!validation.isValid) {
        return {
          success: false,
          data: [],
          executionTime: 0,
          message: `SQL syntax error: ${validation.errors.join(', ')}`
        };
      }
      
      const startTime = performance.now();
      
      const response = await fetch(`${this.apiBaseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      const result = await response.json();
      const clientExecutionTime = performance.now() - startTime;
      
      // Use server execution time if available, otherwise use client time
      const executionTime = result.executionTime || clientExecutionTime;
      
      return {
        success: result.success,
        data: result.data || [],
        executionTime,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        executionTime: 0,
        message: `Error executing query: ${error.message}`
      };
    }
  }
  
  async getSchema(tableName) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/schema/${tableName}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result.schema;
    } catch (error) {
      console.error('Error fetching schema:', error);
      return [];
    }
  }
}