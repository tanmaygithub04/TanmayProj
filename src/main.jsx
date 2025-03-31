import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DatabaseProvider } from './context/DatabaseContext'
import { QueryProvider } from './context/QueryContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DatabaseProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </DatabaseProvider>
  </React.StrictMode>,
)
