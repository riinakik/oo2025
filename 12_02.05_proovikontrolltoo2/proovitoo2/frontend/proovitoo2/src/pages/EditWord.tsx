import { useEffect, useRef, useState } from "react";
import { Word } from "../models/Word";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function EditWord() {
  // Võtab URL-ist sõna ID (nt /edit-word/3 -> wordTypeID = 3)
  const { wordTypeID } = useParams();

  // input-väljade viited
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // Navigeerimisfunktsioon peale muudatust
  const navigate = useNavigate();

  // HOIAME MUUDETAVAT SÕNA
  const [word, setWord] = useState<Word>();

  // LAE ÜHE SÕNA ANDMED KUI KOMPONENT LAADITAKSE
  useEffect(() => {
    fetch("http://localhost:8080/words/" + wordTypeID)
      .then((res) => res.json())
      .then((json) => setWord(json));
  }, [wordTypeID]);

  // MUUDA SÕNA JA SAADA ANDMEBAASI (PUT)
  const editWord = () => {
    const modifiedWord = {
      typeID: Number(wordTypeID), // ID peab olema arv
      type: typeRef.current?.value,
      description: descriptionRef.current?.value,
    };

    fetch("http://localhost:8080/words", {
      method: "PUT",
      body: JSON.stringify(modifiedWord),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // Kontrolli, kas tuli veateade või õnnestus
        if (json.message && json.timestamp && json.status) {
          toast.error(json.message); // Näita veateadet
        } else {
          navigate("/"); // Kui kõik korras, liigu avalehele
        }
      });
  };

  // Kui sõna ei leitud või on alles laadimisel
  if (word === undefined) {
    return <div>Word not found</div>;
  }

  return (
    <div>
      {/* VÄLJAD SÕNA MUUTMISEKS */}
      <label>Sõna</label> <br />
      <input ref={typeRef} defaultValue={word?.type} type="text" /> <br />
      <label>Kirjeldus</label> <br />
      <input
        ref={descriptionRef}
        defaultValue={word?.description}
        type="text"
      />{" "}
      <br />
      <button onClick={() => editWord()}>Muuda sõna</button>
      {/* Teavituste konteiner (vajalik react-toastify jaoks) */}
      <ToastContainer />
    </div>
  );
}

export default EditWord;
