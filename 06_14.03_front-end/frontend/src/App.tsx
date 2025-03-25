import {useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Category } from './models/Category'
import { Product } from './models/Product'

function App() {
  //const [count, setCount] = useState(0)
  const sonad = ["Elas", "metsas", "mutionu"]
  const autod = [
    {"mark": "BMW", "mudel": "15", "year": 2015 },
    {"mark": "Audi", "mudel": "TT", "year": 2012 },
    {"mark": "Mercedes", "mudel": "S", "year": 2018 },
    {"mark": "VW", "mudel": "15", "year": 2020 }
  ]

  //muutuja - HTML   muudab muutujat + HTMLi  sulgude sees - algväärtus  senikaua kuni võtab api otspunktist
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  //uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setKategooriad(json)) //body: sisu, mida tagastab back-end
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setProducts(json)) //body: sisu, mida tagastab back-end
  }, []); 

  return (
    <>
    {/* <div>{7+7}</div>
    <div>7+7</div>
    <div>{kogus}</div>
    <div>{count}</div> */}
    {sonad.map(sona => 
    <div key={sona}>
      {sona}
      </div> )}
    <br />
    {autod.map(auto => 
    <div key={auto.mark+auto.mudel}>
      {auto.mark} - {auto.mudel} ({auto.year})
      </div> )}
      <br />
    {kategooriad.map(kategooria => 
    <div key={kategooria.id}>
      {kategooria.name} {kategooria.active}
      </div> )}
      <br />
    {products.map(product => 
    <div key={product.id}>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.image}</div>
      <div>{product.category.name}</div>
      {/*<div>{product.active}</div>*/}
      </div> )}
    </>
  )
}

// key={}
// React soovib koodi mällu jätta. Kui toimuvad re-renderdused, siis tajätab kõik mällu.
// v.a. tsükli/array sisud, sest tal pole aimu, mille järgi seda meelde jätta. 
// Selleks, et saaks meelde jätta, lisame key

export default App
