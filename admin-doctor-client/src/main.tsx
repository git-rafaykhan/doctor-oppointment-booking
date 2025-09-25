import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AdminAppContext } from './context/AdminContext.tsx';
import { DoctorAppContext } from './context/DoctorContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DoctorAppContext>
      <AdminAppContext>
        <App />
      </AdminAppContext>
    </DoctorAppContext>
  </StrictMode>,
)
