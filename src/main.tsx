import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Migrate legacy HashRouter links (/#/proyectos/x) to clean URLs (/proyectos/x)
if (window.location.hash.startsWith('#/')) {
  const target = window.location.hash.slice(1) // drop the leading '#'
  window.history.replaceState(null, '', target)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
