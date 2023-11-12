// Import necessary dependencies from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App.jsx';

// Import global styles
import './index.css';

// Import BrowserRouter for React Router
import { BrowserRouter } from 'react-router-dom';

// Import the Redux store and Provider
import { store } from './redux/app/store.js';
import { Provider } from 'react-redux';

// Use ReactDOM.createRoot to render the app into the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the entire application in React Strict Mode for additional development checks
  <React.StrictMode>
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      {/* Use BrowserRouter for React Router to enable routing */}
      <BrowserRouter>
        {/* Render the main App component */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
