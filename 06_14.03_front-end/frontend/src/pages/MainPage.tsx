import { useCallback, useEffect, useRef, useState } from "react";
import { Category } from "../models/Category"; // ../ kausta võrra ülevalpool
import { Product } from "../models/Product";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function MainPage() {
  const { t, i18n } = useTranslation();

  //muutuja - HTML   muudab muutujat + HTMLi  sulgude sees - algväärtus  senikaua kuni võtab api otspunktist
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productsByPage, setProductsByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);
  const [sort, setSort] = useState("id,asc");

  const productsByPageRef = useRef<HTMLSelectElement>(null); //htmli inputiga/selectiga sidumiseks
  // current? ...TypeScript näeb, et ref on algusel null, st et on 2 väärtuse võimalust
  //current. value....selle selecti väärtus, mis väljastab alati stringi. Number() konverdib numbriks
  // let page = 0; ja muudaks hiljem nt 1, siis see ei lähe hiljem HTMLi uuendama

  //uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") //Api otspunkt kuhu läheb päring
      .then((res) => res.json()) //kogu tagastus: headers, status code,
      .then((json) => setKategooriad(json)); //body: sisu, mida tagastab back-end
  }, []);

  // default = page on 0
  // default = size on 20

  //localhost:8080/category-products?categoryId=1&page=0&size=2sort=price,desc
  const showByCategory = useCallback(
    (categoryId: number, currentPage: number) => {
      setActiveCategory(categoryId);
      setPage(currentPage);
      fetch(
        "http://localhost:8080/category-products?categoryId=" +
          categoryId +
          "&size=" +
          productsByPage +
          "&page=" +
          currentPage + // currentPage, sest React updateb useState setterid fnktside lõpus
          "&sort=" +
          sort
      )
        .then((res) => res.json())
        .then((json) => {
          setProducts(json.content);
          setTotalProducts(json.totalElements);
          setTotalPages(json.totalPages);
        }); // mida setin see muutub hmtlis
    },
    [productsByPage, sort]
  );

  useEffect(() => {
    showByCategory(activeCategory, 0);
  }, [showByCategory, activeCategory]);

  //const showByCategory = () => {}

  function updatePage(newPage: number) {
    showByCategory(activeCategory, newPage); //TODO
  }

  return (
    <div>
      <button onClick={() => setSort("id,asc")}>Sorteeri vanemad enne</button>
      <button onClick={() => setSort("id,desc")}>Sorteeri uuemad enne</button>
      <button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => setSort("price,asc")}>
        Sorteeri odavamad enne
      </button>
      <button onClick={() => setSort("price,desc")}>
        Sorteeri kallimad enne
      </button>{" "}
      <br />
      <select
        ref={productsByPageRef}
        onChange={() =>
          setProductsByPage(Number(productsByPageRef.current?.value))
        }
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      
      <button onClick={() => showByCategory(-1, 0)}>{t("home.all-categories")}</button>

      {kategooriad.map((kategooria) => (
        <button
          key={kategooria.id}
          onClick={() => showByCategory(kategooria.id, 0)}
        >
          {kategooria.name}
        </button>
      ))}
      <br />
      <br />
      <div>Kokku tooteid: {totalProducts} tk</div>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.image}</div>
          <div>{product.category.name}</div>
          <Link to={"/product/" + product.id}>
            <button>Vaata lähemalt</button>
          </Link>
          {/*<div>{product.active}</div>*/}
        </div>
      ))}
      <button disabled={page === 0} onClick={() => updatePage(page - 1)}>
        Eelmine
      </button>
      <span>{page + 1}</span>
      <button
        disabled={page >= totalPages - 1}
        onClick={() => updatePage(page + 1)}
      >
        Järgmine
      </button>
    </div>
  );
}

export default MainPage;

// ainult üks parent element
// react koosneb js, mille failid returnivad htmli!
