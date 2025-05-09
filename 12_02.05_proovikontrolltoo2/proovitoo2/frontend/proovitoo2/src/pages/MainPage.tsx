import { useEffect, useState } from "react";
import { Word } from "../models/Word";

function MainPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [newType, setNewType] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/words")
      .then((res) => res.json())
      .then((json) => setWords(json));
  }, []);

  const addWord = () => {
    if (!newType || !newDescription) return;

    const newWord: Word = {
      type: newType,
      description: newDescription,
    };

    fetch("http://localhost:8080/word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord), // ✅ nüüd saadetakse 1 objekt, mitte massiiv
    })
      .then((res) => res.json())
      .then((json) => {
        setWords(json);
        setNewType("");
        setNewDescription("");
      });
  };

  return (
    <div>
      <h2>Sõnad</h2>
      {words.map((word) => (
        <div key={word.typeID}>
          <strong>{word.type}</strong>: {word.description}
        </div>
      ))}

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
      <button onClick={addWord}>Lisa</button>
    </div>
  );
}

export default MainPage;
