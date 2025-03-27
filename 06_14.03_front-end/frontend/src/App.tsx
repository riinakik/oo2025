
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Arrayd from './pages/Arrayd'
import MainPage from './pages/MainPage'
import ManageProducts from './pages/ManageProducts'
import { Link, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'


function App() {
  //const [count, setCount] = useState(0)
 
  return (
    <>
      <Menu />
    
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/admin/products" element={<ManageProducts />}/>
        <Route path="/arrays" element={<Arrayd />}/>
      </Routes>
    </>
  )
}

// routide üles käib menüü, routide alla footer (need on igal lehel nähtavad)

// key={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderdused, siis tajätab kõik mällu.
// v.a. tsükli/array sisud, sest tal pole aimu, mille järgi seda meelde jätta. 
// Selleks, et saaks meelde jätta, lisame key

// App pole avaleht, sinna käib menüü urli faili seosed

export default App
