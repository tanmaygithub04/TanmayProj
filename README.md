# SQL Query Runner

## Loom Link : 
https://www.loom.com/share/2435f7d82b3f4ff4a43ddb144968e080?sid=2fbe12bf-7b78-4012-ad32-513784458845

## Project Overview

This is a web-based application capable of running (dummy)SQL queries and displaying the (dummy)results of said query. The application includes a space which accepts (dummy)SQL queries in the form of user inputs, then runs the given query, and displays the result within the application.

### This project is capable of rendering a large amount of rows without breaking the browser, or without crashing it.

## Features

- **Predefined Queries**: Choose from a selection of optimized, ready-to-use SQL queries
- **Custom Query Editor**: Write and execute your own SQL queries ( does not work just give dummy ouput)
- **Interactive Results Table**: View query results with sorting capabilities
- **Search Functionality**: Filter results to find specific data
- **Performance Metrics**: See execution time for each query
- **Responsive Design**: Works across desktop and mobile devices

## Technology Stack

### JavaScript Framework
This project is built with **React 18.2.0** using **Vite** as the build tool for fast development and optimized production builds.

### Major Packages and Libraries
- **UI Components**:
  - `@shadcn/ui` - Custom UI components
  - `@radix-ui/react-slot` - Primitive UI components
  - `class-variance-authority` & `clsx` - Utility-first styling approach
  - `lucide-react` - Icon library


## Performance Metrics

### Page Load Time

The application measures query execution time using the Performance API (`performance.now()`). This approach provides precise timing information for each query execution:

```javascript
const startTime = performance.now();
// Query execution logic
const endTime = performance.now();
setLoadTime(endTime - startTime);
```

The measured load times are displayed to users in the UI, providing transparency about the performance of their queries. The application includes a small artificial delay (5ms) to ensure the UI updates properly before executing the query.

So the load time for the first time is around 170 - 200 ms seconds and all the concecutive runs are around 40 - 60 ms seconds.

## Performance Optimizations

Several optimizations were implemented to improve the application's performance:

1. **Memoization with useMemo**:
   - Used React's `useMemo` hook to prevent unnecessary recalculations of derived data
   - Applied to query processing, table column generation, and filtered/sorted data

2. **Efficient Data Handling**:
   - Implemented client-side filtering and sorting for immediate user feedback
   - Used optimized array methods for data transformations

3. **UI Optimizations**:
   - Applied conditional rendering to minimize DOM elements
   - Implemented sticky table headers for better user experience with large datasets
   - Used CSS optimizations like `position: sticky` for table headers

4. **Responsive Design**:
   - Implemented responsive layouts that adapt to different screen sizes
   - Used CSS media queries to optimize the UI for mobile and desktop views

5. **CSV Data Processing**:
   - Efficient parsing of CSV data with type conversion
   - Asynchronous loading of data to prevent blocking the main thread


## Project Structure
The application follows a component-based architecture with clear separation of concerns:

- `src/App.jsx` - Main application component
- `src/components/` - UI components
  - `QueryInput.jsx` - SQL editor component
  - `QuerySelector.jsx` - Predefined query selector
  - `ResultsTable.jsx` - Interactive results display
- `src/data/` - Data handling
  - `queries.js` - Predefined queries
  - `csvParser.js` - CSV data parsing utilities
