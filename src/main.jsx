import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FoundersHub from './admin/FoundersHub.jsx';
import './index.css';

// Soft client-side routing. `/admin` (con o sin slash final) renderiza
// el hub privado de fundadoras. Cualquier otra ruta renderiza el sitio público.
function Root() {
  const path =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/+$/, '').toLowerCase()
      : '';
  if (path === '/admin') {
    return <FoundersHub />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
