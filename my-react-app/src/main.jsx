import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//------------CHANGE THE FOLLOWING------------
import App from './TTT/App.jsx'
//--------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
