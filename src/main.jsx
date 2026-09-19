import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AgriStoreProvider } from './context/AgriStoreContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AgriStoreProvider>
      <App />
    </AgriStoreProvider>
  </React.StrictMode>,
);
