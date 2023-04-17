import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/Authcontext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <AuthProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </AuthProvider>
    </AppProvider>
  </React.StrictMode>
)
