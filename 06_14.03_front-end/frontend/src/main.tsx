import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // className="accordion"
import { createRoot } from 'react-dom/client'
import './index.css' // .accordion {width: 500px !important;} bootstrap ülevalpool, et saaks üle kirjutada
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// navigeerimiseks, urlided vahetamiseks
// 1. npm i react-router-dom
// 2. importida browserrouter ja ümbritseda see < App /> tagi ümber
// 3. teha seosed failide ja urlide vahel App.tsx failis
// localhost:5173/cart---->Cart.tsx
// localhost:5173/login---->Login.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// ./meie enda fail, ilma react domist
// loogelised sulud - võtab tüki