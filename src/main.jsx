import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// git init
// git add .
// git commit -m "Initial commit"
// git branch -M main
// git remote add origin https://github.com/YOUR_USERNAME/my-website.git
// git push -u origin main
