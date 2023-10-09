import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Importing the file here will run the top level code
import './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
