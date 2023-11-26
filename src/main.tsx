import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:svg-icons-register';
import './reset.scss';
import App from './App.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
