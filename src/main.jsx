import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { UserProfileProvider } from './contexts/UserProfileContext.jsx';
import { PortfolioProvider } from './contexts/PortfolioContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/fintech-platform">
      <UserProfileProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </UserProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
