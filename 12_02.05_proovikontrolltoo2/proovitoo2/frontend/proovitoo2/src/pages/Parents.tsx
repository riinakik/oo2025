import { useEffect, useState } from "react";
import { Word } from "../models/Word";
import { Parent } from "../models/Parent";
import { Link } from "react-router-dom";

function Parents() {
  // HOIAME OLEKUID
  const [words, setWords] = useState<Word[]>([]); // filtreeritud sõnad
  const [parent, setParent] = useState<Parent[]>([]); // kõik haldajad
  const [parentId, setParentId] = useState<number>(-1); // valitud haldaja ID (-1 tähendab kõiki)

  // LAE KÕIK HALDAJAD KORRA
  useEffect(() => {
    fetch("http://localhost:8080/parent")
      .then((res) => res.json())
      .then((json) => setParent(json));
  }, []);

  // LAE SÕNAD vastavalt valitud haldajale
  useEffect(() => {
    const url = `http://localhost:8080/parent-words?parentId=${parentId}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setWords(json));
  }, [parentId]); // lae iga kord kui parentId muutub

  // MUUDA FILTRIT HALDAJA JÄRGI
  function filterByParent(id: number) {
    setParentId(id);
  }

  return (
    <div>
      <h2>Haldajad</h2>
      <br />

      {/* LINK tagasi avalehele */}
      <Link to={"/"}>
        <button>Main page</button>
      </Link>
      <br />
      <br />

      {/* FILTREERIMISE NUPUD */}
      <div>
        <button onClick={() => filterByParent(-1)}>Kõik</button>
        {parent.map((p) => (
          <button key={p.id} onClick={() => filterByParent(p.id)}>
            {p.name}
          </button>
        ))}
      </div>

      <br />

      {/* KUVA FILTREERITUD SÕNAD */}
      {words.map((word) => (
        <div key={word.typeID}>
          <strong>Sõna:</strong> {word.type} <br />
          <em>Kirjeldus:</em> {word.description} <br />
          <span>Parent: {word.parent?.name}</span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Parents;
