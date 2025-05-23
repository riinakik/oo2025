import { useEffect, useRef, useState } from "react";
import { Word } from "../models/Word";
import { Link } from "react-router-dom";
import { Parent } from "../models/Parent";

function MainPage() {
  // HOIAME OLEKUID
  const [words, setWords] = useState<Word[]>([]); // sõnade loetelu
  const [parent, setParent] = useState<Parent[]>([]); // haldajate loetelu
  const [parentId, setParentId] = useState<number | null>(null); // valitud haldaja ID
  const [newType, setNewType] = useState(""); // uus tüüp
  const [newDescription, setNewDescription] = useState(""); // uus kirjeldus
  const [totalWords, setTotalWords] = useState(0); // sõnade koguarv
  const [totalPages, setTotalPages] = useState(0); // lehekülgede koguarv
  const [wordsByPage, setWordsByPage] = useState(1); // mitu sõna lehel
  const [sort, setSort] = useState("typeID,asc"); // sorteerimise järjekord
  const [page, setPage] = useState(0); // hetke leht

  const wordsByPageRef = useRef<HTMLSelectElement>(null); // viide dropdown'ile

  // LAE HALDAJAD
  useEffect(() => {
    fetch("http://localhost:8080/parent")
      .then((res) => res.json())
      .then((json) => setParent(json));
  }, []);

  // LAE SÕNAD igal lehe, sorteerimise või arvumuudatusel
  useEffect(() => {
    fetch(
      "http://localhost:8080/words" +
        "?size=" +
        wordsByPage +
        "&page=" +
        page +
        "&sort=" +
        sort
    )
      .then((res) => res.json())
      .then((json) => {
        setWords(json.content);
        setTotalWords(json.totalElements);
        setTotalPages(json.totalPages);
      });
  }, [page, sort, wordsByPage]);

  // FUNKTSIOON uue sõna lisamiseks
  const addWord = () => {
    if (!newType || !newDescription || parentId === null) return;

    const newWord: Word = {
      type: newType,
      description: newDescription,
      parent: { id: parentId },
    };

    fetch("http://localhost:8080/word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    }).then(() => {
      setNewType("");
      setNewDescription("");
      setPage(0); // mine algusesse pärast lisamist
    });
  };

  // MUUDA LEHTE
  function updatePage(newPage: number) {
    setPage(newPage);
  }

  // JSX vaade
  return (
    <div>
      <h2>Sõnad</h2>

      {/* Sorteerimisnupud */}
      <button onClick={() => setSort("type,asc")}>Sorteeri A-Z</button>
      <button onClick={() => setSort("type,desc")}>Sorteeri Z-A</button>

      {/* Mitu sõna ühel lehel */}
      <select
        ref={wordsByPageRef}
        onChange={() => setWordsByPage(Number(wordsByPageRef.current?.value))}
      >
        <option>1</option>
        <option>5</option>
        <option>10</option>
      </select>

      <div>Kokku sõnu: {totalWords}</div>

      {/* Näita iga sõna kohta andmeid */}
      {words.map((word) => (
        <div key={word.typeID}>
          Sõna: {word.type}
          <Link to={"/words/" + word.typeID}>
            <button>Vaata lähemalt</button>
          </Link>
        </div>
      ))}

      {/* Lehitsemise nupud */}
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

      {/* Vorm uue sõna lisamiseks */}
      <h3>Lisa uus sõna</h3>
      <input
        type="text"
        placeholder="Type"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
      />
      <br />
      <br />
      <textarea
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <br />
      <br />

      {/* Haldaja valik */}
      <select
        value={parentId ?? ""}
        onChange={(e) => setParentId(Number(e.target.value))}
      >
        <option value="">-- Vali haldaja --</option>
        {parent.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <br />
      <br />

      <button onClick={addWord}>Lisa</button>
      <br />
      <br />

      {/* Link haldajate lehele */}
      <Link to={"/parents/"}>
        <button>Vaata haldajate järgi</button>
      </Link>
    </div>
  );
}

export default MainPage;

