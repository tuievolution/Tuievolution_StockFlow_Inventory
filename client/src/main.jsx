import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SayimProvider } from './context/SayimContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SayimProvider>
      <App />
    </SayimProvider>
  </React.StrictMode>,
);