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

  return (
    <div>
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
    </div>
  )
}

export default MainPage

// react koosneb js, mille failid returnivad htmli!