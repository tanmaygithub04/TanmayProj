# SQL Query Runner

### Video Explanation Link: 
https://youtu.be/qdd0VYCIFp4

## Project Overview

This is a web-based application capable of running SQL queries and displaying the results. The application includes a space which accepts SQL queries in the form of user inputs, then runs the given query, and displays the result within the application.


### Backend Deployment
The backend is deployed at: https://tanmayprojbackend.onrender.com
Backend Github Link : https://github.com/tanmaygithub04/TanmayProjBackend

## Frontend Deployment 
The frontend is deployed at: https://tanmay-proj.vercel.app/

## Features

- **Predefined Queries**: Choose from a selection of ready-to-use SQL queries which show actual result.
- **Custom Query Editor**: Write and execute your own SQL queries which show actual result.
- **Interactive Results Table**:
    - View query results clearly.
    - Sort data by clicking on column headers.
    - Filter results based on search terms across selected columns.
- **Schema Information**: View available columns and their data types for the 'orders' table.
- **Performance Metrics**: See execution time for each query.
- **Query History**:
    - View a history of executed queries, including their status (success/failure), timestamp, and execution time.
    - Rerun previous queries directly from the history list.
- **Features Overview**: Access a modal window listing the key features implemented in the application.
- **Backend Status Indicator**: Shows the connection status to the backend API.
- **Responsive Design**: Works across desktop and mobile devices.
- **GitHub Link**: Easy access to the project's source code repository.


## Technology Stack
<img width="927" alt="Image" src="https://github.com/user-attachments/assets/3ce1703c-ca93-4562-b467-3dc69c20db0b" />

### Frontend
- **React* with **Vite** as the build tool
- **Custom UI Components** for tables, inputs, and other interface elements
- **CSS3** for styling with responsive design principles

### Major Packages and Libraries
- **UI Components**:
  - `@shadcn/ui` - Custom UI components for table.


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

So the load time for the first time is around 170 - 200 ms seconds and all the concecutive runs are around 4-6 ms seconds.

### Backend
- **Express.js** server deployed on Render
- **SQLite** database for query processing
- **RESTful API** for query execution and schema retrieval

## Cost effective and Scalable future approach:-
Front end Design: 
<img width="547" alt="Image" src="https://github.com/user-attachments/assets/c5c4204c-a4ea-4319-ba12-41914f35b5dc" />

Backend Design: 
<img width="482" alt="Image" src="https://github.com/user-attachments/assets/8aa5c97b-a05e-4ff1-acbb-8352eadcde26" />
Note: I have given the current implementation in previous section this is for future ,I made the backend use sqlite for now , I did not go with pagination right now.

## Project Structure
The application follows a standard project structure:

-   **`src/`**: Main source code directory.
    -   **`components/`**
        -   `QueryInput.jsx`: SQL query input area.
        -   `QuerySelector.jsx`: Predefined query dropdown.
        -   `ResultsTable.jsx`: Sortable/filterable results table.
        -   `BackendStatus.jsx`: Backend connection indicator.
        -   `HistoryDisplay.jsx`: Query history list.
        -   `FeaturesModal.jsx`: List of features implemented.
    -   **`context/`**: React Context for global state.
        -   `DatabaseContext.jsx`: Handles DB connection & schema.
        -   `QueryContext.jsx`: Handles query execution.
    -   **`data/`**: Data definitions and handling.
        -   `queries.js`: Predefined query list.
        -   `csvParser.js`: Backend API interaction (`SQLiteEngine`).
    -   **`App.jsx`**: Main application component.
    -   **`main.jsx`**: React application entry point.
    -   **CSS files**: Stylesheets (`App.css`, `index.css`, and component-specific CSS).
-   **`index.html`**: Main HTML page.
-   **`package.json`**: Project dependencies and scripts.

## Performance Optimizations

Several optimizations were implemented to improve the application's performance:

1. **Client-Side Data Processing:**:
   - Filtering, sorting and validation of query results are handled efficiently within the browser using memoized calculations using `useMemo`.
   - This provides immediate user feedback for table interactions

2. **Memoization with React Hooks**:
   - useMemo and useCallback are utilized to prevent expensive recalculations and function recreations during re-renders

3. **Efficient State Management with Context:**:
   - React Context (`DatabaseContext`, `QueryContext`) is used for global state management
4. **Conditional UI Rendering:**:
   - The UI dynamically renders components based on the application state (e.g., showing loading indicators, error messages, results, or history).

5. **Backend Connection**:
   - Efficient API communication with the deployed backend
   - Error handling for network issues



