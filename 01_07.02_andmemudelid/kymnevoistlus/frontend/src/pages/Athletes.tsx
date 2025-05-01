import { useCallback, useEffect, useRef, useState } from "react";
import { Athlete } from "../models/Athlete";
import "./Athletes.css";
import { Link } from "react-router-dom";

function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalAthletes, setTotalAthletes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState("-1");
  const [sort, setSort] = useState("id,asc");

  const athletesPerPageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/athletes/countries")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  const loadAthletes = useCallback((country: string, page: number) => {
    setActiveCountry(country);
    setCurrentPage(page);
    const size = Number(athletesPerPageRef.current?.value) || 2;

    fetch("http://localhost:8080/athletes-by-country?country=" + country + 
    "&page=" + page + 
    "&size=" + size + 
    "&sort=" + sort)
      .then(res => res.json())
      .then(data => {
        setAthletes(data.content);
        setTotalAthletes(data.totalElements);
        setTotalPages(data.totalPages);
      });
  }, [sort]);

  useEffect(() => {
    loadAthletes(activeCountry, 0);
  }, [loadAthletes, activeCountry]);

  function updatePage(newPage: number) {
    loadAthletes(activeCountry, newPage);
  }

  return (
    <div className="athletes-page">
      <h2>Athletes</h2>

      <button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => setSort("age,asc")}>Sorteeri nooremad enne</button>
      <button onClick={() => setSort("age,desc")}>Sorteeri vanemad enne</button>

      <br /><br />

      <label>Show per page:</label>
      <select ref={athletesPerPageRef} onChange={() => loadAthletes(activeCountry, 0)}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <button onClick={() => loadAthletes("-1", 0)}>All countries</button>
      {countries.map(country => (
        <button key={country} onClick={() => loadAthletes(country, 0)}>{country}</button>
      ))}

      <div>Total athletes: {totalAthletes}</div><br />

      {athletes.map(athlete => (
        <div key={athlete.id}>
          <div>{athlete.name}</div>
          <div>{athlete.country}</div>
          <div>{athlete.age}</div>
          <Link to={"/athlete/" + athlete.id}>
            <button>Vaata lähemalt</button>
          </Link>
        </div>
      ))}

      <button disabled={currentPage === 0} 
      onClick={() => updatePage(currentPage - 1)}>Eelmine</button>
      <span>{currentPage + 1}</span>
      <button disabled={currentPage >= totalPages - 1} 
      onClick={() => updatePage(currentPage + 1)}>Järgmine</button>
    </div>
  );
}

export default Athletes;

