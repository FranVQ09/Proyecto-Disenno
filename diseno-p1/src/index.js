import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext'; // Importa el UserProvider
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Envuelve tu componente raíz con el UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

