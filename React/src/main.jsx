import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position='bottom-right' toastOptions={{
  style:{
    background:"#1e1535",
    color:"#fff",
    border:"0.5px solid #4c3891"
  }
}}></Toaster>
  </StrictMode>,
)
