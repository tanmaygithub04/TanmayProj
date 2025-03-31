import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import './ResultsTable.css';

const ResultsTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedFilterColumns, setSelectedFilterColumns] = useState([]);

  // Get column headers from the first row
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  // Apply filtering and sorting
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    let filteredData = [...data];
    
    // Updated filtering section
    if (searchTerm && selectedFilterColumns.length > 0) { // Check if columns are selected
      const lowercasedFilter = searchTerm.toLowerCase();
      filteredData = filteredData.filter(item => {
        // Check only within selected columns
        return selectedFilterColumns.some(columnName => 
          item[columnName] !== null && item[columnName] !== undefined && // Ensure value exists
          String(item[columnName]).toLowerCase().includes(lowercasedFilter)
        );
      });
    }
    // End of updated filtering section
    
    // this is the sorting section for the data according to the selected column 
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [data, searchTerm, sortConfig, selectedFilterColumns]);
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Stats about the data
  const stats = useMemo(() => {
    return {
      total: data?.length || 0,
      filtered: processedData.length,
    };
  }, [data, processedData]);
  
  if (!data || data.length === 0) {
    return <div className="no-data">No data available</div>;
  }
  
  return (
    <div className="results-table-container">
      <div className="table-controls">
        <div className="search-container">
          <Input
            type="text"
            placeholder="Filter results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="column-filter-container">
          <label>Filter by Columns:</label>
          <div className="column-checkboxes">
            {columns.map(column => (
              <div key={column} className="column-checkbox-item">
                <input
                  type="checkbox"
                  id={`filter-${column}`}
                  value={column}
                  checked={selectedFilterColumns.includes(column)}
                  onChange={(e) => {
                    const columnName = e.target.value;
                    setSelectedFilterColumns(prev => 
                      e.target.checked 
                        ? [...prev, columnName] 
                        : prev.filter(col => col !== columnName)
                    );
                  }}
                />
                <label htmlFor={`filter-${column}`}>{column}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="table-stats">
          Showing {stats.filtered} of {stats.total} records
        </div>
      </div>
      
      <div className="table-wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead 
                  key={column}
                  onClick={() => requestSort(column)}
                  className="sortable-column"
                >
                  {column}
                  {sortConfig.key === column && (
                    <span className="sort-indicator">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(column => (
                  <TableCell key={`${rowIndex}-${column}`}>
                    {row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsTable; 