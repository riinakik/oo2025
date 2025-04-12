import { useEffect, useState } from "react";
import { Athlete } from "../models/Athlete";
import "./Athletes.css";

function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const perPage = 2;
  const [country, setCountry] = useState("-1");

  useEffect(() => {
    fetch("http://localhost:8080/athletes/countries")
      .then((res) => res.json())
      .then((json) => setCountries(json));
  }, []);

  useEffect(() => {
    loadAthletes(country, page);
  }, [country, page]);

  function loadAthletes(c: string, p: number) {
    fetch(`http://localhost:8080/athletes-by-country?country=${c}&page=${p}&size=${perPage}`)
      .then((res) => res.json())
      .then((json) => {
        setAthletes(json.content);
        setTotal(json.totalElements);
      });
  }

  function changeCountry(c: string) {
    setCountry(c);
    setPage(0);
  }

  return (
    <div className="athletes-page">
      <h2>Sportlased</h2>

      <div className="buttons">
        <button onClick={() => changeCountry("-1")}>Kõik riigid</button>
        {countries.map((c) => (
          <button key={c} onClick={() => changeCountry(c)}>
            {c}
          </button>
        ))}
      </div>

      <div>Kokku sportlasi: {total}</div>

      {athletes.map((a) => (
        <div key={a.id}>
          <div>{a.name}</div>
          <div>{a.country}</div>
          <div>{a.age}</div>
        </div>
      ))}

      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Eelmine
      </button>
      <span>Leht {page + 1}</span>
      <button
        disabled={page >= Math.ceil(total / perPage) - 1}
        onClick={() => setPage(page + 1)}
      >
        Järgmine
      </button>
    </div>
  );
}

export default Athletes;


