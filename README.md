# SQL Query Runner

### Loom Link ( To be updated) : 
https://www.loom.com/share/2435f7d82b3f4ff4a43ddb144968e080?sid=2fbe12bf-7b78-4012-ad32-513784458845

## Project Overview

This is a web-based application capable of running SQL queries and displaying the results. The application includes a space which accepts SQL queries in the form of user inputs, then runs the given query, and displays the result within the application.


### Backend Deployment
The backend is deployed at: https://tanmayprojbackend.onrender.com
Backend Github Link : https://github.com/tanmaygithub04/TanmayProjBackend

## Frontend Deployment 
The frontend is deployed at: https://tanmay-proj.vercel.app/

## Features

- **Predefined Queries**: Choose from a selection of optimized, ready-to-use SQL queries
- **Custom Query Editor**: Write and execute your own SQL queries
- **Interactive Results Table**: View query results with sorting and searching capabilities
- **Schema Information**: View available columns and their data types
- **Performance Metrics**: See execution time for each query
- **Responsive Design**: Works across desktop and mobile devices

## Technology Stack
<img width="927" alt="Image" src="https://github.com/user-attachments/assets/3ce1703c-ca93-4562-b467-3dc69c20db0b" />

### Frontend
- **React 18.2.0** with **Vite** as the build tool
- **Custom UI Components** for tables, inputs, and other interface elements
- **CSS3** for styling with responsive design principles

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

### Backend
- **Express.js** server deployed on Render
- **SQLite** database for query processing
- **RESTful API** for query execution and schema retrieval

## Performance Optimizations

Several optimizations were implemented to improve the application's performance:

1. **Memoization with useMemo**:
   - Used React's `useMemo` hook to prevent unnecessary recalculations
   - Applied to query processing and table data handling

2. **Efficient Data Handling**:
   - Client-side filtering and sorting for immediate user feedback
   - Optimized array methods for data transformations

3. **UI Optimizations**:
   - Conditional rendering to minimize DOM elements
   - Sticky table headers for better user experience with large datasets

4. **Backend Connection**:
   - Efficient API communication with the deployed backend
   - Error handling for network issues

## Project Structure

The application follows a component-based architecture:

- `src/App.jsx` - Main application component
- `src/components/` - UI components
  - `QueryInput.jsx` - SQL editor component
  - `QuerySelector.jsx` - Predefined query selector
  - `ResultsTable.jsx` - Interactive results display
  - `BackendStatus.jsx` - Shows connection status to backend
- `src/data/` - Data handling
  - `queries.js` - Predefined queries
  - `csvParser.js` - Backend communication and query execution
