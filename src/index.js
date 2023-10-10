import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
// Importing the file here will run the top level code
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Connects Redux store to React */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
