import {useEffect, useState } from 'react'
import { Category } from '../models/Category' // ../ kausta võrra ülevalpool
import { Product } from '../models/Product'

function MainPage() {

  //muutuja - HTML   muudab muutujat + HTMLi  sulgude sees - algväärtus  senikaua kuni võtab api otspunktist
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsByPage = 2;
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);
  // let page = 0; ja muudaks hiljem nt 1, siis see ei lähe hiljem HTMLi uuendama



  //uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") //Api otspunkt kuhu läheb päring
        .then(res=>res.json()) //kogu tagastus: headers, status code,
        .then(json=> setKategooriad(json)) //body: sisu, mida tagastab back-end
  }, []);

  useEffect(() => {
    showByCategory(-1, 0);
  }, []); 

  function showByCategory (categoryId: number, currentPage: number){
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId + 
      "&size=" + productsByPage +
      "&page=" + currentPage)  // currentPage, sest React updateb useState setterid fnktside lõpus
        .then(res=>res.json()) 
        .then(json=> {
          setProducts(json.content);
          setTotalProducts(json.totalElements);
        }) // mida setin see muutub hmtlis
  }

  //const showByCategory = () => {}

  function updatePage(newPage: number){
    showByCategory(activeCategory, newPage); //TODO
  }
  return (
    <div>
      <button onClick={() => showByCategory(-1, 0)}>Kõik kategooriad</button>
      {kategooriad.map(kategooria => 
    <button key={kategooria.id}  onClick={() => showByCategory(kategooria.id, 0)}   >    
      {kategooria.name}               
      </button> )}
      <br />
      <br />
      
      <div>Kokku tooteid: {totalProducts} tk</div>
    {products.map(product => 
    <div key={product.id}>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.image}</div>
      <div>{product.category.name}</div>
      {/*<div>{product.active}</div>*/}
      </div> )}
      <button disabled = {page === 0 } onClick={() => updatePage(page -1)}>Eelmine</button>
      <span>{page + 1}</span>
      <button disabled = {page === Math.ceil(totalProducts/productsByPage)-1} onClick={() => updatePage(page +1)}>Järgmine</button>
    </div>
  )
}

export default MainPage

// ainult üks parent element
// react koosneb js, mille failid returnivad htmli!