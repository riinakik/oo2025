import {useEffect, useState } from 'react'
import { Category } from '../models/Category' // ../ kausta võrra ülevalpool
import { Product } from '../models/Product'

function MainPage() {

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

  function showByCategory (categoryId: number){
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId) 
        .then(res=>res.json()) 
        .then(json=> setProducts(json)) // mida setin see muutub hmtlis
  }

  //const showByCategory = () => {}

  return (
    <div>
      <button onClick={() => showByCategory(-1)}>Kõik kategooriad</button>
      {kategooriad.map(kategooria => 
    <button key={kategooria.id}  onClick={() => showByCategory(kategooria.id)}   >    
      {kategooria.name}               
      </button> )}
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
    </div>
  )
}

export default MainPage

// ainult üks parent element
// react koosneb js, mille failid returnivad htmli!