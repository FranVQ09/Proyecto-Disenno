import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext'; // Importa el UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Envuelve tu componente raíz con el UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

