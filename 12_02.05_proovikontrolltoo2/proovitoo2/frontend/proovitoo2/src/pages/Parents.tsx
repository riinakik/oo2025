import { useEffect, useState } from "react";
import { Word } from "../models/Word";
import { Parent } from "../models/Parent";

function Parents() {
  const [words, setWords] = useState<Word[]>([]);
  const [parent, setParent] = useState<Parent[]>([]);
  const [parentId, setParentId] = useState<number>(-1);

  // Lae kõik parent-id
  useEffect(() => {
    fetch("http://localhost:8080/parent")
      .then((res) => res.json())
      .then((json) => setParent(json));
  }, []);

  // Lae sõnad vastavalt parentId-le
  useEffect(() => {
    const url = `http://localhost:8080/parent-words?parentId=${parentId}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setWords(json));
  }, [parentId]);

  function filterByParent(id: number) {
    setParentId(id);
  }

  return (
    <div>
      <h2>Haldajad</h2>

      <div>
        <button onClick={() => filterByParent(-1)}>Kõik</button>
        {parent.map((p) => (
          <button key={p.id} onClick={() => filterByParent(p.id)}>
            {p.name}
          </button>
        ))}
      </div>

      <br />

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
