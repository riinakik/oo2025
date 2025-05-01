
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Arrayd from './pages/Arrayd'
import MainPage from './pages/MainPage'
import ManageProducts from './pages/ManageProducts'
import { Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import ManageCategories from './pages/ManageCategories'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'
import SingleProduct from './pages/SingleProduct'
import EditProduct from './pages/EditProduct'


function App() {
  //const [count, setCount] = useState(0)
 
  return (
    <>
      <Menu />
    
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/admin/products" element={<ManageProducts />}/>
        <Route path="/admin/categories" element={<ManageCategories />}/>
        <Route path="/admin/edit-product/:productId" element={<EditProduct />}/>

        <Route path="/arrays" element={<Arrayd />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/product/:productId" element={<SingleProduct />}/>
        <Route path="/*" element={ <div>Page not found</div> } />
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
